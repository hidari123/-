<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [面试题](#%E9%9D%A2%E8%AF%95%E9%A2%98)
  - [this](#this)
  - [自执行 作用域 预解析](#%E8%87%AA%E6%89%A7%E8%A1%8C-%E4%BD%9C%E7%94%A8%E5%9F%9F-%E9%A2%84%E8%A7%A3%E6%9E%90)
  - [事件循环 等待队列 异步](#%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-%E7%AD%89%E5%BE%85%E9%98%9F%E5%88%97-%E5%BC%82%E6%AD%A5)
  - [作用域 变量提升 参数](#%E4%BD%9C%E7%94%A8%E5%9F%9F-%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87-%E5%8F%82%E6%95%B0)
  - [预解析 作用域](#%E9%A2%84%E8%A7%A3%E6%9E%90-%E4%BD%9C%E7%94%A8%E5%9F%9F)
  - [预解析 作用域 arguments](#%E9%A2%84%E8%A7%A3%E6%9E%90-%E4%BD%9C%E7%94%A8%E5%9F%9F-arguments)
  - [apply call arguments 作用域](#apply-call-arguments-%E4%BD%9C%E7%94%A8%E5%9F%9F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 面试题

## this
```js
// 函数无调用者 => 指针 => window
var a = 10
function test() {
    a = 100
    console.log(a) // 100
    console.log(this.a) // 10
    var a
    console.log(a) // 100
}
test()
```

## 自执行 作用域 预解析
```js
// 非严格模式
(function() {
    var a = b = 3 // 预解析：b = 3; var a = b; 在全局定义了 b = 3
})()
console.log(b) // 3
console.log(a) // a is not defined
```

## 事件循环 等待队列 异步
```js
// js 单线程
for(var i = 1; i <= 3; i++) { // for 循环执行完毕后 => i = 4
    setTimeout(function() {
        console.log(i) // 4 4 4
    }, 0)
}
// 主线程 for -> i(i = 1, i <= 3) => setTimeout => 异步 => 放到等待队列 => i++ (i = 2)
// i = 2, i <= 3 => setTimeout => 异步 => 放到等待队列 => i++ (i = 3)
// i = 3, i <= 3 => setTimeout => 异步 => 放到等待队列 => i++ (i = 4)
// i = 4, i !<= 3 退出循环
// 执行三次 setTimeout => 4 4 4

for(let i = 1; i <= 3; i++) { // for 循环执行完毕后 => i = 4
    setTimeout(function() {
        console.log(i) // 1 2 3
    }, 0)
}
// let 块级作用域 setTimeout 三个独立的块级作用域 之间的 i 不会相互影响
```

## 作用域 变量提升 参数
```js
// 1. 
function fun(n) {
    // var n = undefined; n = n 把外界的 n 赋值给 n
    console.log(n) // 123
    var n = 456
    console.log(n) // 456
}
var n = 123
fun(n)

// 2. 
function fun() {
    console.log(n) // undefined
    var n = 456
    console.log(n) // 456
}
var n = 123
fun(n)

// 3.
function fun() {
    console.log(n) // 123 函数内部没找到，到外面找， n = 123
    n = 456
    console.log(n) // 456
}
var n = 123
fun(n)

// 4.
function fun() {
    console.log(fun) // [funtion: fun]
    fun = 456
    console.log(fun) // 456
}
fun()
var fun = 123
// 函数和 var 都会变量提升，函数优先

// 5.
// var fun = undefined
// function fun = function
var fun = 123
function fun() {
    console.log(fun)
    fun = 456
    console.log(fun)
}
fun() // fun is not a function
// 相当于 =>
function fun() {
    console.log(fun)
    fun = 456
    console.log(fun)
}
var fun = 123
fun() // fun is not a function
```

## 预解析 作用域
```js
var n = 123 // 全局  
function f1() {
    console.log(n)
}
function f2() {
    var n = 456
    f1() // f1() 在 f2() 中执行 f1() 没有调用者 f1() 作用域为 window
}
// f2() 没有调用者 作用域 => window
f2() // 123
console.log(n) //123
```

## 预解析 作用域 arguments
1. arguments => js内置对象，参数类数组，是一个对象，包含默认传入的所有参数
```js
function test() {
    console.log(arguments) // { '0': 1, '1': 2, '2': 3, '3': 'a', '4': 'b', '5': 'c' }
}
test(1, 2, 3,'a', 'b', 'c')
```
2. 
```js
// 1.
var length = 100
function f1() {
    console.log(this.length)
}
var obj = {
    x: 10,
    f2: function(f1) {
        f1() // 无调用者 this === window 100
        arguments[0]() // arguments[0] === f1 无调用者 作用域 arguments对象 2
    }
}
obj.f2(f1, 1)
// 100 2

// 2.
function f() {
    console.log(this.a)
}
var obj = {
    a: 2,
    f: f
}
var f2 = obj.f // f2 => ƒ f() { console.log(this.a) }
var a = 'hello'
f2() // 无调用者 this === window => hello
obj.f() // 由调用者 obj => 2
```

## apply call arguments 作用域
1. apply => 执行一个函数，传入数组，会把数组中的项传入形参中
```js
var obj = {name: 'abc'}
function test(a, b) { // 形参
    console.log(this.name, a, b) // abc 1 2
}
test() // undefined
test.apply(obj, [1,2]) // this => obj, [1,2] => 传参
```
2. call => 和 apply 传参的方式不一样，apply => 数组
```js
// 1. 
var obj = {name: 'abc'}
function test(a, b) { // 形参
    console.log(this.name, a, b) // abc 1 2
}
test() // undefined
test.call(obj, 1, 2) // this => obj, 1, 2 => 传参
```
```js
// 1.
function f(s) {
    console.log(this.a, s) // s => 3 this => obj
    // 2, 3
    return this.a + s
}
var obj = {
    a: 2
}
var f2 = function() { // 无形参接收 arguments接收 [Arguments] { '0': 3 }
    return f.apply(obj, arguments) // arguments 当作参数继续传给下一个 f
}
var b = f2(3)
console.log(b) // 5

// 2.
function f(s) {
    console.log(this.a, s) // s => [Arguments] { '0': 3 }, this => obj
    // 2 [Arguments] { '0': 3 }
    return this.a + s
}
var obj = {
    a: 2
}
var f2 = function() { // 无形参接收 arguments接收 [Arguments] { '0': 3 }
    return f.call(obj, arguments) // arguments 当作参数继续传给下一个 f
}
var b = f2(3)
console.log(b) // 2[object Arguments]

// 3.
function f(s) {
    console.log(this.a, s) // s => 3 this => obj
    // 2, 3
    return this.a + s
}
var obj = {
    a: 2
}
var f2 = function() { // 无形参接收 arguments接收 [Arguments] { '0': 3 }
    return f.call(obj, ...arguments) // ...arguments 把数组展开 当作参数继续传给下一个 f
}
var b = f2(3)
console.log(b) // 5
```