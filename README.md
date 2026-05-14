# 🌾 王者农场攻略站

王者荣耀游戏内农场模式的非官方攻略网站。

## 站点预览

访问地址：[https://wz-farm-guide.pages.dev](https://wz-farm-guide.pages.dev)

## 技术栈

- 纯静态 HTML/CSS/JS
- 清新农场风 UI
- 响应式设计，支持移动端
- 无需构建工具，一键部署

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/yintao0303/wz-farm-guide.git

# 直接用浏览器打开 index.html 即可预览
open index.html
```

## 部署

本站使用 Cloudflare Pages 部署。

### Cloudflare Pages 部署配置

1. 登录 Cloudflare Dashboard → Pages
2. 点击「Create a project」→「Connect to Git」
3. 选择 `yintao0303/wz-farm-guide` 仓库
4. 构建设置：
   - **Framework preset**: None
   - **Build command**: 留空（纯静态站点）
   - **Build output**: 当前目录（`/`）
5. 点击「Save and Deploy」

### 自定义域名（可选）

在 Pages 项目的「Custom domains」中添加你的域名。

## 目录结构

```
wz-farm-guide/
├── index.html              # 首页
├── guide/                  # 攻略页面
│   ├── basics.html         # 基础入门
│   ├── crops.html          # 作物图鉴
│   ├── leveling.html       # 升级攻略
│   ├── heroes.html         # 英雄作物
│   ├── giant.html          # 巨大化种植
│   ├── social.html         # 社交系统
│   ├── seeds.html          # 种子合成
│   └── faq.html            # 常见问题
├── assets/
│   ├── css/
│   │   └── style.css       # 样式文件
│   └── js/
│       └── main.js         # 主脚本
└── README.md               # 本文件
```

## 数据来源

攻略数据来源于 B 站 UP 主（回忆辅助导师、7号机、修鸽儿解说、伟氏解说等）的视频内容及玩家社区整理。

## 贡献

欢迎通过 Issue 或 Pull Request 提交补充内容和数据修正。

## 免责声明

- 本站与腾讯公司及《王者荣耀》官方无任何隶属关系
- 游戏内数据以实际版本为准
- 部分攻略为玩家经验总结，不保证 100% 准确

## License

MIT
