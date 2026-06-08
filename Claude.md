# uiauto.dev Plugin Template

uiauto.dev 插件模板项目。基于 Preact + TypeScript + Tailwind CSS。一个插件由三个核心文件组成：

- `plugin.json` — 插件元信息（名称、版本、描述）
- `app.tsx` — 插件逻辑入口，引用 `plugin-runtime.d.ts` 获取类型
- `index.html` — 插件 UI

## 项目初始化

当用户说"初始化项目", "init", 或"我要初始化项目"时，执行以下流程：

1. 询问用户：这个插件是做什么的？让用户描述功能
2. 根据描述推荐 3 个合适的名字（不超过 5 个字），让用户选择或自己起名
3. 将用户确认的名字和描述写入 `plugin.json` 的 `name` 和 `description` 字段，`version` 设为 `1.0.0`，`homepage` 设置为当前 github 地址
4. 检查 `node_modules` 是否存在，不存在则 `npm install`
5. 执行 `npm run fetch-types` 拉取类型定义
6. 读取刚拉取的定义文件，平台提供给插件的功能都在里面
7. 询问用户创建项目的具体细节，写一个方案让用户确认，然后开发项目

## 环境准备

```bash
npm install          # 安装依赖（首次运行前执行）
npm run fetch-types  # 拉取 plugin-runtime.d.ts 类型定义
```

## 常用命令

| 命令                  | 说明                                |
| --------------------- | ----------------------------------- |
| `npm run dev`         | 开发模式，监听 app.tsx 变化自动编译 |
| `npm run build`       | 将 app.tsx 编译为 app.js            |
| `npm run fetch-types` | 从运行时拉取类型定义文件            |

> 需要先确保 node_modules 存在，否则先 `npm install`。
