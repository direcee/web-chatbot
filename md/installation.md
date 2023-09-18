# 前提条件

在开始之前，请确保安装了 [Node.js](https://nodejs.org/) 的最新版本。使用 [Node.js](https://nodejs.org/) 最新的长期支持版本(LTS - Long Term Support)，是理想的起步。 使用旧版本，你可能遇到各种问题，因为它们可能缺少 AC CLI 功能， 或者缺少相关 package。

> **Node版本要求**
>
> AC CLI需要 [Node.js](https://nodejs.org/) v12.13.0或更高版本。你可以使用 [n](https://github.com/tj/n) , [nvm](https://github.com/creationix/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个Node版本。

# 本地安装

最新的 AC CLI 正式版本是：

[Gitlab release](http://gitlab.qiyi.domain/vipfe/h5/manage/ac-cli/tags)

要安装最新版本或特定版本，请运行以下命令之一：

```bash
# 通过npm安装最新版本
npm config set registry http://jfrog.cloud.qiyi.domain:80/api/npm/npm/
npm install --save-dev @iqiyi-vip/ac-cli

# 或者通过yarn安装最新版本
yarn config set registry http://jfrog.cloud.qiyi.domain:80/api/npm/npm/
yarn add @iqiyi-vip/ac-cli --dev

# 通过npm安装特定版本
npm config set registry http://jfrog.cloud.qiyi.domain:80/api/npm/npm/
npm install --save-dev @iqiyi-vip/ac-cli@<version>

# 或者通过yarn安装特定版本
yarn config set registry http://jfrog.cloud.qiyi.domain:80/api/npm/npm/
yarn add @iqiyi-vip/ac-cli@<version> --dev
```

对于大多数项目，我们建议本地安装。这可以在引入重大更新(breaking change)版本时，更容易分别升级项目。 通常会通过运行一个或多个 npm scripts 以在本地 node_modules 目录中查找安装的 AC CLI， 来运行 AC CLI：

```bash
"scripts": {
  "build": "ac --config ac.config.js"
}
```

> **Tip**
>
> 想要运行本地安装的 AC CLI，你可以通过 node_modules/.bin/ac 来访问它的二进制版本。另外，如果你使用的是 npm v5.2.0 或更高版本，则可以运行 npx ac 来执行。

# 全局安装

通过以下安装方式，可以使 AC CLI 在全局环境下可用：

```bash
# 通过npm安装最新版本
npm config set registry http://jfrog.cloud.qiyi.domain:80/api/npm/npm/
npm install --global @iqiyi-vip/ac-cli

# 或者通过yarn安装最新版本
yarn config set registry http://jfrog.cloud.qiyi.domain:80/api/npm/npm/
yarn global add @iqiyi-vip/ac-cli
```

> **Warning**
>
> **不推荐**全局安装AC CLI。这会将你项目中的 AC CLI 锁定到指定版本，并且在使用不同的 AC CLI 版本的项目中， 可能会导致构建失败。

# 最新体验版本

如果你热衷于使用最新版的 AC CLI，你可以使用以下命令安装beta版本，或者直接从 AC CLI 的仓库中安装：

```bash
npm install --save-dev @iqiyi-vip/ac-cli@next
# 或特定的 tag/分支
npm install --save-dev @iqiyi-vip/ac-cli#<tagname/branchname>
```

> **Warning**
>
> 安装这些最新体验版本时要小心！它们可能仍然包含 bug，因此不应该用于生产环境。
