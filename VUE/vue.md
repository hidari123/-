<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [vue](#vue)
  - [MVC && MVVM](#mvc--mvvm)
  - [v-model 原理](#v-model-%E5%8E%9F%E7%90%86)
  - [v-if 和 v-show](#v-if-%E5%92%8C-v-show)
  - [虚拟dom](#%E8%99%9A%E6%8B%9Fdom)
  - [diff中的patch()](#diff%E4%B8%AD%E7%9A%84patch)
  - [对 vue 渐进式框架的理解](#%E5%AF%B9-vue-%E6%B8%90%E8%BF%9B%E5%BC%8F%E6%A1%86%E6%9E%B6%E7%9A%84%E7%90%86%E8%A7%A3)
  - [vue 双向绑定的原理](#vue-%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E7%9A%84%E5%8E%9F%E7%90%86)
  - [vue1.x 设计理念是什么？](#vue1x-%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5%E6%98%AF%E4%BB%80%E4%B9%88)
  - [key的作用是什么？可以用数据的 index 代替么？](#key%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88%E5%8F%AF%E4%BB%A5%E7%94%A8%E6%95%B0%E6%8D%AE%E7%9A%84-index-%E4%BB%A3%E6%9B%BF%E4%B9%88)
  - [vue组件中data为什么必须是函数？](#vue%E7%BB%84%E4%BB%B6%E4%B8%ADdata%E4%B8%BA%E4%BB%80%E4%B9%88%E5%BF%85%E9%A1%BB%E6%98%AF%E5%87%BD%E6%95%B0)
  - [vue3.0](#vue30)
    - [为什么要用 Proxy API 代替 defineProperty API？](#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E7%94%A8-proxy-api-%E4%BB%A3%E6%9B%BF-defineproperty-api)
    - [响应式是惰性的](#%E5%93%8D%E5%BA%94%E5%BC%8F%E6%98%AF%E6%83%B0%E6%80%A7%E7%9A%84)
    - [编译优化](#%E7%BC%96%E8%AF%91%E4%BC%98%E5%8C%96)
  - [render()](#render)
  - [router.js 动态引入](#routerjs-%E5%8A%A8%E6%80%81%E5%BC%95%E5%85%A5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# vue

## MVC && MVVM
1. MVC
    1. 前后端无法独立开发
    2. 前端不够独立，没有自己的数据中心
2. MVVM
    data() => VM 链接视图，前端有自己的数据控制器，不需要频繁的把数据发给后端保存

## v-model 原理
```html
<!-- 双向数据绑定 -->
<!--    username 是一个 id -->
<input type="text" placeholder="请输入名字" id="username">
<span>显示值：</span><p id="uName"></p>
<script>
    let obj = {}
    // vue2中 操作/劫持对象
    Object.defineProperty(obj, 'username', { // username 是一个属性 和上面的 username 无关
        get: () => {
            console.log('取值')
        },
        set: (val) => {
            console.log('设置')
            document.getElementById('uName').innerHTML = val
        }
    })
    document.getElementById('username').addEventListener('keyup', () => {
        // 事件都有内置的 event 对象
        obj.username = event.target.value
    })
</script>
```

## v-if 和 v-show
1. `v-if`不满足条件不会渲染`dom` => 单次判断
2. `v-show`隐藏`dom` => 多次切换（不能用于权限操作）

## 虚拟dom
1. `虚拟dom`是什么？
    1. `vue2.x`才开始有`虚拟dom`
    2. 本质：js对象 => 跨平台
    3. 将`真实dom`的数据抽取出来，以对象的形式模拟树形结构。
2. `虚拟dom`在`vue`中做了什么？
    1. `vue`渲染过程（html，css，js）
    2. 将`真实dom`转化为`虚拟dom`（js对象）=>更新的时候做对比
3. `虚拟dom`是如何提升`vue`渲染效率的？
    1. `vue`两大核心：组件化、数据驱动（虚拟dom）
    2. 局部更新（节点数据）
    3. 将直接操作`dom`的地方拿到两个js对象之中作比较
4. 当数据发生变化时，`vue`是怎么更新节点的？
    1. 我们先根据`真实dom`生成一棵`虚拟dom`，当`虚拟dom`某个节点的数据改变后会生成一个新的`Vnode`，然后`Vnode`和`oldVnode`作对比，发现有不一样的地方就直接修改在`真实dom`上，然后使`oldVnode`的值为`Vnode`。
    2. `diff`的过程就是调用名为`patch`的函数，比较新旧节点，一边比较一边给`真实dom`打补丁。

## diff中的patch()
1. diff的比较方式
    采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。
    ![avatar](https://images2018.cnblogs.com/blog/998023/201805/998023-20180519212338609-1617459354.png)
2. diff流程图
    当数据发生改变时，`set`方法会让调用`Dep.notify`通知所有订阅者`Watcher`，订阅者就会调用`patch`给`真实dom`打补丁，更新相应的视图。
    ![avatar](https://images2018.cnblogs.com/blog/998023/201805/998023-20180519212357826-1474719173.png)
1. 初始化 patch(container, vnode)
```js
// 虚拟dom 三个要素
// 1. 目标元素 target
// 2. 目标元素上的属性
// 3. 目标元素的子节点
function createElement(vnode) {
    let tag = vnode.tag // 目标元素
    let attrs = vnode.attrs || {} // 属性
    let children = vnode.children || [] // 子节点
    if(!tag) return null
    // 创建对应 dom
    let ele = document.createElement(tag)
    let attr
    // 给 dom 添加属性
    for (attr in attrs) {
        if(attrs.hasOwnProperty(attr)) {
            // 拿到 attr 属性名和 attrs[attr] 值
            ele.setAttribute(attr, attrs[attr]) // setAttribute 设置属性
        }
    }
    // 将子元素添加到目标上
    children.forEach((childVnode) => {
        ele.appendChild(createElement(childVnode)) // 递归添加子元素
    })
    return ele
}
```
2. 更新 update()
```js
function updateChildren(vnode, newVnode) {
    let children = vnode.children || [] // 现有节点
    let newChildren = newVnode.children || [] // 新节点
    children.forEach((childrenVnode, index) => {
        // 循环的每一项
        let newChildrenVnode = newChildren[index]
        if(childrenVnode.tag === newChildrenVnode.tag) {
            // 深层次对比 => 递归
            updateChildren(childrenVnode, newChildrenVnode)
        } else {
            // 两个 tag 不一样
            replaceNode(childrenVnode, newChildrenVnode)
        }
    })
}
```

## 对 vue 渐进式框架的理解
1. 渐进式的含义： 主张最少，没有多做职责之外的事
2. Vue 是渐进的，没有强主张，可以在原有系统上面，把一两个组件改用VUE实现，当作jQuery用
3. 也可以用vue全家桶开发，当Angular用，还可以用vue的视图，搭配设计的下层使用
4. 可以在底层数据逻辑的地方用OO和设计模式的理念，也可以函数式，vue是轻量视图

## vue 双向绑定的原理
1. 数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式实现的
2. 具体实现原理：
    1. 实现一个监听器 Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者
    2. 实现一个订阅者 Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图
    3. 实现一个解析器 Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器
3. vue实例化一个对象的具体过程
    1. 新创建一个实例后，Vue调用compile将el转换成vnode。
    2. 调用initState, 创建props, data的钩子以及其对象成员的Observer（添加getter和setter）。
    3. 执行mount挂载操作，在挂载时建立一个直接对应render的Watcher，并且编译模板生成render函数，执行vm._update来更新DOM。
    4. 每当有数据改变，都将通知相应的Watcher执行回调函数，更新视图。
        1. 当给这个对象的某个属性赋值时，就会触发set方法。
        2. set函数调用，触发Dep的notify()向对应的Watcher通知变化。
        3. Watcher调用update方法。
    ![avatar](https://segmentfault.com/img/bVbf9u7/view?w=909&h=422)
    在这个过程中：
    1. Observer是用来给数据添加Dep依赖。
    2. Dep是data每个对象包括子对象都拥有一个该对象, 当所绑定的数据有变更时, 通过dep.notify()通知Watcher。
    3. Compile是HTML指令解析器，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。
    4. Watcher是连接Observer和Compile的桥梁，Compile解析指令时会创建一个对应的Watcher并绑定update方法 , 添加到Dep对象上。
    ![avatar](https://segmentfault.com/img/bVbf9Ov?w=764&h=306)
4. 代码
https://segmentfault.com/a/1190000016208088

## vue1.x 设计理念是什么？
1. 早期 vue 采用数据绑定、依赖收集的方式观察数据变化并保留对实际DOM元素的引用，当有数据变化时进行对应操作
 - 少数数据更新对比虚拟DOM性能更好，坏处是大量数据更新，初始渲染性能，对比虚拟DOM性能更差
2. vue2.0引入虚拟DOM
    1. 通过建立虚拟DOM树，document.createDocumentFragment()方法创建虚拟DOM树。一旦被检测的数据改变，会通过Object.defineProperty定义的数据拦截，截取到数据的变化
    2. 截取到的数据变化，从而通过订阅-发布者模式，触发 Watcher(观察者)，从而改变虚拟DOM中的具体数据
    3. 最后，通过更新虚拟DOM的元素值，从而改变最后渲染DOM树的值，完成双向绑定

## key的作用是什么？可以用数据的 index 代替么？
1. key的作用主要是为了高效的更新虚拟DOM，另外vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果
2. key不能用index代替，index在同一个页面会有重复的情况，违背了高效渲染的初衷

## vue组件中data为什么必须是函数？
1. 在 new Vue() 中，data可以作为一个对象进行操作，然而在 component 中，data只能以函数的形式存在，不能直接将对象赋值给它
2. 当 data 选项是一个函数的时候，闭包，每个实例可以维护一份被返回对象的独立的拷贝，各个示例中的data不会相互影响，是独立的

## vue3.0
### 为什么要用 Proxy API 代替 defineProperty API？
1. defineProperty 局限性最大的原因是它只能针对单例属性做监听，Vue2.x中对data中的属性做了遍历+递归，为每个属性设置了getter，setter，这就是为什么vue只能对data中与定义过的属性做出响应的原因
2. 在vue中使用下标的方式直接修改属性的值或者添加一个预先不存在的对象属性是无法做到setter监听的，这是defineProperty的局限性
3. Proxy监听是针对一个对象的，那么针对这个对象的所有操作都会进入监听操作，这就完全可以代理所有属性，将会带来很大的性能提升和更优的代码
3. Proxy可以理解成：在目标对象前架设一层拦截，外界对该对象的访问，都必须通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

### 响应式是惰性的
1. 在 vue.js 2.x 中，对于一个深层属性嵌套的对象，要劫持它内部深层次的变化，就需要递归遍历这个对象，执行Object.defineProperty把每一层对象数据都变成响应式的，这无疑有很大的性能消耗
2. 在 vue3.x中使用 Peoxy API 不能见听到对象内部深层次的属性变化，因此它的处理方式是在getter中递归响应式，这样的好处是真正访问到的内部属性才会变成响应式，简单的可以说是按需实现响应式，减少性能消耗
3. Proxy基础用法
```js
let datas = { num: 0 }
let proxy = new Proxy(datas, {
    get(target, property) {
        return target[property]
    }
    set(target, property, value) {
        target[property] = value
    }
})
```

### 编译优化
1. vue3 编译做了哪些优化？
    1. 生成 block tree
        1. vue2.x的数据更新并出发重新渲染的粒度是组件级的，单个组件内部需要遍历该组件的整个 vnode 树
        2. vue3.x做到了通过编译阶段对静态模板的分析，编译生成了Block tree。Block tree 是一个将模板基于动态节点指令切割的嵌套区块，每个区块内部的节点结构是固定的。每个区块只需要追踪自身包含的动态节点
2. 传统虚拟DOM的性能瓶颈
    1. 传统虚拟DOM的性能跟模板大小正相关，跟动态结点的数量无关。在一些组件整个模板内只有少量动态节点的情况下，这些遍历都是性能的浪费
    2. 根本原因：JSX和手写的render function是完全动态的，过度的灵活性导致运行时可以用于优化的信息不足
    3. 优化（动静结合）：
        1. 节点结构完全不会改变
        2. 只有一个动态节点
3. slot编译优化
    1. vue2.x中，如果有一个组件传入了 slot，那么每次父组件更新的时候，会强制子组件update，造成性能浪费
    2. vue3.x优化了slot的生成，使得非动态slot中的属性更新只会触发子组件的更新，动态slot指的是在slot上面使用v-if / v-for，动态slot名字会导致slot产生运行时动态变化但是又无法被子组件track的操作

## render()
1. render()是templete的下一步，互补关系
2. templete => render()创建真实DOM => 虚拟DOM => 转化成真实DOM
3. render() 和 templete也叫类编译器
```vue
<!-- 一值多判断，可以用 render() -->
<!-- 可以集中管理 -->
<script>
export default {
    name: 'Button',
    props: {
        // 按钮类型
        type: {
            type: String,
            default: 'normal'
        },
        // 按钮的 text
        text: {
            type: String,
             default: 'normal'
        }
    },
    render(h) {
        // h => 原生 JS 中 createElement()
        // 第一个参数：将要创建什么元素
        // 第二个参数
        return h('button', {
            // v-bind: class
            class: {
                btn: true,
                'btn-success': this.type === 'success',
                'btn-danger': this.type === 'error',
                'btn-warning': this.type === 'warning',
                'normal': !this.type
            },
            // dom 属性
            domProps: {
                innerText: this.text || 'normal'
            },
            // v-on: click
            on: {}
        })
    }
}
</script>
<style scoped>
.btn {
    width: 100px;
    height: 40px;
    color: white;
    transition: all .5s;
}
.btn:hover {
    background: chartreuse;
    cursor: pointer;
}
.btn-success {
    background: green;
}
.btn-danger {
    background: red;
}
.btn-warning {
    background: orange;
}
.normal {
    background: blue;
}
</style>
```
```vue
<!-- helloWord.vue -->
<template>
    <div class='hello'>
        <!-- 高精度权限判断 -->
        <!-- 自定义指令 -->
        <div v-display-key = "1">
            <button>button one</button>
        </div>
        <div v-display-key = "2">
            <button>button two</button>
        </div>
        <div v-display-key = "3">
            <button>button three</button>
        </div>
        <!-- 一值多判断 -->
        <Button :type='type', :text='text'></Button>  
    </div>
</template>
<!-- 引用 -->
<script>
// import Button form '../views/Buttion.vue'
export default {
    components: {
        Button
    },
    data() {
        return {
            type: 'success',
            text: 'Button'
        }
    }
}
</script>
```

## router.js 动态引入
router -> index.js / index.router.js / login.router.js
```js
// index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routerList = []
// 引入路由
function importAll(r) {
    // r.keys() 是 importAll(require.context('./', false, /\.router\.js/)) 的返回值
    r.keys().forEach(
        // 把 export default 对象 追加到 routerList 中
        (key) => routerList.push(r(key).default)
    )
}

// 动态引入
// require.context() => webpack API => 引入文件，动态的
// 1. 路径
// 2. 是否匹配子级文件
// 3. 规则
// 在和 index 同级的文件夹下 不找子级，找 .router.js结尾的文件
importAll(require.context('./', false, /\.router\.js/))

const route = [
    ...routerList
]
```
```js
// index.router.js
// 子模块
export default {
    path: '/index',
    name: 'index',
    // 页面的元信息
    meta: {
        require: true
    },
    // 懒加载实现  => 异步加载，输入路由的一瞬间再加载
    component: () => import('../views/index.vue'),
    children: [

    ]
}
```
```js
// login.router.js
// 子模块
export default {
    path: '/login',
    name: 'login',
    // 页面的元信息
    meta: {
        require: false
    },
    // 懒加载实现  => 异步加载，输入路由的一瞬间再加载
    component: () => import('../views/login.vue'),
    children: [

    ]
}
```
```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { checkArray } from './array' // 模拟检测权限的数组
Vue.config.productionTip = false

// 权限校验
// 注册一个全局自定义指令 `v-display-key`
Vue.directive('display-key', {
    // 当被绑定的元素插入到 DOM 中的一瞬间做校验
    // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted(el, binding) { // binding：一个对象
        let displayKey = binding.value // value：指令的绑定值，例如：v-display-key="2" 中，绑定值为 2。
        if(displayKey) { // 如果有 displayKey 需要用权限来控制
            let hasPerimission = checkArray(displayKey)
            if(!hasPerimission) {
                // 如果没有权限 通过父级删除当前元素
                el.parentNode && el.parentNode.removeChild(el)
            } else {
                throw new Error(`need key! Like v-display-key = "'displayKey'"`)
            }
        }
    }
})

// 路由守卫
router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem('token')
    if(to.meta.require) {
        if(token) {
            // 允许进入
            next()
        } else {
            // 跳登录
        }
    } else {
        next()
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
```
```js
// array.js
// 模拟后台权限数组
export function checkArray(key) {
    // 权限数组
    let arr = ['1', '3', '5']
    let index = arr.indexOf(key)

    if(index > -1) {
        return true
    } else {
        return false
    }
}
```