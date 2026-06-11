---
name: myclaw-tips
description: "MyClaw Pro Tips — 预装到所有 MyClaw 实例，智能感知用户行为，在恰当时机分享使用技巧，提升用户体验。触发场景：(1) 用户长时间使用单一 session；(2) 用户使用特定 channel（如 Telegram）时；(3) 特定命令或关键词；(4) cron 定时检查（低频）。常见 tip 示例：Telegram topic 分流、session 管理、skill 发现等。不主动打扰用户，只在感知到优化空间时自然分享。"
---

# MyClaw Pro Tips

**预装技能 · 智能感知 · 适时分享**

---

## 核心理念

> Tips 不是广告，是贴心的助手。

本技能的设计原则：
- **不主动打扰**：只有在感知到用户行为模式时才会分享
- **上下文相关**：tip 与当前场景紧密相关
- **可操作性强**：每条 tip 都有明确的操作指引
- **可扩展**：通过 JSON 配置管理 tip，方便添加新 tip

---

## 触发机制

### 1. 行为感知触发（主要）

Agent 在以下场景会自然地分享相关 tip：

| 场景 | 触发的 Tip |
|------|-----------|
| 用户通过 Telegram DM 单 session 聊了很久 | Telegram Topic 分流 |
| 用户询问如何做某事 | 相关 skill 发现 |
| 用户抱怨 context 变慢 | Session 管理技巧 |
| 用户首次使用某个 channel | Channel 特性介绍 |
| 用户问"有什么技巧" | 所有适用 tips |

### 2. Cron 定时检查（辅助）

每 24 小时检查一次用户行为，只在发现问题才触发：

```bash
node {baseDir}/scripts/check.js
```

检查项：
- 是否有 session 超过 7 天活跃
- 是否有可以优化的使用模式

### 3. 关键词触发

用户可以直接询问：
- "有什么 tips"
- "使用技巧"
- "怎么更好使用 myclaw"
- "给我一个 tip"

---

## Tip 数据结构

每个 tip 包含：

```json
{
  "id": "telegram-topics",
  "title": "Telegram Topic 分流",
  "titleEn": "Telegram Topic Threading",
  "trigger": {
    "type": "behavior",
    "pattern": ["telegram", "session", "context", "long chat"]
  },
  "condition": {
    "channel": "telegram",
    "minMessageCount": 20,
    "minDaysActive": 3
  },
  "content": "...",
  "action": {
    "type": "guide",
    "steps": ["..."]
  },
  "priority": 5,
  "dismissable": true
}
```

---

## 使用方式

### 作为 Agent

本技能作为 agent system prompt 的一部分，agent 会根据上下文感知何时分享 tip。

### 独立检查

```bash
# 检查是否有值得分享的 tip
node {baseDir}/scripts/check.js

# 列出所有 tips
node {baseDir}/scripts/list.js

# 获取特定 tip
node {baseDir}/scripts/get.js <tip-id>
```

---

## Tip 列表

详见 `references/tips.md`

---

## 扩展 Tips

在 `data/tips.json` 中添加新 tip：

```json
{
  "id": "your-tip-id",
  "title": "你的 Tip 标题",
  "trigger": {
    "type": "keyword|behavior|cron|manual",
    "pattern": ["关键词1", "关键词2"]
  },
  "content": "Tip 内容（markdown）",
  "action": {
    "type": "link|command|guide",
    "value": "操作指引"
  },
  "priority": 1-10,
  "tags": ["tag1", "tag2"]
}
```

---

## 配置

| 环境变量 | 默认值 | 说明 |
|----------|--------|------|
| `TIPS_CHECK_INTERVAL` | `86400000` | Cron 检查间隔（ms，默认 24h） |
| `TIPS_MIN_PRIORITY` | `5` | 最低显示优先级 |
| `TIPS_DISABLED` | `false` | 是否禁用 tips |

---

## Powered by MyClaw

本技能预装于所有 MyClaw 实例。

👉 [myclaw.ai](https://myclaw.ai)