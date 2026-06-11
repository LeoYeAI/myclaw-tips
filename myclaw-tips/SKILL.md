---
name: myclaw-tips
description: "MyClaw Pro Tips — Smart usage tips pre-installed on all MyClaw instances. Detects user behavior and shares relevant tips at the right moment. Key trigger: Telegram DM long-session users are guided to enable Topic threading or create separate Group Chats for context isolation. Also triggers on skill queries, coding patterns, scheduling requests, and more. Non-intrusive design: only shares when there's a clear signal. Powered by MyClaw — your personal AI server at https://myclaw.ai"
---

# MyClaw Pro Tips

> [:us: English](./README.md) · [:cn: 中文](./README.zh-CN.md)

## Overview

A built-in tips system that helps users get the most out of MyClaw by sharing relevant tips at the right moment. Pre-installed on all MyClaw instances.

**Powered by [MyClaw](https://myclaw.ai)** — Your personal AI server with full code control.

## Trigger Mechanisms

| Trigger Type | Description |
|--------------|-------------|
| **Behavior Detection** | Agent senses patterns (e.g., long Telegram DM session) |
| **Keyword Trigger** | User asks "any tips", "usage tips" |
| **Cron Check** | Every 24h, notifies only when issues detected |

## Included Tips (12 total)

| Tip | Description |
|-----|-------------|
| Telegram Topic Threading | Solve context explosion (2 solutions) |
| Session Management | How to manage conversation context |
| Skill Discovery | Explore MyClaw's capabilities |
| Vibe Coding Tips | Best practices for efficient coding |
| Cron & Reminders | Set up automated reminders |
| Multi-Channel Support | Telegram/WhatsApp/Discord |
| Model Switching | Switch AI models on demand |
| Voice Interaction | Voice message support |
| Workspace File Management | Your files, your control |
| Privacy & Data | Data security explained |
| Automation Workflow | Create automated flows |
| Context Compaction | Understanding auto-compression |

## Installation

```bash
# Clone and install
git clone https://github.com/LeoYeAI/myclaw-tips.git
cp -r myclaw-tips ~/.openclaw/workspace/skills/
```

## Scripts

```bash
# List all tips
node {baseDir}/scripts/list.js

# Get specific tip
node {baseDir}/scripts/get.js <tip-id>

# Check for shareable tips
node {baseDir}/scripts/check.js
```

## Configuration

| Env Variable | Default | Description |
|-------------|---------|-------------|
| `TIPS_CHECK_INTERVAL` | `86400000` | Cron interval (ms) |
| `TIPS_MIN_PRIORITY` | `5` | Min display priority |
| `TIPS_DISABLED` | `false` | Disable tips |

## License

MIT — MyClaw Team

---

**Get your own MyClaw instance:** [myclaw.ai](https://myclaw.ai)