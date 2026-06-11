# MyClaw Pro Tips

> 预装到所有 MyClaw 实例的智能使用技巧助手

## 功能

MyClaw Pro Tips 是一个内置的使用技巧系统，旨在帮助用户更好地使用 MyClaw。

###核心特性

- 💡 **智能感知** - 根据用户行为模式，在恰当时机分享技巧
- 🎯 **上下文相关** - 每条 tip 都与当前场景紧密相关
- 🚫 **不打扰** - 只在有明确信号时才分享
- 📝 **易于扩展** - 通过 JSON 配置管理 tips

### 包含的 Tips

| Tip | 说明 |
|-----|------|
| Telegram Topic 分流 |解决单 session上下文膨胀问题 |
| Session 管理技巧 | 教你如何管理对话上下文 |
| Skill 发现 | 探索 MyClaw 的各种能力 |
| Vibe Coding 技巧 | 高效写代码的最佳实践 |
| 定时任务与提醒 | 设置自动化提醒 |
| 多 Channel 支持 | Telegram/WhatsApp/Discord |
| 多模型切换 | 按需切换不同 AI 模型 |
|语音交互 |语音消息支持 |
| Workspace 文件管理 | 你的文件你做主 |
| 隐私与数据 | 数据安全说明 |
| 自动化工作流 | 创建自动化流程 |
| 上下文压缩 |了解自动压缩机制 |

##触发机制

### 1. 行为感知（主要）

Agent 会根据以下信号自动分享 tip：

- 用户抱怨"越聊越慢"、"context 太大" → Telegram Topic 分流
- 用户问"你能做什么" → Skill 发现
- 用户开始写代码 → Vibe Coding 技巧
- 用户询问"定时"相关 → 定时任务与提醒

### 2. 关键词触发

用户可以直接说：
- "有什么 tips"
- "使用技巧"
- "给我一个 tip"

### 3. Cron 检查（辅助）

每 24 小时检查一次用户行为模式，只在发现问题才触发。

## 安装

本技能预装于所有 MyClaw 实例。无需手动安装。

如需手动安装：
```bash
cp -r myclaw-tips ~/.openclaw/workspace/skills/
```

## 使用

### Agent 自动分享

无需任何操作，Agent会在恰当时机自动分享 tips。

### 手动查询

```bash
#列出所有 tips
node ~/.openclaw/workspace/skills/myclaw-tips/scripts/list.js

# 获取特定 tip
node ~/.openclaw/workspace/skills/myclaw-tips/scripts/get.js <tip-id>

# 检查是否有值得分享的 tip
node ~/.openclaw/workspace/skills/myclaw-tips/scripts/check.js
```

## 扩展 Tips

在 `data/tips.json` 中添加新 tip：

```json
{
  "id": "your-tip-id",
  "title": "你的 Tip 标题",
  "icon": "💡",
  "trigger": {
    "type": "keyword|behavior|cron",
    "pattern": ["关键词1", "关键词2"]
  },
  "content": "Tip 内容",
  "action": {
    "type": "command|link|guide",
    "value": "操作指引"
  },
  "priority": 1-10,
  "tags": ["tag1", "tag2"]
}
```

## 触发时机讨论

### 当前方案

1. **Agent 感知**：在 system prompt 中注入指令，让 Agent 根据上下文感知何时分享
2. **Cron 检查**：低频检查，发现问题才触发

### 可能的改进方向

1. **事件驱动**：在 compaction发生时触发
2. **用户画像**：根据用户使用历史决定触发哪些 tip
3. **A/B 测试**：测试不同触发策略的效果
4. **用户控制**：让用户选择想要接收哪些 tip

## 关于这个 Skill

- **版本**: 1.0.0
- **作者**: MyClaw Team
- **许可证**: MIT
- **反馈**: https://github.com/myclawai/skills/issues

## Powered by MyClaw

👉 [myclaw.ai](https://myclaw.ai)