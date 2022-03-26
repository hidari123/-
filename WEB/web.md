<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [性能优化](#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
  - [浏览器中输入 url 的一瞬间浏览器做了什么](#%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E8%BE%93%E5%85%A5-url-%E7%9A%84%E4%B8%80%E7%9E%AC%E9%97%B4%E6%B5%8F%E8%A7%88%E5%99%A8%E5%81%9A%E4%BA%86%E4%BB%80%E4%B9%88)
  - [页面渲染流程](#%E9%A1%B5%E9%9D%A2%E6%B8%B2%E6%9F%93%E6%B5%81%E7%A8%8B)
  - [从哪些点做性能优化？](#%E4%BB%8E%E5%93%AA%E4%BA%9B%E7%82%B9%E5%81%9A%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
  - [懒加载原理](#%E6%87%92%E5%8A%A0%E8%BD%BD%E5%8E%9F%E7%90%86)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 性能优化

## 浏览器中输入 url 的一瞬间浏览器做了什么
url => 统一资源定位符，俗称网址，IP的映射
1. https: 传输协议（http和TCP之间加了一层 TSL 或者 SSL 的安全层）
2. www：服务器
![avatar](https://upload-images.jianshu.io/upload_images/20125515-5f447230024c0576.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)
3. 第一次访问 => DNS 域名系统
    1. 解析url => DNS域名系统匹配真实IP => 拿到真实IP => 建立连接（TCP三次握手） => 拿数据，渲染页面 => 四次挥手（数据不是持续连接）
    2. ping ip （测试连接）
    3. TCP 三次握手
        1. 客户端向服务端发送请求，等待服务端确认
        2. 服务端收到请求，进行确认，并且回复一个指令
        3. 客户端收到服务端回复指令，并且返回确认
        4. 服务端发送请求数据
4. 第二次访问：将域名解析的 IP存在本地 => 读取浏览器缓存
https://www.jianshu.com/p/7659d714a642

## 页面渲染流程
![avatar](https://upload-images.jianshu.io/upload_images/20125515-3636336e39d0ee9e.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)
       display: none   
          |
html -> dom树 ->
                    render tree -> 计算布局信息  -> ui 引擎渲染 -> 用户所见页面
css -> css结构体 -> 
       并行构建                        回流              重绘

## 从哪些点做性能优化？
1. 加载
    1. 减少 HTTP 请求（精灵图，文件合并）
    2. 减小文件大小（资源压缩，图片 / 视频 / 代码压缩（工具））
    3. CDN（第三方库，大文件，大图）
    4. SSR服务端渲染，预渲染
    5. 懒加载
    6. 分包，加快主页加载（小程序）
2. 性能
    1. 减少 dom 操作，避免回流，文档碎片
3. 性能优化四个方面
    1. 页面加载性能：加载时间，用户体验
    2. 动画与操作性能：是否流畅无卡顿
     - 为什么提倡使用 translate、定位 脱离正常文档流 避免重新渲染 dom
    3. 内存占用：内存占用过大，浏览器崩掉
    4. 电量消耗：游戏方面，暂不考虑
4. 性能体系
 - 现状评估，建立指核 -> 技术方案 -> 执行 -> 结果分析
5. 技术方案划分
    1. 缓存：客户端控制的强缓存策略
    2. 降低请求成本：
        1. HTTP DNS：客户端控制，随一段时间主动请求 DNS 获取域名 IP 不走系统的 DNS
        2. TCP/TLS 连接复用：有服务端升级到HTTP2 尽量合并域名
    3. 减少请求数
        1. JavaScript CSS 打包到 HTML
        2. 用JavaScript控制图片异步加载和懒加载
        3. 小型图片使用 data-url
    4. 减少传输体积：
        1. 尽量使用 SVG/gradient等代替图片
        2. 根据机型和网络状况控制图片清晰度
        3. 对比清晰度图片使用锐化来提升体验
        4. 设计上避免大型背景图

## 懒加载原理
1. `data-src`: 真实的url，`src`：不需要的时候的loader图片，初始时将真实的url以属性的方式存在上面
```html
<img src='./loader.gif' data-src='./img.jpg' alt=''>
```
```js
let num = document.getElementsByTagName('img').length // 获取图片数量
let img = document.getElementsByTagName('img') // 所有标签
let n = 0
lazyload()
// 赋值
window.onscroll = lazyload
function lazyload() {
    let seeHeight = document.documentElement.clientHeight // 可见区域
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动条滚动的距离 初始值为0

    for(let i = n; i < num; i++) {
        if(img[i].offsetTop < seeHeight + scrollTop) {
            if(img[i].getAttribute('src') === './loader.gif') {
                img[i].src = img[i].getAttribute('data-src')
            }
            // 为了防止之前加载过的图片重复加载
            n = i + 1
        }
    }
}
```