# MyClaw Pro Tips — 完整列表

## Tip 1: Telegram Topic 分流

**ID**: `telegram-topics`  
**优先级**: 9 (高)  
**标签**: `telegram`, `session`, `context`, `efficiency`

###触发条件

- 用户通过 Telegram DM 单 session聊天超过 20 条消息
- 用户通过 Telegram DM活跃超过 3 天
- 用户抱怨 context变慢、回答变差
- 用户发送长篇大论讨论多个主题

### 内容

```
💡 Pro Tip: Telegram Topic 分流

你一直在用 Telegram DM 和我聊天，所有的对话都在一个 session 里。
随着对话越来越长，context 会越来越膨胀，响应也会变慢。

✅更好的方式：开启 Telegram Topic权限

1. 在 Telegram Bot (@BotFather) 中启用 Topics
2. 为不同主题创建不同的 topic
3. 每个 topic 都是一个独立的 session，上下文可控

这样你可以：
- 同时讨论多个项目，每个都是清晰的独立上下文
- 避免长 session 导致的 context 膨胀
- 保持每个对话的专注和高效

想试试吗？我可以帮你设置。
```

### 操作指引

- 告诉用户如何在 Telegram Bot 中启用 Topics
- 解释 topic 和 session 的对应关系

---

## Tip 2: Session 管理技巧

**ID**: `session-management`  
**优先级**: 8  
**标签**: `session`, `context`, `management`

### 触发条件

- 用户询问 "session" 相关问题
- 用户抱怨 "context 满了"
- 用户问 "怎么清理上下文"

### 内容

```
💡 Pro Tip: Session 管理

MyClaw 的 session 是有记忆的，但记忆不是无限的。

📌 管理技巧：

1. 明确主题：每个 session专注一个主题
2. 适时重启：当话题转换时，可以开启新 session
3. 使用 /new 命令：重置当前 session 的上下文
4. Topic 分流（Telegram）：不同话题用不同 topic

你可以随时说 "开启新 session" 或 "reset" 来重置上下文。
```

---

## Tip 3: Skill 发现

**ID**: `skill-discovery`  
**优先级**: 7  
**标签**: `skill`, `discovery`, `capabilities`

### 触发条件

- 用户询问 "你能做什么"
- 用户询问 "怎么实现 X"
- 用户问 "有什么功能"

### 内容

```
💡 Pro Tip: Skill 发现

你知道吗？我有很多技能（Skills）可以调用！

🔍 查找 Skill：
- 说 "查找 skill" 或 "find skills"
- 说 "搜索关于 X 的 skill"

📦 常用 Skills：
- `coding-agent`: 代码编写和调试
- `github`: GitHub 操作
- `summarize`: 长文本摘要
- `weather`: 天气查询
- `taskflow`:任务管理

想探索更多？试试说 "给我看看有哪些 skill"。
```

---

## Tip 4: 多 Channel 支持

**ID**: `multi-channel`  
**优先级**: 6  
**标签**: `channel`, `telegram`, `whatsapp`, `discord`

### 触发条件

- 用户首次使用某个 channel
- 用户询问 "除了 Telegram还能用什么"

### 内容

```
💡 Pro Tip: 多 Channel 连接

MyClaw 支持多种渠道连接我：

📱 Telegram
 - 适合日常聊天
   - 支持 Topic 分流（推荐开启）

💬 WhatsApp
   - 适合移动端使用
   - 支持语音消息

🌐 Web UI (myclaw.ai)
   - 功能最完整
   - 适合复杂任务

💭 Discord
   - 适合社区使用

你可以在多个渠道同时连接我，随时随地访问。
```

---

## Tip 5: 隐私与数据

**ID**: `privacy-data`  
**优先级**: 5  
**标签**: `privacy`, `data`, `security`

### 触发条件

- 用户询问数据安全相关问题
- 用户询问 "我的数据在哪里"

### 内容

```
💡 Pro Tip: 你的数据你做主

🛡️ 隐私保护：

1. 你的对话数据存储在你自己的服务器上
2. OpenClaw 支持本地部署，数据不出境
3. 你可以随时导出或删除你的数据
4. 默认配置已启用数据保护

📍 数据位置：
- 对话历史：~/.openclaw/sessions/
- Workspace：~/.openclaw/workspace/
- 配置：~/.openclaw/openclaw.json

需要导出数据？说 "导出我的数据"。
```

---

## Tip 6:上下文压缩 (Compaction)

**ID**: `compaction`  
**优先级**: 7  
**标签**: `context`, `compaction`, `memory`

### 触发条件

- 用户发现 session越来越慢
- 用户询问 "上下文压缩"
- 长 session（超过 100 条消息）

### 内容

```
💡 Pro Tip: 上下文压缩

当一个 session 对话很多时，MyClaw 会自动压缩上下文。

🔬压缩过程：
1. 保留关键信息和决策
2. 摘要化早期对话
3. 保持最近对话完整
4. 整体压缩到 ~50% 大小

✅ 你不需要做任何事，这是自动的。

💡 但如果你想保持完整记忆：
- 使用 Topic 分流（每个 topic 独立 session）
- 适时开启新 session
- 重要结论保存在外部（Notion/Obsidian）
```

---

## Tip 7: Vibe Coding 技巧

