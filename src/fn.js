/** 手写 Object.create
 * 用法：创建一个新的对象，将传入的对象原型指向新对象并返回
 * 思路：
 *  1、将原型写入到一个函数里面，然后将函数返回
 * @param {*} obj
 * @return {*}
 */
function myCreate(obj) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function F() {}
  F.prototype === obj
  return new F()
}

/** 手写 instanceof 方法
 * 用法：instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 * 思路：
 *  1、通过 Object.getPrototypeOf 获取 obj 的原型
 *  2、循环判断 objProtoType 是否和 constructor 的原型相等
 *    2.1、如果相等就返回 true
 *    2.2、如果不相等 就重新赋值一下 obj 的原型 进入下一次循环
 *  3、判断是 objProtoType 是否为空 如果为空就说明不存在 返回 false
 * @param {Object} obj 需要判断的数据
 * @param {Object} constructor
 * @return {*}
 */
function myInstanceOf(obj, constructor) {
  let objProtoType = Object.getPrototypeOf(obj)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!objProtoType) return false

    if (objProtoType === constructor.prototype) {
      return true
    }

    objProtoType = Object.getPrototypeOf(objProtoType)
  }
}

/** 手写 new 操作符
 * 用法：创建一个实例化对象
 * 思路：
 *  1、判断传入的 fn 是否为 function
 *  2、创建一个空对象
 *  3、将这个空对象的原型设置为构造函数的 prototype 属性。
 *  4、使用 apply 执行构造函数 并传入参数 arguments 获取函数的返回值
 *  5、判断这个返回值 如果返回的是 Object || Function 类型 就返回该对象 否则返回创建的对象
 * @param {Function} fn 构造函数
 * @return {*}
 */
function myNew(fn, ...args) {
  // 判断 fn 是否为函数
  if (typeof fn !== 'function') {
    return new TypeError('fn must be a function')
  }

  // 创建一个空的对象
  let obj = null

  // 将这个空对象的原型设置为构造函数的 prototype 属性。
  obj = Object.create(fn.prototype)

  // 通过 apply 执行构造函数 传入参数 获取返回值
  let result = fn.apply(obj, args)

  // 判断这个返回值 如果返回的是 Object || Function 类型 就返回该对象 否则返回创建的对象
  const flag = result && (typeof result === 'object' || typeof result === 'function')

  return flag ? result : obj
}

/** 手写节流
 * 用法：函数在 n 秒内只执行一次，如果多次触发，则忽略执行。
 * 思路：
 *  1、记录函数上一次执行的时间戳 startTime
 *  2、返回一个闭包函数 当被调用时会记录一下执行时间 nowTime
 *  3、比较两次执行时间间隔 是否超过了 wait 时间
 *  4、如果是大于 wait 时间 说明已经过了一个 wait 时间 可以执行函数
 *    4.1、更新 startTime 方便下次对比
 *    4.2、通过 apply 执行函数fn 传入 arguments 参数
 *  5、如果没有超过 wait 时间  说明是在 wait 时间内又执行了一次  忽略
 * @param {Function} fn 执行函数
 * @param {Number} wait 等待时间
 * @return {*}
 */
function throttle(fn, wait) {
  let startTime = Date.now()

  return function () {
    const nowTime = Date.now()

    // 计算两次执行的间隔时间 是否大于 wait 时间
    if (nowTime - startTime >= wait) {
      startTime = nowTime
      return fn.apply(this, arguments)
    }
  }
}

/** 手写防抖
 * 用法：函数在 n 秒后再执行，如果 n 秒内被触发，重新计时，保证最后一次触发事件 n 秒后才执行。
 * 思路：
 *  1、保存一个变量 timer
 *  2、返回一个闭包函数 函数内判断一下 timer 是否有值
 *    2.1、如果有值 说明 定时器已经开启 需要将定时器清空
 *  3、设置定时器 等待 wait 后执行 将定时器赋值给 timer 记录
 *  4、通过 apply 执行函数 传入 arguments
 * @param {*} fn
 * @param {*} wait
 * @param {boolean} [immediate=false]
 * @return {*}
 */
function debounce(fn, wait, immediate = false) {
  let timer = null

  return function () {
    // 存在定时器 清空
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    // 立即执行
    if (immediate) {
      // 判断是否执行过  如果执行过 timer 不为空
      const flag = !timer

      // 执行函数
      flag && fn.apply(this, arguments)

      // n 秒后清空定时器
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait)
    }
  }
}

/** 手写 call
 * 用法：call 方法用于调用一个函数，并指定函数内部 this 的指向，传入一个对象
 * 思路：
 *  1、判断 this 是否指向一个函数  只有函数才可以执行
 *  2、获取传入的 context 上下文 也就是我们要指向的 如果不存在就指向 window
 *  3、将当前 this 也就是外部需要执行的函数 绑定到 context 上 然后执行获取 result 传入 ...args 确保参数位置正确
 *  4、删除 context 对象的 fn 属性 并将 result 返回
 */

Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    return new TypeError('type error')
  }
  context = context || window

  // 缓存this

  context.fn = this

  const result = context.fn(...args)

  delete context.fn

  return result
}

/** 手写 apply
 * 用法：apply 方法用于调用一个函数，并指定函数内部 this 的指向，传入一个数组
 * 思路：
 *  1、判断 this 是否指向一个函数  只有函数才可以执行
 *  2、获取传入的 context 上下文 也就是我们要指向的 如果不存在就指向 window
 *  3、将当前 this 也就是外部需要执行的函数 绑定到 context 上的一个 fn 属性上
 *  4、执行 fn 函数 判断 args 是否有 如果没有参数就直接执行 如果有参数 将参数展开传入 fn
 *  5、删除 context 对象的 fn 属性 并将 result 返回
 */

Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') {
    return new TypeError('type error')
  }

  // 和 call 一样 只不过传入的参数只有一个 类型为数组 在执行 fn 的时候将参数展开
  context = context || window

  context.fn = this

  const result = args ? context.fn(...args) : context.fn()

  delete context.fn

  return result
}

