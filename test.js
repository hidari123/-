function f(s) {
    console.log(this.a, s) // s => 3 this => obj
    // 2, 3
    return this.a + s
}
var obj = {
    a: 2
}
var f2 = function() { // 无形参接收 arguments接收 [Arguments] { '0': 3 }
    return f.call(obj, arguments) // arguments 当作参数继续传给下一个 f
}
var b = f2(3)
console.log(b) // 5