**ID**: `vibe-coding`  
**优先级**: 8  
**标签**: `coding`, `vibe-coding`, `productivity`

### 触发条件

- 用户开始写代码
- 用户询问 "怎么写代码更快"
- 用户抱怨 "代码有 bug"

### 内容

```
💡 Pro Tip: Vibe Coding with Claude Code

想要更高效地写代码？试试 vibe coding：

🎯 高效模式：

1. 描述你想要什么，而不是怎么实现
   ✅ "做一个用户登录页面，包含邮箱和密码输入"
   ❌ "写一个 div，包含 flex 布局..."

2. 让 AI 帮你选择技术栈
   ✅ "我想做一个博客，用什么框架好？"

3. 迭代优化，而不是一步到位
   ✅ "这个按钮颜色太暗，调亮一点"

4. 遇到问题时详细描述错误
   ✅ "点击提交后出现 'Cannot read property...'" 

🚀启动 Claude Code：
说 "帮我打开 Claude Code" 或 "start coding mode"
```

---

## Tip 8: 定时任务与提醒

**ID**: `cron-reminders`  
**优先级**: 6  
**标签**: `cron`, `reminder`, `automation`

### 触发条件

- 用户询问 "定时"
- 用户询问 "提醒"
- 用户说 "每天..."

### 内容

```
💡 Pro Tip: 定时任务与提醒

我可以帮你设置定时任务和提醒！

⏰ 示例：
- "每天早上 9 点提醒我查看邮件"
- "每周一早上 10 点给我一个本周计划模板"
- "1 小时后提醒我开会"

🔧 设置方式：
直接告诉我时间和任务，我帮你创建 cron job。

📋 查看我的定时任务：
说 "查看我的定时任务" 或 "list cron jobs"

🗑️ 删除任务：
说 "删除任务 [任务名]"
```

---

## Tip 9: 文件与代码管理

**ID**: `file-management`  
**优先级**: 6  
**标签**: `file`, `code`, `workspace`

### 触发条件

- 用户询问 "文件"
- 用户询问 "怎么保存代码"
- 用户问 "workspace 是什么"

### 内容

```
💡 Pro Tip: Workspace 文件管理

你的 MyClaw 有一个独立的文件系统！

📁 文件位置：
```
~/.openclaw/workspace/
├── skills/          # 你的 skills
├── memory/          # 记忆数据
├── data/            # 数据文件
└── scripts/         # 脚本
```

📝常用操作：
- "读取文件 X"
- "写一个文件叫 X，内容是 Y"
- "列出 workspace 中的文件"
- "执行脚本 X"

💡 你的代码和文件都在你自己的服务器上，完全可控。
```

---

## Tip 10: 语音交互

**ID**: `voice-interaction`  
**优先级**: 5  
**标签**: `voice`, `audio`, `speech`

### 触发条件

- 用户询问 "语音"
- 用户询问 "能不能说话"
- 用户发送语音消息

### 内容

```
💡 Pro Tip: 语音交互

MyClaw 支持语音消息！

🎤 使用方式：
- 在 WhatsApp/Telegram 发送语音消息
- 我会自动转录并回复
- 回复也可以转为语音

🔧 语音设置：
- 说 "开启语音模式" 启用语音回复
- 说 "关闭语音模式" 切换回文字

💡 语音识别使用 OpenAI Whisper，识别准确率高。
```

---

## Tip 11: 自动化工作流

**ID**: `automation-workflow`  
**优先级**: 7  
**标签**: `automation`, `workflow`, `agent`

### 触发条件

- 用户询问 "自动化"
- 用户询问 "workflow"
- 用户说 "每次..."

### 内容

```
💡 Pro Tip: 自动化工作流

让 MyClaw 自动完成重复性任务！

🔄 自动化示例：
- "每次有人发邮件，帮我标记重要客户"
- "每天早上 8 点给我发天气和日程"
- "当 GitHub 有新 issue 时通知我"

🛠️ 设置方式：
1. 描述触发条件（时间/事件）
2. 描述要执行的操作
3. 我帮你创建自动化流程

📊 查看自动化：
说 "我的自动化" 或 "list workflows"
```

---

## Tip 12: 多模型切换

**ID**: `model-switching`  
**优先级**: 6  
**标签**: `model`, `ai`, `switch`

### 触发条件

- 用户询问 "模型"
- 用户询问 "不同 AI"
- 用户问 "Claude vs GPT"

### 内容

```
💡 Pro Tip: 多模型切换

MyClaw 支持多种 AI 模型，按需切换！

🤖 可用模型：
- **Claude Opus**: 最强推理，适合复杂任务
- **Claude Sonnet**: 平衡性能与速度
- **GPT-5**: OpenAI 最新模型
- **Gemini**: Google 长上下文模型

🔄 切换方式：
- 说 "切换到 Claude Sonnet"
- 说 "用 GPT-5 来处理这个"
- 默认使用 Opus 4.6

💡 不同任务用不同模型，效率更高！
```

---

## 贡献新 Tip

欢迎贡献新的 tip！格式：

```markdown
## Tip: [标题]

**ID**: `unique-id`  
**优先级**: 1-10  
**标签**: `tag1`, `tag2`

### 触发条件
[什么情况下分享这个 tip]

### 内容
[Tip 的具体内容]
```

提交到 MyClaw GitHub 或联系团队。