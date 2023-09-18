# Time to First Byte 第一字节时间 (TTFB)
> 第一字节时间 (TTFB) 是在实验室和现场测量连接建立时间和 Web 服务器响应能力的一个基础指标。它有助于识别 Web 服务器何时对请求的响应速度太慢。对 HTML 文档的请求，该指标先于其他所有的加载性能指标。

## TTFB 是什么?
TTFB 是一个衡量对资源的请求和响应的第一个字节开始和到达之间时间的指标。

![TTFB 图](https://web-dev.imgix.net/image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/ccT8ltSPrTri3tz7AA3h.png?auto=format)

TTFB 是下列请求节点的时间损耗汇总：
* Redirect time 重定向时延
* Service worker 启动时延（如果适用）
* DNS 查询时延
* 建立连接和 TLS 所消耗时延
* 请求，直到响应的第一个字节到达为止的时延

减少连接建立和后端服务的时延将有助于降低 TTFB

## 什么是好的 TTFB 分数?
由于 TTFB 先于[以用户为中心的指标](https://web.dev/user-centric-performance-metrics/)，如首次内容显示（FCP）和最大内容显示（LCP），因此建议您的服务器对请求的响应速度要足够快，以使 P75 的用户体验在良好的 FCP 分数。作为一个粗略的指导，大多数网站应努力使 TTFB 少于 0.8秒 。

![TTFB 文字](https://web-dev.imgix.net/image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/eNXaxPi9NdUVSTDRJFkV.svg)

> TTFB 不是 [核心 Web 指标](https://web.dev/vitals/)，因此，只要不妨碍他们在重要的指标上获得良好的分数，网站并不绝对需要达到“良好”的 TTFB 指标。

## 如何测量 TTFB
本站TTFB使用 GoogleChrome web-vitals 进行测量 [https://github.com/GoogleChrome/web-vitals](https://github.com/GoogleChrome/web-vitals)

## 如何优化 TTFB
优化 TTFB 在很大程度上取决于您的托管供应商和后端服务。TTFB 值高可能是由于以下一个或多个问题造成的。
* 托管服务商的基础设施能力不足，无法处理高流量负载
* 网络服务器的内存不足，可能导致 [系统颠簸](https://en.wikipedia.org/wiki/Memory_paging#Thrashing)
* 未经优化的数据库
* 不良的数据库服务器配置

通常通过选择一个合适的托管供应商是优化 TTFB ，其基础设施可确保高正常运行时间和响应能力。这与 CDN 相结合，可以起到帮助作用。

> 使用 Server-Timing API 来收集关于应用程序后端性能的额外现场数据，这可以帮助确定改进的机会，否则可能会被忽视。

其他优化高 TTFB 时延和相关感知延迟的机会包括：
* [避免多次重定向。](https://developer.chrome.com/docs/lighthouse/performance/redirects/)
* 提前向跨域资源源[建立连接 Preconnect。](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/)
* 将源提交给[HSTS预加载列表](https://hstspreload.org/),以消除 HTTP-HTTPS 重定向延迟。
* 使用 HTTP/2 or HTTP/3。
* 考虑预测性预取，为没有指定减少数据使用偏好的用户提供快速页面导航。
* 在可能和适当的情况下，使用服务器端生成（SSG）来代替SSR的标记。