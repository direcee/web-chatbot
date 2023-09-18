# Cumulative Layout Shift 累积布局偏移 (CLS)

> 累积布局偏移 (CLS) 是测量视觉稳定性的一个以用户为中心的重要指标，因为该项指标有助于量化用户经历意外布局偏移的频率，较低的 CLS 有助于确保一个页面是令人愉悦的。

您是否曾经历过在网上阅读一篇文章，结果页面上的某些内容突然发生改变？文本在毫无预警的情况下移位，导致您找不到先前阅读的位置。或者更糟糕的情况：您正要点击一个链接或一个按钮，但在您手指落下的瞬间，诶？链接移位了，结果您点到了别的东西！

大多数情况下，这些体验只是令人恼火，但在某些情况下，却可能带来真正的破坏。

<video autoplay="" controls="" height="510" loop="" muted="" poster="https://storage.googleapis.com/web-dev-assets/layout-instability-api/layout-instability-poster.png" width="658"><source type="video/webm; codecs=vp8" src="https://storage.googleapis.com/web-dev-assets/layout-instability-api/layout-instability2.webm"> <source type="video/mp4; codecs=h264" src="https://storage.googleapis.com/web-dev-assets/layout-instability-api/layout-instability2.mp4"></video>

<i>截屏视频说明了布局不稳定性会对用户产生怎样的负面影响。</i>

页面内容的意外移动通常是由于异步加载资源，或者动态添加 DOM 元素到页面现有内容的上方。罪魁祸首可能是未知尺寸的图像或视频、实际渲染后比后备字体更大或更小的字体，或者是动态调整自身大小的第三方广告或小组件。

让这个问题变得更加棘手的是，网站在开发环境中的运作方式通常与用户在网站上的实际体验大不相同。个性化或第三方内容在开发环境中的表现通常与其在实际情况中的表现不同，测试图像通常已经在开发者的浏览器缓存中了，并且本地调用 API 的速度一般非常快，几乎察觉不到延迟。

累积布局偏移 (CLS) 指标通过测量真实用户体验中发生偏移的频率来帮助您解决这一问题。

## 什么是 CLS？
CLS 测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数。

每当一个可见元素的位置从一个已渲染帧变更到下一个已渲染帧时，就发生了布局偏移 。（有关单次布局偏移分数计算方式的详细信息，请参阅下文。）

一连串的布局偏移，也叫会话窗口，是指一个或多个快速连续发生的单次布局偏移，每次偏移相隔的时间少于 1 秒，且整个窗口的最大持续时长为 5 秒。

最大的一连串是指窗口内所有布局偏移累计分数最大的会话窗口。

<video autoplay="" controls="" height="452" loop="" muted="" width="658"><source src="https://storage.googleapis.com/web-dev-assets/better-layout-shift-metric/session-window.webm" type="video/webm"> <source src="https://storage.googleapis.com/web-dev-assets/better-layout-shift-metric/session-window.mp4" type="video/mp4"></video>

<i>会话窗口示例。蓝色竖条代表每个单次布局偏移的分数。</i>