/** 手写 bind
 * 用法：bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 * 思路：
 *  1、判断 this 是否指向一个函数  只有函数才可以执行
 *  2、获取传入的 context 上下文 也就是我们要指向的 如果不存在就指向 window
 *  3、将当前 this 也就是外部需要执行的函数 绑定到 context 上的一个 fn 属性上
 *  4、返回一个函数 供外部调用 执行函数后传入新的参数
 *  5、执行在闭包内缓存的 fn 将两次参数一起传入 删除 fn 返回 result
 */

Function.prototype.myBind = function (context, ...args1) {
  if (typeof this !== 'function') {
    return new TypeError('type error')
  }
  context = context || window
  context.fn = this

  // 和 call apply 不一样的是 bind 返回一个函数 需要在外部执行  参数为多个对象 且返回的对象里也会有参数
  return function (...args2) {
    const result = context.fn(...args1, ...args2)
    delete context.fn
    return result
  }
}

/** 函数柯里化
 * 用法：函数柯里化是一种将接受多个参数的函数转换为接受一系列单一参数的函数的技术
 * 思路：
 *  1、使用 fn.length 获取函数的形参数量
 *  2、如果没有传入初始参数数组 则将其初始化为空数组 在递归的时候会接受上一次的形参
 *  3、返回一个闭包函数 接受函数的实参 将 args 中的形参和当前的形参进行合并 得到 newArgs
 *  4、如果新的参数数组 newArgs 长度大于等于 length 函数的形参数量 调用 apply 执行函数 传入 newArgs
 *  5、如果新的参数数组长度小于函数的形参数量 则再次调用 curry 函数 将新的参数数组作为初始参数传入 返回一个新的闭包函数
 * @param {*} fn
 * @param {*} args
 * @return {*}
 */
function curry(fn, args) {
  // 获取 fn 获取 add 函数的形参数量
  const length = fn.length

  // 递归执行时传递的上一次参数 第一次执行 [] 第二次执行 [1]
  args = args || []
  return function () {
    // 将上一次参数和这次的参数进行合并  得到新的参数数组
    const newArgs = [...args, ...arguments]

    // 判断 newArgs 长度是否和 add 函数形参长度一致 如果超过就执行 fn 函数 传递 newArgs
    if (newArgs.length >= length) {
      return fn.apply(this, newArgs)
    } else {
      // 小于 add 函数形参长度 递归调用 curry 函数 累积参数 传递 newArgs
      return curry(fn, newArgs)
    }
  }
}

function add(x, y, z) {
  return x + y + z
}
const curriedAdd = curry(add)

// console.log(curriedAdd(1, 2, 3)) // 6
console.log(curriedAdd(1)(2, 3)) //
// console.log(curriedAdd(1)(2)(3)) // 6

/** 浅拷贝
 * 用法：浅拷贝是指，一个新的对象对原始对象的属性值进行精确地拷贝，如果拷贝的是基本数据类型，拷贝的就是基本数据类型的值，如果是引用数据类型，拷贝的就是内存地址。如果其中一个对象的引用内存地址发生改变，另一个对象也会发生变化。
 * 思路：
 *  1、判断是否为对象
 *  2、根据obj类型创建一个新的对象
 *  3、for in 遍历对象 拿到 key
 *  4、判断 key 是否在 obj 中
 *  5、将 key 作为新对象的key 并赋值 value
 *
 * @param {*} obj
 * @return {*}
 */
function shallowCopy(obj) {
  // 只拷贝对象
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // 新的对象
  const newObj = Array.isArray(obj) ? [] : {}

  // 循环遍历 obj 将 key 作为 newObj 的 key 并赋值value
  for (const key in obj) {
    // 判断 key 是否在 obj 中
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }

  return newObj
}

/** 深拷贝
 * 用法：拷贝一个对象的属性值 如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用
 * 思路：
 *  1、判断是否为对象
 *  2、判段对象是否在 map 中 如果存在就不需要操作
 *  3、将 obj 放入 map 中 避免重复引用
 *  4、for in 遍历对象 拿到 key 判断 key 是否在 obj 中
 *  5、value 如果为对象 就递归拷贝 否则就赋值
 * @param {*} obj
 * @param {*} [map=new Map()]
 * @return {*}
 */
function deepCopy(obj, map = new Map()) {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // 判断 obj 是否在 map 中存在 如果存在就不需要递归调用 直接返回数据
  if (map.get(obj)) {
    return map.get(obj)
  }
  const newObj = Array.isArray(obj) ? [] : {}

  // 放入 map 中 记录当前对象 避免重复拷贝 循环引用
  map.set(obj, newObj)

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 如果 value 还是一个对象 递归获取 否则就赋值
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key], map) : obj[key]
    }
  }

  return newObj
}

// const str =
// "from vue # 123123/**
// * debounce防抖
// * @param { function } fn 回调
// * @param { number } wait 等待时间
// */
// function debounce(fn, wait = 300) {
//     // 利用闭包生成唯一的一个定时器
//     let timer = null;

//     // 返回一个函数，当作触发事件执行
//     return function (...args) {
//       if (timer) {
//         // 上一次存在定时器，需要清空
//         clearTimeout(timer);
//       }
//       // 设定定时器，定时器结束后执行回调函数 fn  如果多次触发就重新设定
//       timer = setTimeout(() => {
//         fn.apply(this, args);
//       }, wait);
//     };
// }
// "
