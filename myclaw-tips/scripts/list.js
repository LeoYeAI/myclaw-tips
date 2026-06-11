#!/usr/bin/env node
/**
 * MyClaw Tips - 列出所有 Tips
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  tipsFile: path.resolve(__dirname, '../data/tips.json'),
};

function loadTips() {
  const data = fs.readFileSync(CONFIG.tipsFile, 'utf8');
  return JSON.parse(data);
}

function main() {
  const tipsData = loadTips();
  
  console.log('📋 MyClaw Pro Tips 列表\n');
  console.log(`共 ${tipsData.tips.length} 个 tips\n`);
  
  // 按优先级分组
  const byPriority = {};
  for (const tip of tipsData.tips) {
    const p = tip.priority;
    if (!byPriority[p]) byPriority[p] = [];
    byPriority[p].push(tip);
  }
  
  // 按优先级排序输出
  const priorities = Object.keys(byPriority).sort((a, b) => b - a);
  
  for (const p of priorities) {
    console.log(`\n⭐ 优先级 ${p}:`);
    for (const tip of byPriority[p]) {
      console.log(`  ${tip.icon} ${tip.id}`);
      console.log(`     ${tip.title}`);
      console.log(`     标签: ${tip.tags.join(', ')}`);
    }
  }
  
  console.log('\n---\n使用方式：');
  console.log('  node list.js              # 列出所有 tips');
  console.log('  node get.js <tip-id>      # 获取特定 tip');
  console.log('  node check.js             # 检查是否有值得分享的 tip');
}

main();