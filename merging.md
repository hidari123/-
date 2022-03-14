# 声明合并

## 接口合并
```ts
// 合并时必须要求两个接口中属性名不同
// 否则后续属性声明必须属于同一类型
interface InfoInter {
    name: string
    getRes(input: string): number
}
interface InfoInter {
    age: number
    getRes(input: number): string
}
let infoInter: InfoInter
infoInter = {
    // 两个字段必须都要有
    name: 'hidari',
    age: 18,
    getRes(text: any): any {
        if (typeof text === 'string') { return text.length }
        else { return String(text) }
    }
}
console.log(infoInter.getRes(123)).length
```
| 声明类型               | 创建了命名空间 | 创建了类型 | 创建了值 |
|--------------------|---------|-------|------|
| Namespace（实际上创建对象） | yes     |       | yes  |
| class              |         | yes   | yes  |
| Enum               |         | yes   | yes  |
| interface          |         | yes   |      |
| Type Alias 类型别名    |         | yes   |      |
| Function           |         |       | yes  |
| Variable           |         |       | yes  |

## 命名空间合并
```ts
namespace Validations {
    // 没有加 export 的语句 另外的 namespace 无法使用
    const numbrtReg = /^[0-9]+$/
    export const checkNumber = () => {}
}
namespace Validations {
    console.log(numbrtReg) // 报错
    export const checkLetter = () => {}
}
// =>
/*
namespace Validations {
    export const checkNumber = () => {}
    export const checkLetter = () => {}
}*/
```

## 命名空间和类合并
```ts
// 同名类必须定义在命名空间前面
class Validations {
    constructor() {}
    public checkType() {}
}
namespace Validations {
    export const numbrtReg = /^[0-9]+$/
}
console.dir(Validations.numbrtReg) // 类上添加了命名空间的内容作为静态属性
```

## 命名空间和函数合并
```ts
// 同名函数必须定义在命名空间前面
function countUP() {
    countUP.count++
}
namespace countUP {
    export let count = 0
}
console.log(countUP.count)
countUP()
console.log(countUP.count)
countUP()
console.log(countUP.count)
```

## 命名空间和枚举合并
```ts
enum Colors {
    red,
    green,
    blue
}
namespace Colors {
    export const yellow = 3
}
console.log(Colors)
/*
* 0: 'red'
* 1: 'green'
* 2: 'blue'
* blue: 2
* green: 1
* red: 0
* yellow: 3
*/
```
