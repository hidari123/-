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
let person = new Person() // 当通过某个函数构造东西的时候才叫构造函数
```