<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [javaScript](#javascript)
  - [原型与原型链](#%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE)
  - [节流与防抖](#%E8%8A%82%E6%B5%81%E4%B8%8E%E9%98%B2%E6%8A%96)
    - [区别](#%E5%8C%BA%E5%88%AB)
    - [节流](#%E8%8A%82%E6%B5%81)
    - [防抖](#%E9%98%B2%E6%8A%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# javaScript

## 原型与原型链
1. 原型 `prototype` -> 函数特有
2. 原型链 `__proto__` -> `[[prototype]]`  -> 原型链都有
```js
// 原型链，原型，继承 三者间的关系
function Person() {

}
Person.prototype.name = 'hidari'
Person.prototype.age = 18
Person.prototype.getAge = function () {
    console.log(this.age)
}
// 实例
let person = new Person() // 当通过某个函数构造东西的时候才叫构造函数，通过 new 关键字继承了原型的属性和方法
console.log(person.name) // hidari

person.age = 28
person.getAge() // 28 复写，就近原则，在原型链上离得近
console.log(person.demo) // undefined
person.abc() // abc is not a function

// 从当前实例属性查找 => 找到了返回 => 找不到顺着原型链一层一层往上找
// 直到找到 null 为止 => 找到 null 也没有找到，报错
// 属性 => undefined
// 方法 => is not a function

// person 是 Person 构造的，person 的 __proto__ 指向 Person() 的原型 prototype
// Person 是 Object 构造的，Person  的 __protp__ 指向 Object() 的原型 prototype
// Object 的原型 prototype 的 __proto__ 指向 null
person.demo = 'demo'
let item
for (item in person) {
     // hasOwnProperty 返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）
    if(person.hasOwnProperty(item)) {
        console.log(item) // age demo
    }
}
```

## 节流与防抖
### 区别
1. 节流：单位时间内只执行第一次
2. 防抖：单位时间内执行最后一次
### 节流
1. 保证一定时间内只调用一次函数
2. 应用场景：提交表单，高频监听事件
```html
<div class="box"></div>
<script>
    let box = document.querySelector('.box')
    box.addEventListener('touchmove', throttle(demo, 2000))

    // 封装节流
    function throttle(event, time) {
        let timer = null
        return () => {
            if (!timer) {
                timer = setTimeout(() => {
                    event()
                    timer = null
                }, time)
            }
        }
    }
    
    function demo() {
        console.log('发起请求')
    }
</script>
<style>
    .box {
        background-color: green;
        width: 200px;
        height: 200px;
    }
</style>
```
```html
<!-- 通过时间戳 -->
<input type="text" placeholder="请输入电话" />
<input type="submit" id="input">
<script>
    let telInput = document.querySelector('#input')
    telInput.addEventListener('click', throttle(submit, 2000))

    function submit(e) {
        console.log('发起请求')
    }

    // 封装节流
    function throttle(fn, delay) {
        let begin = 0
        return () => {
            let cur = new Date().getTime() // 获取毫秒时间戳
            if(cur - begin > delay){
                fn(arguments)
                begin = cur
            }
        }
    }
</script>
```
### 防抖
1. 通过 setTimeout 的方式 在一定时间间隔内 将多次触发变成一次触发
2. 如果前面有东西就把前面的销毁掉
```html
<input type="text" placeholder="请输入电话" />
<input type="submit" id="input">
<script>
    let telInput = document.querySelector('#input')
    //  addEventListener 绑定的时候调用了一次
    // 作为参数 submit 是一个函数 debounce(submit) 执行一个函数 绑定参数的时候默认执行了函数
    telInput.addEventListener('click', debounce(submit, 2000, true))
    // telInput.addEventListener('click', submit)


    // 防抖封装
    function debounce(fn, wait, trigglenow) {
        // 如果直接写 fn() 不 return 会同步执行 页面刷新后会先执行一次
        // 需要调用的时候返回函数
        // 只要 计时器存在 就清除掉 重新开始计时
        let timeOut = null
        return args => {
            // console.log(args)
            if(timeOut) clearTimeout(timeOut) // 如果赛道里面有车，先把车清除掉
            // timeout = setTimeout(() => {}, timeOut) // 方法会传进来，简写
            // 如果赛道里面没有车，创建一个定时器
            
            if (trigglenow) {
                // 第一次点击 直接执行
                let firstClick = !timeOut
                // console.log(timeOut, firstClick)
                if(firstClick) fn(args)
                    timeOut = setTimeout(() => {
                    timeOut = null
                }, wait)
            } else {
                // timeOut = setTimeout(fn, wait)
                timeOut = setTimeout(() => {
                    fn(args)
                }, wait)
            }
        }
    }

    function submit(e) {
        // console.log(this) // 没有包装之前 -> button 包装后 箭头函数 -> window
        // console.log(e)
        console.log('发起请求')
    }
</script>
```