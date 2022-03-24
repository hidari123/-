<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [css](#css)
  - [快速居中对齐](#%E5%BF%AB%E9%80%9F%E5%B1%85%E4%B8%AD%E5%AF%B9%E9%BD%90)
  - [padding 和 margin 有什么不同？](#padding-%E5%92%8C-margin-%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E5%90%8C)
  - [vw和百分比的区别](#vw%E5%92%8C%E7%99%BE%E5%88%86%E6%AF%94%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [行内与块级元素](#%E8%A1%8C%E5%86%85%E4%B8%8E%E5%9D%97%E7%BA%A7%E5%85%83%E7%B4%A0)
  - [如何让谷歌浏览器支持小字体](#%E5%A6%82%E4%BD%95%E8%AE%A9%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E6%94%AF%E6%8C%81%E5%B0%8F%E5%AD%97%E4%BD%93)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# css

## 快速居中对齐
```html
<div class='con'>
    <h1>快速居中对齐</h1>
</div>
<style>
    * {
        margin: 0;
        padding: 0;
    }
    html, body {
        width: 100%;
        height: 100%;
    }
    body {
        /* body 设置 display: flex; */
        display: flex;
    }
    .con {
        width: 500px;
        height: 500px;
        background-color: orange;
        /* div 设置 margin: auto; */
        /* 因为 html 和 body 高是 100% 所以 margin 可以上下也居中 */
        margin: auto;
    }
</style>
```

## padding 和 margin 有什么不同？
1. 作用对象不同
2. `padding`针对自身，`margin`作用于外部对象

## vw和百分比的区别
1. `%`有继承关系，继承父级
2. `vm`只和设备的宽度有关系

## 行内与块级元素
1. 行内元素宽高由内容决定
2. 块级元素独自占一行，宽度有继承关系

## 如何让谷歌浏览器支持小字体
1. 谷歌最小支持12px
2. `transfrom: scale()`缩放
```css
.small-font {
    transform: scale(0.8)
}
```