## 最小化接入

### 步骤一：H5管理平台注册应用

浏览器打开H5管理平台 [项目开发/应用管理](http://ac.qiyi.domain/activity)，点击新建按钮，填写表单后保存应用，即完成在平台注册应用。

> 注意：
>
> 应用名称需要为英文字母数字下划线组成
>
> 应用名称为全局唯一标识，请自行确保唯一性（平台在执行保存动作时会校验唯一性）
>
> 应用名称需要保存下来作为C端H5页面的投递标识

### 步骤二：前端页面引用监控Agent

```html
<!-- body添加 name属性 ，注意name属性的取值为步骤一中录入的应用名称-->
<body name="xx"></body>

<!-- 在body中应用监控Agent，【注意！！请将此js尽可能放在所有js代码执行之前，否则之前的代码异常无法捕捉】-->
<script crossorigin="anonymous" src="https://static.iqiyi.com/js/common/oaa.min.js"></script>
```

> TV域名可使用此链接 <https://static.ptqy.gitv.tv/js/common/oaa.min.js>

### 步骤三：观测投递数据

浏览器打开H5管理平台 [流量中心/应用概况](http://ac.qiyi.domain/AppsOverview)，等待数据投递即可。