> 此前，CLS 测量的是整个页面生命周期内发生的所有单次布局偏移分数的总和。如需了解哪些工具仍然按照原方式提供测量功能，请查看[网络工具集中不断发展的累积布局偏移](https://web.dev/cls-web-tooling/) 。

## 怎样算是良好的 CLS 分数？
为了提供良好的用户体验，网站应该努力将 CLS 分数控制在0.1 或以下。为了确保您能够在大部分用户的访问期间达成建议目标值，一个良好的测量阈值为页面加载的第 75 个百分位数，且该阈值同时适用于移动和桌面设备。
![cls](https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/uqclEgIlTHhwIgNTXN3Y.svg)

> 如需详细了解这些建议值背后的研究和方法论，请参阅：[定义核心 Web 指标的指标阈值](https://web.dev/defining-core-web-vitals-thresholds/)

## 布局偏移详情
布局偏移由[布局不稳定性 API](https://github.com/WICG/layout-instability)定义，只要可视区域中可见元素的起始位置（例如，元素在默认书写模式下的顶部和左侧位置）在两帧之间发生了变更，该 API 就会报告layout-shift条目。这样的元素被视为不稳定元素。

请注意，只有当现有元素的起始位置发生变更时才算作布局偏移。如果将新元素添加到 DOM 或是现有元素更改大小，则不算作布局偏移，前提是元素的变更不会导致其他可见元素的起始位置发生改变。

## 布局偏移分数

浏览器在计算布局偏移分数时，会查看可视区域大小和两个已渲染帧之间的可视区域中不稳定元素的位移。布局偏移分数是该位移的两个度量的乘积：影响分数和距离分数（两者定义如下）。

布局偏移分数 = 影响分数 * 距离分数

## 影响分数 
[影响分数](https://github.com/WICG/layout-instability#Impact-Fraction)测量不稳定元素对两帧之间的可视区域产生的影响。

前一帧和当前帧的所有不稳定元素的可见区域集合（占总可视区域的部分）就是当前帧的影响分数。

![demo](https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/BbpE9rFQbF8aU6iXN1U6.png?auto=format)

在上图中，有一个元素在一帧中占据了一半的可视区域。接着，在下一帧中，元素下移了可视区域高度的 25%。红色虚线矩形框表示两帧中元素的可见区域集合，在本示例中，该集合占总可视区域的 75%，因此其影响分数为0.75 。

## 距离分数
布局偏移分数计算公式的另一部分测量不稳定元素相对于可视区域位移的距离。距离分数指的是任何不稳定元素在一帧中位移的最大距离（水平或垂直）除以可视区域的最大尺寸维度（宽度或高度，以较大者为准）。

![demo](https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/ASnfpVs2n9winu6mmzdk.png?auto=format)

在上方的示例中，最大的可视区域尺寸维度是高度，不稳定元素的位移距离为可视区域高度的 25%，因此距离分数为 0.25。

所以，在这个示例中，影响分数是0.75 ，距离分数是0.25 ，所以布局偏移分数是0.75 * 0.25 = 0.1875 。

> 最初，布局偏移分数只根据影响分数进行计算。引入距离分数是为了避免在大元素发生微小位移的情况下进行过度惩罚的情况。

下一个示例说明了向现有元素添加内容对布局偏移分数的影响：

![demo](https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/xhN81DazXCs8ZawoCj0T.png?auto=format)

"点我！"按钮附加在了包含黑色字体文本的灰色框底部，将带有白色字体文本的绿色框下推（且一部分已在可视区域外）。

在这个示例中，灰色框的大小改变了，但起始位置没有改变，所以该灰色框不是一个不稳定元素。

"点我！"按钮一开始并不在 DOM 中，所以它的起始位置也没有改变。

然而，绿色框的起始位置确实发生了变化，但由于绿色框的一部分已经在可视区域外，因此在计算影响分数时不考虑不可见区域。两帧中绿色框的可见区域集合（由红色虚线矩形框表示）与第一帧中绿色框的区域相同，为可视区域的 50%。影响分数为0.5 。

距离分数由紫色箭头表示。绿色框向下移动的距离大约为可视区域的 14%，因此距离分数为0.14 。

布局偏移分数是0.5 x 0.14 = 0.07 。

最后一个示例说明了多个不稳定元素的情况：

![demo](https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/FdCETo2dLwGmzw0V5lNT.png?auto=format)

在上面的第一帧中，有四个 API 请求的动物名称结果，按首字母顺序进行了排序。在第二帧中，更多的结果被添加到排序列表中。

列表中第一项（"Cat"）的起始位置没有在两帧之间发生改变，因此是稳定的。同样，添加到列表中的新项目之前不在 DOM 中，因此这些项目的起始位置也没有改变。但"Dog"、"Horse"和"Zebra"这几项的起始位置都发生了改变，因此都是不稳定元素。

同理，红色虚线矩形框代表这三个不稳定元素前后两帧的区域集合，在本示例中，大约占可视区域面积的 38%（影响分数为0.38 ）。

箭头表示不稳定元素相对于起始位置的位移距离。由蓝色箭头表示的"Zebra"元素位移的距离最大，约为可视区域高度的 30%。因此本示例中的距离分数为0.3 。

布局偏移分数是0.38 x 0.3 = 0.1172 。

## 预期布局偏移 vs. 意外布局偏移 

布局偏移并不总是坏事。事实上，许多动态网络应用程序经常更改页面元素的起始位置。

## 由用户发起的布局偏移

布局偏移只有在用户并不期望其发生时才算是坏事。换言之，对用户交互（单击链接、点选按钮、在搜索框中键入信息等）进行响应的布局偏移通常没有问题，前提是偏移发生的时机与交互时机足够接近，使用户对前后关系一目了然。

例如，如果某次用户交互触发了一个网络请求，而该请求可能需要一段时间才能完成，那么最好立即留出一些空间并显示加载指示器，避免在请求完成时出现令用户不快的布局偏移。如果用户没有意识到当前正在加载某些内容，或者不知道资源什么时候能够准备就绪，他们就可能会在等待期间尝试点击其他内容（来打破僵局）。

在用户输入 500 毫秒内发生的布局偏移会带有[hadRecentInput](https://wicg.github.io/layout-instability/#dom-layoutshift-hadrecentinput)标志，便于在计算中排除这些偏移。

> hadRecentInput标志仅适用于不连续输入事件，如轻触、点击或按键操作。滚动、拖动或捏拉缩放手势等连续性交互操作不算作"最近输入"。更多详情请参阅[布局不稳定性规范](https://github.com/WICG/layout-instability#recent-input-exclusion)。

## 动画和过渡

动画和过渡如果做得好，确实是一个在更新页面内容时不让用户感到突兀的好方法。页面内容突然发生意外偏移几乎无一例外会造成糟糕的用户体验。但如果内容从一个位置逐步又自然地移动到下一个位置，这通常有助于用户更好地明白当前状况，并引导他们适应状态之间的变化。

CSS transform属性使您能够在不触发布局偏移的情况下为元素设置动画：

* 用transform: scale()来替代和调整height和width属性。
* 如需使元素能够四处移动，可以用transform: translate()来替代和调整top、right、bottom或left属性。

## 如何测量 CLS

本站CLS使用 GoogleChrome web-vitals 进行测量 [https://github.com/GoogleChrome/web-vitals](https://github.com/GoogleChrome/web-vitals)

## 如何改进 CLS
对于大多数网站来说，您可以通过遵循一些指导原则来避免所有的意外布局偏移：
* **始终在您的图像和视频元素上包含尺寸属性，或者通过使用[CSS 长宽比容器](https://css-tricks.com/aspect-ratio-boxes/)之类的方式预留所需的空间。**这种方法可以确保浏览器能够在加载图像期间在文档中分配正确的空间大小。请注意，您还可以使用[unsized-media 功能策略](https://github.com/w3c/webappsec-permissions-policy/blob/main/policies/unsized-media.md)在支持功能策略的浏览器中强制执行此行为。
* **除非是对用户交互做出响应，否则切勿在现有内容的上方插入内容。**这样能够确保发生的任何布局偏移都在预期之内。
* **首选转换动画，而不是触发布局偏移的属性动画。**动画过渡的目标是提供状态与状态之间的上下文连续性。

如需深入了解如何改进 CLS，请参阅[优化 CLS](https://web.dev/optimize-cls/)和[调试布局偏移](https://web.dev/debug-layout-shifts/)。
