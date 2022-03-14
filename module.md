### 按需导入
```js
const status = 0
if (status) {
    import('./x')
} else {
    import('./y')
}
```
### 导入导出合并写法
```js
import { name, age } from './x'
export { name, age }
// => 
// 合并写法导入后直接导出，不能引用
export { name, age } from './x'
```

## node.js 导入导出
### 导出
```js
exports.name = 'hidari'
exports.age = 18

module.exports = function () {
    console.log('hidari')
}
```
### 导入
```js
const info = require('./z')
info()
```

## TS modules
### 导出

```ts
export type FuncInterface = {
    name: string
    (arg: number): string
}

export class A {
    constructor() {}
}

class B {
    constructor() {}
}

export { B as calssB }

export * from './a'
```

### 导入
```ts
import { name } from './b'
import * as info from './b' // 一个对象
console.log(info)
```

### export = & = require()
```ts
// 导出
const name = 'hidari'
export = name
// 导入
import name = require('./c')

// example
// npm install moment
// 3种引入方法
import moment from 'moment'
import * as moment from 'moment'
import moment = require('moment')
```

## 命名空间
1. 程序内部用于防止全局污染，相关内容放在一起 => 命名空间
2. 封装工具或者库，适用于模块系统中引入 => 模块
3. 命名空间定义和使用
4. 推荐使用模块
```ts
namespace Validation {
    const isLetterReg = /^[A-Za-z]+$/
    export const isNumberReg = /^[0-9]+$/
    export const checkLetter = (text: any) => {
        return isLetterReg.test(text)
    }
}
// 命名空间导入
// tsc 指令编译
/// <reference path='space.ts'/> // 三斜线引入 path后加需要引入的命名空间
// 终端 => tsc --outfile '导出文件' '导入文件'
let isLetter = Validation.checkLetter('abc')
console.log(isLetter)
// 多个文件中同名命名空间 => 合并成一个，不会冲突

// 命名空间别名
namespace Shape {
    export namespace Polygons {
        export class Triangle {}
        export class Squaire {}
    }
}
// 使用别名可以简化深层次嵌套
import polygons = Shape.Polygons
let triangle = new polygons.Triangle()
```

## 模块解析
1. 相对模块导入：`/`根目录,`./`当前目录,`../`上一级目录
2. 非相对模块引入：如 baseUrl,路径映射
3. 模块解析策略：`node`nodejs模块解析策略,`classic`TS/es6默认解析策略 => .ts => .tsx =>.d.ts
4. 模块解析配置项
    1. `baseUrl` 编译之后文件放在哪个文件夹下
    2. `paths` 映射某个模块在哪里，引入第三方模块，生命文件，是一个数组，里面有多个路径。使用`paths`必须使用`baseUrl`
    3. `rootDirs` 路径列表 编译时会把这个路径中的文件输出到同一个目录中
    4. `--noResolve` ts 在编译前会先解析模块引用 每解析一个模块就会加到模块列表 通过在命令行输入`--noresolve`告诉编译器不要将没有解析的模块放入模块列表
