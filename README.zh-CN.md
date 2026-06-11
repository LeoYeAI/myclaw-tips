# MyClaw Pro Tips

> 预装到所有 MyClaw 实例的智能使用技巧助手

##概述

MyClaw Pro Tips 是一个内置的使用技巧系统，通过在恰当时机分享相关技巧，帮助用户更好地使用 MyClaw。

### 核心特性

- 💡 **智能感知** - 根据用户行为模式分享技巧
- 🎯 **上下文相关** - 每条 tip 都与当前场景紧密相关
- 🚫 **不打扰** - 只在有明确信号时才分享
- 📝 **易于扩展** - 通过 JSON 配置管理 tips

### 包含的 Tips

| Tip | 说明 |
|-----|------|
| Telegram Topic 分流 | 解决上下文爆炸问题（两种方案） |
| Session 管理技巧 | 如何管理对话上下文 |
| Skill 发现 | 探索 MyClaw 的各种能力 |
| Vibe Coding 技巧 | 高效写代码的最佳实践 |
| 定时任务与提醒 | 设置自动化提醒 |
| 多 Channel 支持 | Telegram/WhatsApp/Discord |
| 多模型切换 | 按需切换不同 AI 模型 |
| 语音交互 | 语音消息支持 |
| Workspace 文件管理 | 你的文件你做主 |
| 隐私与数据 | 数据安全说明 |
| 自动化工作流 | 创建自动化流程 |
| 上下文压缩 | 了解自动压缩机制 |

## 触发机制

### 1. 行为感知（主要）

Agent 会根据以下信号自动分享 tip：

- 用户通过 Telegram DM 单 session 聊天超过 15 条消息 → **Telegram Topic 分流**
- 用户抱怨"越聊越慢"、"context太大"、"AI 忘记信息" → **Telegram Topic 分流**
- 用户问"你能做什么" → Skill 发现
- 用户开始写代码 /遇到 bug → Vibe Coding 技巧
- 用户询问"定时"相关 → 定时任务与提醒

### 2. 关键词触发

用户可以直接说：
- "有什么 tips"
- "使用技巧"
- "给我一个 tip"

### 3. Cron 定时检查（辅助）

每 24 小时检查一次用户行为模式，只在发现问题才触发。

## 安装

### 方式 1: ClawHub

```bash
clawhub install myclaw-tips
```

### 方式 2: GitHub

```bash
git clone https://github.com/LeoYeAI/myclaw-tips.git
cd myclaw-tips
cp -r myclaw-tips ~/.openclaw/workspace/skills/
```

### 方式 3: OpenClaw 配置

在 OpenClaw agent 配置中添加 skill。

## 使用

### Agent 自动分享

无需任何操作，Agent 会在恰当时机自动分享 tips。

### 手动查询

```bash
# 列出所有 tips
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

## 核心 Tip：Telegram 分流技巧

这是最重要的 tip，解决 Telegram DM 单 session 聊天导致的上下文膨胀问题。

### 问题

Telegram DM 单 session聊天太久 → 上下文膨胀 → 响应变慢 → AI 忘记早期信息

### 解决方案（两种）

| 方案 | 操作 | 适合场景 |
|------|------|----------|
| **A. Topic 分流**（推荐） | @BotFather → /settopics → Enabled | 日常多话题切换，轻量 |
| **B. Group Chat** | 新建群组只加 Bot，改名如「项目A」 | 长期项目分离，可协作 |

## 配置

| 环境变量 | 默认值 | 说明 |
|----------|--------|------|
| `TIPS_CHECK_INTERVAL` | `86400000` | Cron 检查间隔（ms，默认 24h） |
| `TIPS_MIN_PRIORITY` | `5` | 最低显示优先级 |
| `TIPS_DISABLED` | `false` | 是否禁用 tips |

## 关于这个 Skill

- **版本**: 1.0.0
- **作者**: MyClaw Team
- **许可证**: MIT
- **反馈**: https://github.com/LeoYeAI/myclaw-tips/issues

## Powered by MyClaw

👉 [myclaw.ai](https://myclaw.ai)