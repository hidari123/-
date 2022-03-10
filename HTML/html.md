# HTML文档

## 什么是HTML 5？

HTML 5是HTML的新标准，其主要目标是无需任何额外的插件如Flash、Silverlight等，就可以传输所有内容。它囊括了动画、视频、丰富的图形用户界面等。
```html
<!DOCTYPE HTML>
```

## HTML 5元素

<header>：表现HTML的标题数据。
<footer>：页面的页脚部分。
<nav>：页面中的导航元素。
<article>：正文内容。
<section>：用在正文中定义section或区段内容。
<aside>：表现页面侧边栏内容。

## HTML 5中的DataList是什么？

HTML 5中的DataList控件元素有助于提供自动完成功能的文本框
下面是DataList控件功能的HTML代码：
```html
<input list="Country">
<datalist id="Country">
    <option value="India">
    <option value="Italy">
    <option value="Iran">
    <option value="Israel">
    <option value="Indonesia">
</datalist> 
```

## HTML 5中不同的新表单元素类型是什么？
1. Color
```html
<!-- 拾色器 -->
<input type="color" name="favcolor"> 
```
2. Date
```html
<!-- 日历对话框 -->
<input type="date" name="bday"> 
```
3. Datetime-local
```html
<!-- 本地时间显示日历 -->
<input type="datetime-local" name="bdaytime"> 
```
4. Email
```html
<!-- 电子邮件验证创建一个HTML文本 -->
<input type="email" name="email"> 
```
5. Time
```html
<!-- 只需要输入时间 -->
<input type="time" name="usr_time"> 
```
6. Url
```html
<!-- 对于URL验证设置类型为“url” -->
<input type="url" name="sitename"> 
```
7. Range
```html
<!-- 显示范围调整控件 -->
<input type="range" min="0" max="10" step="2" value="6"> 
```
8. Telephone
```html
<!-- 想要文本框接受电话号码 -->
<input type="tel" name="mytel"> 
```
9. Number
```html
<!-- 文本框显示号码范围 -->
<input type="number" name="quantity" min="1" max="5"> 
```
10. Search
```html
<!-- 让文本框作为搜索引擎框 -->
<input type="search" name="googleengine"> 
```

## HTML 5中的输出元素是什么？
计算两个输入的结果并将结果放到一个标签里
```html
<form action="L3_01.html" method="get" oninput="num.value=parseInt(num1.value)+parseInt(num2.value)">
    <input type="number" id="num1"> +
    <input type="number" id="num2"> = 
    <output name="num" for="num1 num2"></output>
</form>
```

## SVG是什么？
可缩放矢量图形, 基于文本的图形语言, 它可以绘制使用文本、线、点等的图形，因此可以轻巧又快速地渲染。
### SVG 优势
1. SVG 图像可通过文本编辑器来创建和修改；
2. SVG 图像可被搜索、索引、脚本化或压缩；
3. SVG 是可伸缩的；
4. SVG 图像可在任何的分辨率下被高质量地打印；
5. SVG 可在图像质量不下降的情况下被放大；
#### 使用SVG绘制圆形
1. `<svg>`标签中 `height` 和 `width` 属性是设置 SVG 文档的高宽， `version` 属性可定义所使用的 SVG 版本，`xmlns` 属性可定义 SVG 命名空间；
2. `<circle>`是 SVG 中用来创建圆形的标签，`cx` 和 `cy` 属性定义圆中心的 `x` 和 `y` 坐标，如果忽略这两个属性，那么圆点会被设置为 `(0, 0)`，`r`属性定义圆的半径；
3. `stroke` 和 `stroke-width` 属性控制如何显示形状的轮廓，`fill` 属性设置形状内的颜色；
```html
<svg xmlns="http://www.w3.org/2000/svg" height="500px" width="500px" version="1.1">
    <circle cx="200" cy="100" r="100" stroke="#afeedd" stroke-width="5" fill="#f0ddff" />
</svg>
```
#### 使用SVG绘制矩形
1. `rect` 元素的 `width` 和 `height`属性可定义矩形的高度和宽度；
2. `style` 属性用来定义 `CSS` 属性
3. CSS 的 `fill` 属性定义矩形的填充颜色（`rgb` 值、颜色名或者十六进制值）；
4. CSS 的 `stroke-width` 属性定义矩形边框的宽度；
5. CSS 的 `stroke` 属性定义矩形边框的颜色；
6. 属性定义矩形的左侧位置，`y` 属性定义矩形的顶端位置
7. CSS 的 `fill-opacity` 属性定义填充颜色透明度，取值为`0-1`；
8. CSS 的 `stroke-opacity` 属性定义轮廓颜色的透明度，取值为`0-1`；
```html
    <svg xmlns="http://www.w3.org/2000/svg" width="500px" height="500px" version="1.1">
      <rect x="50" y="100" width="300" height="150"
      style="fill:rgb(145,245,255);stroke-width:5;stroke:#EE799F;fill-opacity:0.9;stroke-opacity:0.9;"/>
    </svg>
```
#### 使用SVG绘制多边形
1. `<polygon>` 标签用来创建含有不少于三个边的图形，也就是多边形，多边形是由直线组成，其形状是"封闭"的；
2. `points` 属性定义多边形每个角的 `x` 和 `y` 坐标，`x`和`y`之间用逗号隔开，坐标与坐标之间用空格隔开；
3. `fill-rule`属性用于指定使用哪一种算法去判断画布上的某区域是否属于该图形“内部”，它有三个有效值`nonzero`（非零） 、`evenodd`（奇偶）、`inherit`，默认为`nonzero`；
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="500px" height="500px">
    <polygon points="100,10 40,180 190,60 10,60 160,180" style="fill:#B4EEB4;stroke:#DB7093   ;stroke-width:3;fill-rule:nonzero;"/>
