/* ====================================== 手写 new ======================================*/

/* function myNew(fn, ...arg) {
  // 创建一个空对象
  let obj = null

  // 判断函数
  if (typeof fn !== 'function') {
    return new Error('type error')
  }

  // 修改原型 将空对象的原型指向构造函数的原型
  obj = Object.create(fn.prototype)
  // 执行构造函数 改变this指向
  const result = fn.apply(obj, arg)

  // 判断返回类型 值类型 返回result 引用类型返回obj
  const flag = result && typeof result === 'function' || typeof result === 'object' 

  return flag ? result : obj
}

// 使用方法
function test(name) {
  this.age = 1
  console.log(name)
  return '123'
}
const con = myNew(test, 'zs')
console.log('con', con) */

/* ====================================== 手写 Object.create ======================================*/
/* 
function myCreate(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
 */

/* ====================================== 手写 instanceof ======================================*/
/* function myInstanceOf(obj, type) {
  let objPrototype = Object.getPrototypeOf(obj)

  while(true) {
    // objProto 为 null  不在目标原型上
    if(objPrototype === null) {
      return false
    }
    if (objPrototype === type.prototype) {
      return true
    }
    
    // 获取上一级prototype
    objPrototype = Object.getPrototypeOf(objPrototype)
  }
}
console.log('myInstanceOf',myInstanceOf({}, Object));
console.log('myInstanceOf', {} instanceof Object);
 */

/* ====================================== 手写 throttle 节流======================================*/
// n 秒后执行，如果多次触发，只生效一次  对比两次触发的时间是否大雨 wait 时间
/* function throttle(fn, wait) {
  let startTime = Date.now()
  return function () {
    const dateNow = Date.now()

    // 判断两次时间是否超过 wait时间
    if (dateNow - startTime >= wait) {
      startTime = Date.now()
      return fn.apply(this, arguments)
    }
  }
} */

/* ====================================== 手写 debounce 防抖======================================*/
// function debounce(fn, wait, immediate=false) {
//   let timer = null

//   return function () {
//     if (timer) {
//       clearTimeout(timer)
//     }

//     // 立即执行
//     if(immediate) {
//       const flag = !timer

//       // 执行过后  清空定时器
//       setTimeout(() => {
//         timer = null
//       }, wait)

//       // 执行函数
//       flag && fn.apply(this, arguments)
//     } else {
//       timer = setTimeout(() => {
//         fn.apply(this, arguments)
//       }, wait)
//     }

//   }
// }

/* ====================================== 手写 call ======================================*/

// Function.prototype.myCall = function(context, ...args) {
//   // 判断调用 myCall 是否为函数调用  即判断当前 this 是否为函数
//   if (typeof this !== 'function') {
//     return new Error('type error')
//   }

//   // 判断 context 是否有值 没值指向 window
//   context = context || window

//   // 将调用函数设为对象的方法
//   context.fn = this

//   // 执行函数 获取返回值
//   const result = context.fn(...args)

//   // 删除方法
//   delete context.fn
//   return result
// }

/* ====================================== 手写 apply ======================================*/
Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') {
    return new Error('type error')
  }
  console.log('args', args)

  context = context || window

  context.fn = this
  console.log('args', args)
  const result = args ? context.fn(...args) : context.fn()

  delete context.fn
  return result
}

const testFn = function (a, b) {
  console.log('this fn', this)
  console.log('a', a)
  console.log('b', b)
  console.log('this.x', this.x)
  return 'hello'
}

const res = testFn.myApply({ x: 1 })

/* ====================================== 手写 bind ======================================*/
/* Function.prototype.myBind = function(context, ...args1) {
  if (typeof this !== 'function') {
    return new Error('type error')
  }

  context = context || window

  context.fn = this

  return function(...args2) {
    const result = context.fn(...args1, ...args2)
    delete context.fn
    return result
  }
}
function test(a, b, c) {
  console.log('a b c', a, b,c)
  console.log('this.x', this.x)
  return 'this.return'
}

// const fn = test.bind({x: 1}, 100, 1000)
// fn(10000)
const fn = test.myBind({x: 1}, 100, 1000)
fn() */

/* ====================================== 手写 柯里化 ======================================*/
// 多个参数的函数转成一系列使用一个参数的函数
// 一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
function curry(fn, args) {
  console.log('args', args)
  console.log('argument', arguments)
  args = args || []
  let length = fn.length
  return function () {
    console.log('arguments2', arguments)
    const newArgs = [...args, ...arguments]
    if (newArgs.length >= length) {
      return fn.apply(this, newArgs)
    } else {
      return curry(fn, newArgs)
    }
  }
}
// function add(a, b, c, d, e) {
//   console.log('(a, b, c', a, b, c, d, e)
//   return a + b + c + d + e
// }
// const curriedAdd = curry(add)
// console.log('curriedAdd', curriedAdd)
// console.log('curriedAdd(1)(2)(3)', curriedAdd(1, 2)(3, 4)(5))
// add(1)(2)(3) // 6
// _fn(1,2,3,4,5);     // print: 1,2,3,4,5
// _fn(1)(2)(3,4,5);   // print: 1,2,3,4,5
// _fn(1,2)(3,4)(5);   // print: 1,2,3,4,5
// _fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5

/* ====================================== 手写 浅拷贝 ======================================*/
/* function shallowCopy(obj) {
  // 边界处理  只拷贝对象
  if (!obj || typeof obj !== 'object') {
    return new Error('type error')
  }
  const newObject = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObject[key] = obj[key]
    }
  }

  return newObject
} */

/* ====================================== 手写 深拷贝 ======================================*/
/* function clone(object, map = new Map()) {
  if (!object || typeof object !== 'object') {
    return new Error('type error')
  }
  // 避免循环引用
  if(map.has(object)){
    return map.get(object)
  }
  const newObject = object instanceof Array ? [] : {}

  map.set(object, newObject)

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
        newObject[key] = typeof object[key] === 'object' ? clone(object[key], map) : object[key]
    }
  }
  return newObject
}
 */
