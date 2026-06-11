# MyClaw Pro Tips

> [:us: English](./README.md) · [:cn: 中文](./README.zh-CN.md)

---

## English Version

> Smart usage tips pre-installed on all MyClaw instances

MyClaw Pro Tips is a built-in tips system that helps users get the most out of MyClaw by sharing relevant tips at the right moment.

### Key Features

- 💡 **Smart Detection** - Shares tips based on user behavior patterns
- 🎯 **Context-Aware** - Each tip is relevant to the current situation
- 🚫 **Non-Intrusive** - Only shares when there's a clear signal
- 📝 **Easily Extensible** - Manage tips via JSON configuration

### Included Tips

| Tip | Description |
|-----|-------------|
| Telegram Topic Threading | Solve context explosion (2 solutions) |
| Session Management | How to manage conversation context |
| Skill Discovery | Explore MyClaw's capabilities |
| Vibe Coding Tips | Best practices for efficient coding |
| Cron& Reminders | Set up automated reminders |
| Multi-Channel Support | Telegram/WhatsApp/Discord |
| Model Switching | Switch AI models on demand |
| Voice Interaction | Voice message support |
| Workspace File Management | Your files, your control |
| Privacy & Data | Data security explained |
| Automation Workflow | Create automated flows |
| Context Compaction | Understanding auto-compression |

## Quick Start

```bash
# Install
git clone https://github.com/LeoYeAI/myclaw-tips.git
cp -r myclaw-tips ~/.openclaw/workspace/skills/

# List all tips
node ~/.openclaw/workspace/skills/myclaw-tips/scripts/list.js

# Get specific tip
node ~/.openclaw/workspace/skills/myclaw-tips/scripts/get.js telegram-topics
```

## Core Tip: Telegram Topic Threading

**The Problem:** Telegram DM single session chat too long → context explosion → slower responses → AI "forgets" early information

**Solutions (Two Options):**

| Solution | How | Best For |
|----------|-----|----------|
| **A. Topic Threading** (Recommended) | @BotFather → /settopics → Enabled | Daily multi-topic switching |
| **B. Group Chat** | Create new group, add only Bot, rename like "ProjectA" | Long-term projects, collaboration |

## Installation

```bash
# Method 1: ClawHub
clawhub install myclaw-tips

# Method 2: GitHub
git clone https://github.com/LeoYeAI/myclaw-tips.git
cp -r myclaw-tips ~/.openclaw/workspace/skills/
```

## Extending Tips

Add new tips in `data/tips.json`:

```json
{
  "id": "your-tip-id",
  "title": "Your Tip Title",
  "icon": "💡",
  "trigger": {
    "type": "keyword|behavior|cron",
    "pattern": ["keyword1", "keyword2"]
  },
  "content": "Tip content",
  "action": {
    "type": "command|link|guide",
    "value": "action description"
  },
  "priority": 1-10,
  "tags": ["tag1", "tag2"]
}
```

## Powered by MyClaw

👉 [myclaw.ai](https://myclaw.ai)