#!/usr/bin/env node
/**
 * MyClaw Tips - 检查脚本
 * 
 * 检查用户行为模式，决定是否需要触发 tips
 * 主要检查：
 * 1. Session 活跃时长（从 sessions.json 获取）
 * 2. 消息数量（从 .jsonl 文件行数获取）
 * 3. Channel 使用模式
 * 
 * 使用方式：
 * node check.js [options]
 * 
 * Options:
 *   --user <id>    指定用户 ID
 *   --channel <ch> 指定 channel
 *   --dry-run      只检查不触发
 *   --json         输出 JSON 格式
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// 配置
const CONFIG = {
  baseDir: path.resolve(__dirname, '..'),
  dataDir: path.resolve(__dirname, '../data'),
  tipsFile: path.resolve(__dirname, '../data/tips.json'),
  
  // OpenClaw session存储位置
  sessionsDir: '/home/ubuntu/.openclaw/agents/main/sessions',
 sessionsJson: '/home/ubuntu/.openclaw/agents/main/sessions/sessions.json',
  
  // 检查阈值
  thresholds: {
    maxSessionAgeDays: 7,        // Session 超过 7 天活跃
    minMessageCount: 20,         // 最小消息数
    minDaysActive: 3,            // 最小活跃天数
  },
  
  // 环境变量配置
  env: {
    TIPS_CHECK_INTERVAL: parseInt(process.env.TIPS_CHECK_INTERVAL || '86400000'),
    TIPS_MIN_PRIORITY: parseInt(process.env.TIPS_MIN_PRIORITY || '5'),
    TIPS_DISABLED: process.env.TIPS_DISABLED === 'true',
  }
};

// 加载 tips 数据
function loadTips() {
  try {
    const data = fs.readFileSync(CONFIG.tipsFile, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error loading tips:', e.message);
    return { tips: [] };
  }
}

// 获取所有 session 信息
function getSessions() {
  const sessions = [];
  
  // 优先从 sessions.json 读取
  if (fs.existsSync(CONFIG.sessionsJson)) {
    try {
      const sessionsData = JSON.parse(fs.readFileSync(CONFIG.sessionsJson, 'utf8'));
      if (Array.isArray(sessionsData)) {
        for (const s of sessionsData) {
          sessions.push({
            id: s.id || s.sessionId,
            createdAt: s.createdAt,
            lastActiveAt: s.lastActiveAt,
            messageCount: s.messageCount || 0,
            channel: s.channel || 'telegram',
            userId: s.userId,
          });
        }
      }
    } catch (e) {
      console.error('Error reading sessions.json:', e.message);
    }
  }
  
  // 如果 sessions.json 为空或不存在，从 .jsonl 文件补充
  if (sessions.length === 0 && fs.existsSync(CONFIG.sessionsDir)) {
    const entries = fs.readdirSync(CONFIG.sessionsDir);
    
    for (const entry of entries) {
      // 只处理 .jsonl 文件
      if (!entry.endsWith('.jsonl') || entry.includes('.deleted.') || entry.includes('.checkpoint.')) {
        continue;
      }
      
      const sessionPath = path.join(CONFIG.sessionsDir, entry);
      const stats = fs.statSync(sessionPath);
      
      // 从文件名提取 session ID（去掉 .jsonl 后缀）
      let sessionId = entry.replace('.jsonl', '');
      
      // 统计消息数量（每行一个 JSON 对象）
      let messageCount = 0;
      try {
        const content = fs.readFileSync(sessionPath, 'utf8');
        messageCount = content.split('\n').filter(line => line.trim() && line.includes('"role"')).length;
      } catch (e) {
        // 忽略读取错误
      }
      
      sessions.push({
        id: sessionId,
        createdAt: stats.birthtime.toISOString(),
        lastActiveAt: stats.mtime.toISOString(),
        messageCount,
        channel: 'telegram', // 默认假设是 telegram
      });
    }
  }
  
  return sessions;
}

// 分析 session 行为模式
function analyzeSession(session) {
  const now = Date.now();
  const createdAt = session.createdAt ? new Date(session.createdAt).getTime() : now;
  const lastActiveAt = session.lastActiveAt ? new Date(session.lastActiveAt).getTime() : now;
  
  const ageDays = (now - createdAt) / (1000 * 60 * 60 * 24);
  const daysSinceLastActive = (now - lastActiveAt) / (1000 * 60 * 60 * 24);
  const messageCount = session.messageCount || 0;
  
  return {
    id: session.id,
    ageDays: Math.round(ageDays * 10) / 10,
    daysSinceLastActive: Math.round(daysSinceLastActive * 10) / 10,
    messageCount,
    isActive: daysSinceLastActive < 1,
    isLongSession: ageDays > CONFIG.thresholds.maxSessionAgeDays,
    isHighVolume: messageCount > CONFIG.thresholds.minMessageCount,
  };
}

// 检查是否应该触发 tip
function shouldTriggerTip(tip, analysis, channel) {
  // 检查优先级
  if (tip.priority < CONFIG.env.TIPS_MIN_PRIORITY) {
    return false;
  }
  
  // 检查是否可忽略
  if (tip.dismissable === false) {
    return false;
  }
  
  const trigger = tip.trigger;
  
  // 关键词触发 - 总是可以检查
  if (trigger.type === 'keyword') {
    return true;
  }
  
  // Cron 触发 - 检查行为条件
  if (trigger.type === 'cron' || trigger.type === 'behavior') {
    // 检查 channel 条件
    if (trigger.conditions?.channel && trigger.conditions.channel !== channel) {
      return false;
    }
    
    // 检查消息数量条件
    if (trigger.conditions?.minMessageCount) {
      if (analysis.messageCount < trigger.conditions.minMessageCount) {
        return false;
      }
    }
    
    // 检查活跃天数条件
    if (trigger.conditions?.minDaysActive) {
      if (analysis.ageDays < trigger.conditions.minDaysActive) {
        return false;
      }
    }
    
    return true;
  }
  
  // manual 类型需要显式触发
  if (trigger.type === 'manual') {
    return false;
  }
  
  return false;
}

// 获取建议的 tips
function getSuggestedTips(channel = 'telegram') {
  const tipsData = loadTips();
  const sessions = getSessions();
  const suggestions = [];
  
  // 分析所有 session
  const analyses = sessions.map(s => analyzeSession(s));
  
  //找到最需要优化的 session
  const problematicSessions = analyses.filter(a => 
    a.isLongSession || a.isHighVolume
  );
  
  // 检查每个 tip
  for (const tip of tipsData.tips) {
    for (const analysis of problematicSessions) {
      if (shouldTriggerTip(tip, analysis, channel)) {
        suggestions.push({
          tip,
          reason: `Session ${analysis.id.substring(0, 8)}... 活跃 ${analysis.ageDays} 天，${analysis.messageCount} 条消息`,
          session: analysis,
        });
        break; // 每个 tip 只添加一次
      }
    }
    
    // 也检查关键词类型的 tip（不需要 session 分析）
    if (suggestions.length === 0 && tip.trigger.type === 'keyword') {
      if (tip.priority >= CONFIG.env.TIPS_MIN_PRIORITY) {
        suggestions.push({
          tip,
          reason: '通用关键词匹配',
          session: null,
        });
      }
    }
  }
  
  // 按优先级排序
  suggestions.sort((a, b) => b.tip.priority - a.tip.priority);
  
  return suggestions;
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const options = {
    user: null,
    channel: 'telegram',
    dryRun: false,
    json: false,
  };
  
  // 解析参数
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--user':
        options.user = args[++i];
        break;
      case '--channel':
        options.channel = args[++i];
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--json':
        options.json = true;
        break;
      case '--help':
        console.log('Usage: check.js [options]');
        console.log('Options:');
        console.log('  --user <id>    指定用户 ID');
        console.log('  --channel <ch> 指定 channel (default: telegram)');
        console.log('  --dry-run      只检查不触发');
        console.log('  --json         输出 JSON 格式');
        console.log('  --help         显示帮助');
        process.exit(0);
    }
  }
  
  // 检查是否禁用
  if (CONFIG.env.TIPS_DISABLED) {
    if (options.json) {
      console.log(JSON.stringify({ disabled: true, tips: [] }));
    } else {
      console.log('Tips 已禁用 (TIPS_DISABLED=true)');
    }
    process.exit(0);
  }
  
  // 获取建议
  const suggestions = getSuggestedTips(options.channel);
  
  if (options.json) {
    console.log(JSON.stringify({
      channel: options.channel,
      suggestions: suggestions.slice(0, 3),
      totalFound: suggestions.length,
    }, null, 2));
  } else {
    if (suggestions.length === 0) {
      console.log('没有需要分享的 tips');
      process.exit(0);
    }
    
    console.log('💡 建议分享的 Tips:\n');
    
    for (const { tip, reason } of suggestions.slice(0, 3)) {
      console.log(`【${tip.icon} ${tip.title}】(优先级: ${tip.priority})`);
      console.log(`原因: ${reason}`);
      console.log(`   内容: ${tip.content.substring(0, 100)}...`);
      console.log();
    }
  }
  
  if (options.dryRun) {
    process.exit(0);
  }
  
  // 如果有建议，返回第一个（最高优先级）
  if (suggestions.length > 0) {
    const topTip = suggestions[0].tip;
    console.log('\n🎯 推荐触发 Tip:', topTip.id);
  }
}

// 运行
main();