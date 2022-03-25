<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [javaScript](#javascript)
  - [原型与原型链](#%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE)
  - [节流与防抖](#%E8%8A%82%E6%B5%81%E4%B8%8E%E9%98%B2%E6%8A%96)
    - [区别](#%E5%8C%BA%E5%88%AB)
    - [节流](#%E8%8A%82%E6%B5%81)
    - [防抖](#%E9%98%B2%E6%8A%96)
  - [闭包](#%E9%97%AD%E5%8C%85)
  - [作用域](#%E4%BD%9C%E7%94%A8%E5%9F%9F)
  - [promise](#promise)
  - [深拷贝与浅拷贝](#%E6%B7%B1%E6%8B%B7%E8%B4%9D%E4%B8%8E%E6%B5%85%E6%8B%B7%E8%B4%9D)
  - [发布-订阅模式](#%E5%8F%91%E5%B8%83-%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F)
    - [利用 发布-订阅模式代码解耦](#%E5%88%A9%E7%94%A8-%E5%8F%91%E5%B8%83-%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F%E4%BB%A3%E7%A0%81%E8%A7%A3%E8%80%A6)
  - [call和 aplly 的区别](#call%E5%92%8C-aplly-%E7%9A%84%E5%8C%BA%E5%88%AB)

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
        return args => { // 不用闭包，用一次 timeOut 就没有了 用闭包会永久在内存中
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

## 闭包
1. 闭包是什么？ => 方法里返回一个方法
```js
// 方法里返回一个方法
function a() {
    let a = 1
    return function() {
        return a
    }
}
```
```js
// 在函数外部取不到值
let a = 'hidari' // 全局变量，保存在全局作用域属性的 script 里面
function fn() {
    let b = 1 // 保存在 local 局部作用域
    console.log(a)
}
console.log(b) // b is not defined
fn()
```
```js
// 函数作用域链
let name = '小明'
function fn1() {
    let name = '小白'
    function fn2() {
        let name = '小红'
        console.log(name) // 小红 形成作用域链
    }
    fn2()
}
fn1()
```
2. 闭包存在的意义
    1. 延长变量的生命周期
    ```js
    // 沟通内外部方法的桥梁
    // 闭包会常驻内存 => 慎用闭包
    function outer() {
        let a = 111
        let b = 222
        return function inner() {
            return a
        }
    }

    function fn() {
        let getInnerData = outer()
        console.dir(getInnerData)
        // Closure (outer) a:111
        // 可以看到 a 看不到 b，因为只返回引用了 a
    }
    fn()
    ```
    2. 创建私有环境
        1. `vue`中`data()`为什么是一个函数？ => 闭包
            vue是单页面应用，有很多对应的组件，通过闭包给每个域都建了一个私有域空间，如果不用闭包，用 obj 代替，会导致各个组件中的数据相互干扰
        2. 
        ```js
            let makeCounter =  () => {
            // 私有作用域
            let num = 0
            function changeBy(val) {
                num += val
            }
            // 给你什么你才能拿
            return {
                add: () => {
                    changeBy(1)
                },
                reduce: () => {
                    changeBy(-1)
                },
                value: () => {
                    return num
                }
            }
        }
        // 创建了闭包，内部值私有，都有独立的词法作用域
        // 面向对象 ———— 数据的隐藏和封装
        let counter1 = makeCounter()
        let counter2 = makeCounter()
        counter1.add()
        counter1.add()
        counter2.add()
        console.log(counter1.value()) // 2
        console.log(counter2.value()) // 1
        ```
3. AO，GO，函数作用域
    1. AO步骤：
        1. 创建`AO（Activation Object）`对象，又叫`执行期上下文`；局部变量和方法会存储在`AO`中，全局变量不在`AO`中，用完就会回收，在外部访问不到
        2. 寻找形式参数和变量声明作为`AO`的属性名，并赋值为`undefined`；
        3. 传入实际参数的值；
        4. 在函数体内寻找函数声明，放入作为`AO`的属性，并赋值为其函数体。
    2. GO步骤：
        1. 创建`GO（Global Object）`对象；
        2. 寻找变量声明作为`GO`的属性名，并赋值为`undefined`；
        3. 寻找函数声明，放入作为`GO`的属性，并赋值为其函数体。
    3. 函数作用域[[scope]]：
        `运行期上下文`：当函数执行时，会创建一个名为执行期上下文的内部对象，它定义了一个函数执行时的环境。函数每次执行时其上下文是唯一的，多次调用一个函数会生成多个执行期上下文，当函数调用完，其对应的执行期上下文被销毁。查找变量时则从作用域的顶端开始查找。

## 作用域
1. `var`
    1. 声明提升
    2. 变量覆盖产生不可预知的错误
    3. 没有块级作用域
2. `const`
    1. 不能修改
    2. 声明之后必须赋值
    3. 支持块级作用域
    4. 一般大写
3. `let`
    1. 解构相关
    ```js
    // 交换变量的值
    let a = 1
    let b = 2
    [a, b] = [b, a] // 不引入第三个变量交换 a 和 b 的值
    ```
    ```js
    // 数组去重
    let arr = [12, 43, 23, 12, 43, 55]
    let item = [...new Set(arr)]
    console.log(item) // [12, 43, 23, 55]
    ```

## promise
1. 是否可以用`return`代替`resolve`？
    - 不可以，无法实现链式调用，且不符合规范
2. `Promise`三种状态 => pending(待定) / fulfilled(已解决，已实现) / rejected(已拒绝，没有实现)，三种状态不能发生逆转
- new promise(state: pending) -> 成功 -> resolve(res) -> state: 'fulfilled', result: res
                              -> 失败 -> reject(err)  -> state: 'rejected', result: err
```js
// 构造函数同步执行 1，2
const promise = new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
})
// .then() 异步执行
promise.then(() => {
    console.log(3)
})
console.log(4)
// 1243
```
3. 手写`promise`
```js
// 1. 基本结构
function myPromise(excutor) {
    let self = this
    self.status = 'pending' // 状态
    self.value = null // 成功之后返回数据
    self.reason = null // 失败的原因

    // 7. 解决异步问题 -> 暂存区
    self.onFulfilledCallbacks = []
    self.onRejectedCallbacks = []
    // 返回成功的结果
    function resolve(value) {
        // 5.1
        if(self.status === 'pending') {
            self.value = value // 保存成功结果
            self.status = 'fulfilled'
            // 9. 状态改变 => 依次取出
            self.onFulfilledCallbacks.forEach(item => item(value))
        }
    }

    // 返回失败的原因
    function reject(reason) {
        // 5.2
        if(self.status === 'pending') {
            self.reason = reason // 失败原因
            self.status = 'rejected'
            // 9. 状态改变 => 依次取出
            self.onRejectedCallbacks.forEach(item => item(reason))
        }
    }

    // 4.  excutor -> 立即执行
    // resolve 和 reject 两个函数作为参数传递给 executor（executor 函数在 Promise 构造函数返回所建 promise 实例对象前被调用）
    excutor && excutor(resolve, reject)
}

// 2. =>  .then() 方法写在原型上
// 不管成功或者失败都会进入
myPromise.prototype.then = function(onFulfilled, onRejected) {
    // 6. 确保传进来的是一个方法，如果不是，定义一个方法
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(data) { resolve(data) }
    onRejected = typeof onRejected === 'function' ? onRejected : function(err) { throw err }

    let self = this
    // 8. 暂存回调函数
    // if(self.status === 'pending') {
    //     self.onFulfilledCallbacks.push(onFulfilled)
    //     self.onRejectedCallbacks.push(onRejected)
    // }

    // 链式调用
    // 如果返回的是 promise 继续 .then 
    // 如果不是 通过 resolve 返回值
    if(self.status === 'fulfilled') {
        return new myPromise((resolve, reject) => {
            try {
                let x = onFulfilled(self.status)
                x instanceof myPromise ? x.then(resolve, reject) : resolve(x)
            } catch(err) {
                reject(err)
            }
        })
    }

    if(self.status === 'rejected') {
        return new myPromise((resolve, reject) => {
            try {
                let x = onRejected(self.reason)
                x instanceof myPromise ? x.then(resolve, reject) : resolve(x)
            } catch(err) {
                reject(err)
            }
        })
    }

    // 8. 暂存回调函数
    if(self.status === 'pending') {
        return new myPromise((resolve, reject) => {
            self.onFulfilledCallbacks.push(() => {
                let x = onFulfilled(self.value)
                x instanceof myPromise ? x.then(resolve, reject) : resolve(x)
            })
            self.onRejectedCallbacks.push(() => {
                let x = onRejected(self.reason)
                x instanceof myPromise ? x.then(resolve, reject) : resolve(x)
            })
        })
    }
}

// .catch()
myPromise.prototype.catch = function(fn) {
    return this.then(null, fn)
}

// 3. 初级调用
let demo = new myPromise((resolve, reject) => {
    console.log(111)
    setTimeout(() => {
        // console.log(222)
        resolve(222)
    }, 2000)
})
console.log(demo)
demo.then(data => console.log(data))
```


## 深拷贝与浅拷贝
1. 基本数据类型赋值 => 硬要说是什么拷贝，是深拷贝 => 开辟两个空间，互不影响
```js
// 基本数据类型
// 赋值 => 硬要说是什么拷贝 是深拷贝 开辟两个空间 互不影响
let a = 5
let b = a
b = 3
console.log(a, b) // 5 3
```
2. 数组和对象的赋值都叫做浅拷贝
```js
// 引用数据类型
// 数组和对象的赋值都叫做浅拷贝
let arr = [1, 2, 3]
let newArr = arr
newArr.push(4)
console.log(arr, newArr) // [1,2,3,4] [1,2,3,4]
```
3. 解构赋值 => 针对一维数组和对象可以看作是深拷贝，多维的是浅拷贝
```js
// 解构赋值
// 针对一维数组和对象可以看作是深拷贝，多维的是浅拷贝
let arr = [1, 2, 3]
let newArr = [...arr]
newArr.push(4)
console.log(arr, newArr) // [1,2,3] [1,2,3,4]

let arr2 = [[1, 2, 3], [4, 5, 6]]
let newArr = [...arr2]
newArr[0].push(888)
console.log(arr2, newArr) // [Array[4], Arr[3]] [Array[4], Arr[3]]
```
4. 深拷贝用法
    1. JSON.parse(JSON.stringify()) => 转换成字符串再转换回来 => 解决 80% （function不能转换）
    ```js
    let list = [
        {id: 1, stuName: 'hidari', class: '5'},
        {id: 2, stuName: 'migi', class: '2'},
        {id: 3, stuName: 'timo', class: '3'},
    ]
    let newList = JSON.parse(JSON.stringify(list))
    newList.push({id: 4, stuName: 'timi', class: '4'})
    console.log(list, newList)
    ```
    2. 标准的深拷贝 => 引用数据类型（数组，对象）
    ```js
    let obj = {
        ff: 'name',
        gg: 1,
        obj: { str: '111', age: 12},
        fun: () => {
            console.log(123)
        },
        arr: [1,2,3,4]
    }
    // 应用代码，容错代码，提示代码
    function deepClone(source) {
        // [] => Array(基类)
        // {} => Object(基类)
        const targetObj = source.constructor === Array ? [] : {} // constructor 构造器
        for(let keys in source) {
            if(source.hasOwnProperty(keys)) {
                // keys => 基础数据类型 / 对象 / 数组
                // 引用数据类型
                if(source[keys] && typeof source[keys] === 'object') {
                    targetObj[keys] = source[keys].constructor === Array ? [] : {} // 可以不要，因为后面会赋值
                    targetObj[keys] = deepClone(source[keys]) // 递归
                } else {
                    // 基本数据类型 => 直接赋值
                    targetObj[keys] = source[keys]
                }
            }
        }
        return targetObj
    }
    let newObj = deepClone(obj)
    newObj.ff = 'migi'
    newObj.arr.push('123')
    newObj.fun = () => {
        console.log('abc')
    }
    console.log(obj, newObj)
    ```

## 发布-订阅模式

### 利用 发布-订阅模式代码解耦
```js
// 在对象的方法中不建议使用箭头函数

// 变成闭包，需要什么自己拿，避免资源浪费
let Event = (function() { // 匿名自执行函数
    // 花名册 [] => {}
    // [] => 把 key 当作下标 取值 => 深拷贝
    // {} => 浅拷贝
    // 深拷贝耗费性能 不需要深拷贝 所以改成浅拷贝
    let list = {},
        listen,
        trigger,
        remove;

        // 添加订阅者
        listen = function(key, fn) {
            // if(!this.list[key]) {
            //     this.list[key] = []
            // }
            // this.list[key].push(fn)

            // 短路表达式
            (list[key] || (list[key] = [])).push(fn) // 判断有没有 key 没有就会定义一个key
        },

        // 发布
        trigger= function() {
            // 类数组转数组
            let key = Array.prototype.shift.call(arguments),
                fns = list[key] // 取出该消息对应回调函数
            if(!fns || fns.length === 0) return false
            for(let i = 0, fn; fn = fns[i++];) {
                fn.apply(this, arguments) // 发布消息时的参数
            }
        },

        remove = function(key, fn) {
            let fns = list[key]
            if(!fns) return false
            if(!fn) {
                fns && (fns.length === 0)
            } else {
                for(let i = fns.length -1; i >= 0; i--) {
                    let _fn = fns[i]
                    _fn === fn && (fn.splice(i, 1))
                }
            }
        }

        return {
            listen: listen,
            trigger: trigger,
            remove: remove
        }
})();

// 不需要通过中介，直接可以存取数据
Event.listen('big', function(size) {
    console.log(`migi: ${size} m^2`)
})
Event.trigger('big', 150)
```
```js
// 未精简版
// 抽离出 event对象 还需要定义不同的业务进行赋能
let event = {
    list: {}, // 花名册 [] => {}
    // [] => 把 key 当作下标 取值 => 深拷贝
    // {} => 浅拷贝
    // 深拷贝耗费性能 不需要深拷贝 所以改成浅拷贝

    // 添加订阅者
    listen: function(key, fn) {
        // if(!this.list[key]) {
        //     this.list[key] = []
        // }
        // this.list[key].push(fn)

        // 短路表达式
        (this.list[key] || (this.list[key] = [])).push(fn) // 判断有没有 key 没有就会定义一个key
    },

    // 发布
    trigger: function() {
        // 类数组转数组
        let key = Array.prototype.shift.call(arguments),
            fns = this.list[key] // 取出该消息对应回调函数
        if(!fns || fns.length === 0) return false
        for(let i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments) // 发布消息时的参数
        }
    }
}

// 初始化 业务赋能
let initEvent = function(obj) {
    for(let i in event) {
        obj[i] = event[i]
    }
}
let houseObj = {} // 发布者 售楼处
initEvent(houseObj)
houseObj.listen('small', (size) => {
    console.log(`hidari: ${size} m^2`)
})

houseObj.listen('big', (size) => {
    console.log(`migi: ${size} m^2`)
})

houseObj.trigger('small', 100)
houseObj.trigger('big', 50)
console.log(houseObj.list)
```


## dom 库
### 匿名自执行函数
```js
// jquery.js
(function(window) {
    // 获取东西
    window.$ = jquery = function(nodeSelector) {
        // 存放东西 node节点
        let nodes = {}
        if(typeof nodeSelector === 'string') {
            // querySelectorAll 返回一个数组
            let temp = document.querySelectorAll(nodeSelector)
            for (let i = 0; i < temp.length; i++) {
                nodes[i] = temp[i]
            }
            // nodes => 类数组 => 强行加上 length 属性
            nodes.length = temp.length
        } else {
            throw new Error('必须输入字符串')
        }

        // 添加方法
        nodes.addClass = function(classes) {
            let className = classes.split(' ')
            // 循环 class
            className.forEach(value => {
                // 循环节点
                for(let i = 0; i < nodes.length; i++) {
                    // .classList.add() js原生
                    nodes[i].classList.add(value)
                }
            })
        }

        // 修改 text
        nodes.setText = function(text) {
            for(let i = 0; i < nodes.length; i++) {
                nodes[i].textContent = text
            }
        }
        return nodes
    }
})(window)
```
1. 自执行 => 单例模式
2. 防止变量污染