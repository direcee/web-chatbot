# 字段含义

| 字段名             |  类型  | 描述                       | 注意                             |
| :----------------- | :----: | :------------------------- | :------------------------------- |
| apps               | Array  | 应用配置列表               |
| apps[0]            | Object | 应用配置                   |
| apps[0].app        | String | 应用名称                   | 应与H5管理平台新建的应用名称一致 |
| apps[0].entry      | Object | 应用入口                   |                                  |
| apps[0].entry.js   | String | 应用 js 模块入口绝对路径   |                                  |
| apps[0].entry.html | String | 应用 html 模块入口绝对路径 |                                  |

# 示例

```javascript
module.exports = {
  "apps": [
    {
      "app": "app1",
      "entry": {
        "js": "xxx.js",
        "html": "xxx.html"
      }
    },
    {
      "app": "app2",
      "entry": {
        "js": "xxx.js",
        "html": "xxx.html"
      }
    },
  ],
};
```

# 注意事项

1. AC CLI将依次尝试在如下路径读取配置文件，当均不存在时将输出错误提示
   1. 用户通过 --config参数指定的路径
   2. 项目根目录内的 ac.config.js 文件
   3. 项目根目录config文件夹内的 ac.config.js 文件

2. 配置文件应该输出一个json结构

# GitLab CI配置

在项目根目录下创建 .gitlab-ci.yml 文件，写入如下内容：

## 示例

```yml
image: docker-registry.qiyi.virtual/vipfe/h5-business-yarn:1.0.4

stages:
  - deploy-prod

deploy-prod:
  stage: deploy-prod
  script:
    - yarn config set registry http://jfrog.cloud.qiyi.domain:80/api/npm/npm/
    - yarn install
    - ./node_modules/.bin/ac deploy:prod || exit 1
  retry: 2
  only:
    - tags
  cache:
    paths:
      - node_modules/
  artifacts:
    name: h5
    paths:
      - dist/
    untracked: false
```

## 注意事项

1. 当git tag被创建并提交后则会启动 pipelines 执行 deploy:prod指令
2. 如需要自定义config文件路径请修改 ./node_modules/.bin/ac deploy:prod --config xx
