# CLI服务

## 使用命令

在一个 AC CLI 项目中，@iqiyi-vip/ac-cli 安装了一个名为 ac 的命令。你可以在 npm scripts 中以 ac、或者从终端中以 ./node_modules/.bin/ac 访问这个命令。

这是你使用的项目的 package.json：

```bash
{
  "scripts": {
    "dev": "ac serve",
    "build": "ac build",
    "deploy:test": "ac deploy:test",
    "deploy:prod": "ac deploy:prod",
  }
}
```

你可以通过 npm 或 Yarn 调用这些 script：

```bash
npm run dev
# 或者
yarn dev
```

如果你可以使用 npx (最新版的 npm 应该已经自带)，也可以直接这样调用命令：

```bash
npx ac dev
```

## ac serve

```bash
用法：ac serve [options]

功能：启动本地开发

选项：

    --config 指定配置文件
```

ac serve 命令会启动一个开发服务器 (基于 [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)) 并附带开箱即用的模块热重载 (Hot-Module-Replacement)。

## ac build

```bash
用法：ac build [options]

功能：产出物构建

选项：

    --config 指定配置文件
```

ac build 会在 dist/ 目录产生一个可用于生产环境的包，带有 JS/CSS/HTML 的压缩，以及会根据构建统计生成报告，它会帮助你分析包中包含的模块们的大小。

## ac deploy:test

```bash
用法：ac deploy:test [options]

功能：构建产出物并将其上传到测试服务器

选项：

    --config 指定配置文件
    --vconsole 产出物注入vconsole
    --eruda 产出物注入eruda
```

## ac deploy:prod

```bash
用法：ac deploy:prod [options]

功能：构建产出物并将其上传到预发布服务器

选项：

    --config 指定配置文件
```

> **warning**
>
> **注意**非特殊情况，否则请使用GitLab CI触发此命令

## 查看所有的可用命令

```bash
npx ac --help

npx ac dev --help
```