</svg>
```
#### SVG模糊效果
1. `<filter>`元素`id`属性定义一个滤镜的唯一名称；
2. `<feGaussianBlur>`元素定义模糊效果；
3. `in="SourceGraphic"`这个部分定义了由整个图像创建效果；
4. `stdDeviation`属性定义模糊量；
5. `<rect>`元素的滤镜属性用来把元素链接到"f1"滤镜，这里是一个矩形；
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
        <filter id="keai" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
    </defs>
    <rect width="150" height="100" stroke="red" stroke-width="5" fill="#7EC0EE" filter="url(#keai)" />
</svg>
```
#### SVG 阴影
1. `<defs>`元素定义短并含有特殊元素（如滤镜）定义；
2. `<filter>`标签用来定义SVG滤镜，`<filter>`标签使用必需的`id`属性来定义向图形应用哪个滤镜；
3. `<feOffset>`元素是用于创建阴影效果；
4. `<feColorMatrix>`过滤器是用来转换偏移的图像使之更接近黑色的颜色；
5. `<feGaussianBlur>`元素的`stdDeviation`属性定义了模糊量；
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="500px" height="500px">
    <defs>
        <filter id="myImg" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="10" dy="10" />
            <feColorMatrix result = "matrixOut" in = "offOut" type = "matrix" values = "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"/>
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
    </defs>
    <rect width="200" height="200" stroke="#90EE90" stroke-width="5" fill="#FFEFDB" filter="url(#myImg)" />
</svg>
```
#### SVG渐变
1. 渐变是一种从一种颜色到另一种颜色的平滑过渡。另外，可以把多个颜色的过渡应用到同一个元素上；
2. `<linearGradient>`元素用于定义线性渐变，`<linearGradient>`标签必须嵌套在`<defs>`的内部；
3. `<linearGradient>`标签的`id`属性可为渐变定义一个唯一的名称；
4. `<linearGradient`>标签的`X1`，`X2`，`Y1`，`Y2`属性定义渐变开始和结束位置；
5. 渐变的颜色范围可由两种或多种颜色组成，每种颜色通过一个`<stop>`标签来规定，`offset`属性用来定义渐变的开始和结束位置；
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="500px" height="500px">
    <defs>
        <linearGradient id="yuan" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgb(238,210,238);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgb(255,250,205);stop-opacity:1" />
        </linearGradient>
    </defs>
    <ellipse cx="200" cy="200" rx="150" ry="80" fill="url(#yuan)" />
</svg>
```

## HTML 5中的Canvas画布是什么？
画布是一个可以在其上绘制图形的HTML区域
```html
<canvas id="tutorial" width="150" height="150"></canvas>
 <!-- </canvas> 标签不可省 -->
```
#### 渲染上下文
1. `<canvas>` 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。我们将会将注意力放在`2D`渲染上下文中。其他种类的上下文也许提供了不同种类的渲染方式；比如， `WebGL` 使用了基于`OpenGL ES`的`3D`上下文 `("experimental-webgl")` 。

2. `canvas`起初是空白的。为了展示，首先脚本需要找到`渲染上下文`，然后在它的上面绘制。`<canvas>` 元素有一个叫做 `getContext()` 的方法，这个方法是用来获得渲染上下文和它的绘画功能。`getContext()`接受一个参数，即`上下文的类型`。对于2D图像而言，可以使用 `CanvasRenderingContext2D`。
```js
var canvas = document.getElementById('tutorial'); // 获得 DOM 对象
var ctx = canvas.getContext('2d'); // 访问绘画上下文

var canvas = document.getElementById('tutorial');
if (canvas.getContext){
  var ctx = canvas.getContext('2d');
} else {
    // 在不支持 <canvas> 标签的浏览器中展示
}
```
#### 模板骨架
```html
<!-- 当页面加载结束的时候就会执行 draw() 函数 -->
<html>
  <head>
    <title>Canvas tutorial</title>
    <script type="text/javascript">
      function draw(){
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
          var ctx = canvas.getContext('2d');
        }
      }
    </script>
    <style type="text/css">
      canvas { border: 1px solid black; }
    </style>
  </head>
  <body onload="draw();">
    <canvas id="tutorial" width="150" height="150"></canvas>
  </body>
</html>
```
#### 文档参考
https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial


### MDN 网址
https://developer.mozilla.org/zh-CN/docs/Web/Tutorials