---
name: myclaw-tips
description: "MyClaw Pro Tips — Smart usage tips pre-installed on all MyClaw instances. Detects user behavior and shares relevant tips at the right moment. Key trigger: Telegram DM long-session users are guided to enable Topic threading or create separate Group Chats for context isolation. Also triggers on skill queries, coding patterns, scheduling requests, and more. Non-intrusive design: only shares when there's a clear signal."
---

# MyClaw Pro Tips

> [:us: English](./README.md) · [:cn: 中文](./README.zh-CN.md)

## Overview

A built-in tips system that helps users get the most out of MyClaw.

## Trigger Mechanisms

| Trigger Type | Description |
|--------------|-------------|
| **Behavior Detection** | Agent senses patterns (e.g., long Telegram DM session) |
| **Keyword Trigger** | User asks "any tips", "usage tips" |
| **Cron Check** | Every 24h, notifies only when issues detected |

## Included Tips

12 tips covering: Telegram session management, skill discovery, vibe coding, cron reminders, multi-channel, model switching, voice, workspace, privacy, automation, context compaction.

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

MIT - MyClaw Team