#!/usr/bin/env node
/**
 * MyClaw Tips - 获取特定 Tip
 * 
 * 使用方式：
 * node get.js <tip-id>
 * node get.js <tip-id> --format markdown|text
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

function formatTip(tip, format = 'text') {
  if (format === 'markdown') {
    return `## ${tip.icon} ${tip.title}

**ID**: \`${tip.id}\`  
**优先级**: ${tip.priority}  
**标签**: ${tip.tags.join(', ')}

### 内容

${tip.content}

### 操作

${tip.action.type === 'command' ? `命令: \`${tip.action.value}\`` : ''}
${tip.action.type === 'link' ? `链接: ${tip.action.value}` : ''}
${tip.action.type === 'guide' ? `步骤:\n${tip.action.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}` : ''}
`;
  }
  
  // Plain text format
  return `${tip.icon} ${tip.title}
${'='.repeat(tip.title.length)}

ID: ${tip.id}
优先级: ${tip.priority}
标签: ${tip.tags.join(', ')}

内容:
${tip.content}

操作:
${tip.action.type === 'command' ? `命令: ${tip.action.value}` : ''}
${tip.action.type === 'link' ? `链接: ${tip.action.value}` : ''}
${tip.action.type === 'guide' ? `步骤:\n${tip.action.steps.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}` : ''}
`;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log('Usage: get.js <tip-id> [options]');
    console.log('Options:');
    console.log('  --format <format>  输出格式: text|markdown (default: text)');
    process.exit(0);
  }
  
  const tipId = args[0];
  const format = args.includes('--format') 
    ? args[args.indexOf('--format') + 1] 
    : 'text';
  
  const tipsData = loadTips();
  const tip = tipsData.tips.find(t => t.id === tipId);
  
  if (!tip) {
    console.error(`Tip not found: ${tipId}`);
    console.log('\n可用 tips:');
    for (const t of tipsData.tips) {
      console.log(`  - ${t.id}: ${t.title}`);
    }
    process.exit(1);
  }
  
  console.log(formatTip(tip, format));
}

main();