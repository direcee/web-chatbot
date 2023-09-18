# First Contentful Paint 首次内容绘制 (FCP)

> 首次内容绘制 (FCP) 是测量感知加载速度的一个以用户为中心的重要指标，因为该项指标会在用户首次在屏幕上看到任何内容时，在页面加载时间轴中标记出相应的点，迅捷的 FCP 有助于让用户确信某些事情正在进行。

## 什么是 FCP？

首次内容绘制 (FCP) 指标测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间。对于该指标，"内容"指的是文本、图像（包括背景图像）、\<svg\>元素或非白色的\<canvas\>元素。

![FCP 时间轴](https://web-dev.imgix.net/image/admin/3UhlOxRc0j8Vc4DGd4dt.png?auto=format&w=1252)
在上方的加载时间轴中，FCP 发生在第二帧，因为那是首批文本和图像元素在屏幕上完成渲染的时间点。

您会注意到，虽然部分内容已完成渲染，但并非所有内容都已经完成渲染。这是首次内容绘制 (FCP) 与*Largest Contentful Paint 最大内容绘制 (LCP)*（旨在测量页面的主要内容何时完成加载）之间的重要区别。

![良好的 FCP 值是 1.8 秒或更短，差的值大于 3.0 秒，中间的任何东西都需要改进](https://web-dev.imgix.net/image/eqprBhZUGfb8WYnumQ9ljAxRrA72/V1mtKJenViYAhn05WxqR.svg)

## 怎样算是良好的 FCP 分数？

为了提供良好的用户体验，网站应该努力将首次内容绘制控制在1.8 秒或以内。为了确保您能够在大部分用户的访问期间达成建议目标值，一个良好的测量阈值为页面加载的第 75 个百分位数，且该阈值同时适用于移动和桌面设备。

## 如何测量 FCP

本站FCP使用 GoogleChrome web-vitals 进行测量 [https://github.com/GoogleChrome/web-vitals](https://github.com/GoogleChrome/web-vitals)

## 如何改进 FCP

- [消除阻塞渲染的资源](https://web.dev/render-blocking-resources/)
- [缩小 CSS](https://web.dev/unminified-css/)
- [移除未使用的 CSS](https://web.dev/unused-css-rules/)
- [预连接到所需的来源](https://web.dev/uses-rel-preconnect/)
- [减少服务器响应时间 (TTFB)](https://web.dev/ttfb/)
- [避免多个页面重定向](https://web.dev/redirects/)
- [预加载关键请求](https://web.dev/uses-rel-preload/)
- [避免巨大的网络负载](https://web.dev/total-byte-weight/)
- [使用高效的缓存策略服务静态资产](https://web.dev/uses-long-cache-ttl/)
- [避免 DOM 过大](https://web.dev/dom-size/)
- [最小化关键请求深度](https://web.dev/critical-request-chains/)
- [确保文本在网页字体加载期间保持可见](https://web.dev/font-display/)
- [保持较低的请求数和较小的传输大小](https://web.dev/resource-summary/)
