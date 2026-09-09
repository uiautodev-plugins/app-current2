# 当前应用

一个 [uiauto.dev](https://get.uiauto.dev) 插件：获取当前前台应用的包名，并支持启动、强制停止与卸载。[English](./README.md)

## 功能

- **自动刷新**：插件打开后自动检测当前前台应用包名，每 3 秒静默轮询，切换应用后自动更新
- **启动入口列表**：通过 `cmd package query-activities` 解析该应用的全部 MAIN/LAUNCHER 入口（部分应用存在多个），点击即可启动
- **强制停止**：执行 `am force-stop` 停止当前应用
- **卸载**：二次确认后执行 `pm uninstall` 卸载当前应用
- **手动刷新开关**：点击刷新按钮可随时手动刷新；开启/关闭自动刷新

## 截图

![截图](screenshot.webp)

## 使用

1. 将插件目录放入 `~/.config/uiautodev/plugins/`
2. 安装依赖并构建：

```bash
npm install
npm run build
```

3. 在 uiauto.dev 中打开插件，保持设备在前台运行一个应用，插件会自动显示其包名。

## 项目结构

```
├── plugin.json          # 插件元信息（名称、版本、描述）
├── app.tsx              # 插件逻辑入口
├── app.js               # 编译产物（index.html 加载）
├── app.css              # Tailwind 编译产物（index.html 加载）
├── styles.css           # Tailwind 源入口
├── index.html           # 插件 UI 入口
└── plugin-runtime.d.ts  # 平台 API 类型定义
```

## 开发命令

```bash
npm run dev          # 开发模式，同时监听 app.tsx 与样式变化自动编译
npm run build        # 编译 Tailwind 为 app.css 并打包 app.tsx 为 app.js
npm run fetch-types  # 拉取最新类型定义（需 uiauto.dev 运行中）
```

## 许可证

[MIT](./LICENSE)

## 技术栈

- **Preact** — 轻量 UI 框架
- **lucide-preact** — 图标
- **TypeScript** — 类型安全
- **Tailwind CSS** — 本地构建期预编译（`darkMode: 'class'`，跟随页面 `<html class="dark">`）
- **esbuild** — 快速编译打包
