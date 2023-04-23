// 实现数组元素求和 arr=[1,2,3,4,5,6,7,8,9,10]，求和
// let arr=[1,2,3,4,5,6,7,8,9,10]
// let sum = arr.reduce( (total,i) => total += i,0);
// console.log(sum);

// 实现数组的扁平化 let arr = [1, [2, [3, 4, 5]]];
// 递归
let arr = [1, [2, [3, 4, 5]]]

// function flatten(arr) {
//   let newArr = []

//   // 递归获取数据
//   for (let index = 0; index < arr.length; index++) {
//     const element = arr[index]
//     Array.isArray(element) ? (newArr = newArr.concat(flatten(element))) : newArr.push(element)
//   }

//   return newArr
// }

// 栈
// function flatten(arr) {
//   const stack = [...arr]
//   const result = []

//   while (stack.length) {
//     // 删除最后一个元素并返回  这里会修改数组长度
//     const next = stack.pop()
//     // 判断这个数据是否为数组  如果是就展开 重新放入栈中
//     if (Array.isArray(next)) {
//       stack.push(...next)
//     } else {
//       result.push(next)
//     }
//   }
//   return result
// }
// console.log('arr', flatten(arr))

// function flatten(arr) {
//   while (arr.some((item) => Array.isArray(item))) {
//     arr = [].concat(...arr)
//   }
//   return arr
// }

// console.log('flatten(arr)', flatten(arr))

// 实现数组去重
// const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8]

// 使用 Set
// const uniqueArr = [...new Set(arr)]

// 使用 filter 和 indexOf
const uniqueArr = arr.filter((item, index) => {
  return arr.indexOf(item) === index
})

// ES5方法：使用map存储不重复的数字
function uniqueArray(array) {
  let map = {}
  let res = []
  for (var i = 0; i < array.length; i++) {
    // eslint-disable-next-line no-prototype-builtins
    if (!map.hasOwnProperty([array[i]])) {
      map[array[i]] = 1
      res.push(array[i])
    }
  }
  return res
}

// 实现push 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

Array.prototype.myPush = function () {
  // 循环遍历 arguments.length 也就是传入的参数个数
  for (let index = 0; index < arguments.length; index++) {
    // this.length 指向调用这个方法的数组 获取数组的长度 将当前元素放入最后一个
    this[this.length] = arguments[index]
  }

  return this.length
}
// let arr = [1,2,3]
// arr.myPush(6, 4, 5)

// 实现数组的filter方法 方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素。
/**
 * @param {Function} callback 用来测试数组中每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留
 *  @param {*} element 数组中当前正在处理的元素。
 *  @param {*} index 正在处理的元素在数组中的索引。
 *  @param {*} array 调用了 filter() 的数组本身。
 */
Array.prototype.myFilter = function (callback) {
  if (!callback || typeof callback !== 'function') {
    throw Error('callback must be a function ')
  }

  const res = []
  // this.length 指向调用方法的数组
  for (let index = 0; index < this.length; index++) {
    // 执行 callback 函数传入数据 如果函数返回 true 就将当前数据放入 res 中
    callback(this[index], index) && res.push(this[index])
  }
  return res
}

// 将数字每千分位用逗号隔开

// 不带小数
function format(num) {
  if (!num && typeof num !== 'number') {
    return num
  }
  let str = num.toString()
  let len = str.length

  // 长度是否超过3
  if (len <= 3) {
    return num
  } else {
    // 判断是否为 3 的倍数
    let remainder = len % 3

    // 不是 3 的整倍数
    if (remainder > 0) {
      //  则根据数字长度对字符串进行拆分，每3位一组，最后再用逗号拼接起来

      // 被 3 整除余下的 也就是最前面第一个数字 如 1234567 最前面就是 1
      const firstNum = str.slice(0, remainder)

      // 获取剩下的数组 每 3 个用 , 拼接  也就是从 remainder 位置到最后一位
      const surplus = str.slice(remainder, len).match(/\d{3}/g)

      // 组合起来  第一位后面加上 ,
      return firstNum + ',' + surplus
    } else {
      // 是 3 的倍数 上面操作去掉第一位数据操作就是  直接用正则匹配数据 然后 join 拼接 ,
      return str.match(/\d{3}/g).join(',')
    }
  }
}

// 带小数
function format1(num) {
  if (!num && typeof num !== 'number') {
    return num
  }
  let str = num.toString()
  let len = str.length

  let decimals = ''
  // 获取小数
  str.includes('.') ? (decimals = str.split('.')[1]) : decimals
  // 长度是否超过3
  if (len <= 3) {
    return num
  } else {
    // 判断是否为 3 的倍数
    let remainder = len % 3

    let temp = ''
    // 不是 3 的整倍数
    if (remainder > 0) {
      //  则根据数字长度对字符串进行拆分，每3位一组，最后再用逗号拼接起来

      // 被 3 整除余下的 也就是最前面第一个数字 如 1234567 最前面就是 1
      const firstNum = str.slice(0, remainder)

      // 获取剩下的数组 每 3 个用 , 拼接  也就是从 remainder 位置到最后一位
      const surplus = str.slice(remainder, len).match(/\d{3}/g)

      // 组合起来  第一位后面加上 ,  顺便带上小数
      return firstNum + ',' + surplus + temp + '.' + decimals
    } else {
      // 是 3 的倍数 上面操作去掉第一位数据操作就是  直接用正则匹配数据 然后 join 拼接 , 顺便带上小数
      return str.match(/\d{3}/g).join(',') + '.' + decimals
    }
  }
}
// console.log('format(123456)', format1(123456.12))

// let arr = [1, 2, 3]
// console.log(
//   arr.myFilter((item, index) => {
//     console.log('item', item)
//     console.log('index', index)
//     return item > 2
//   })
// )

// 实现数组的map方法 创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成
// let array1 = [1, 4, 9, 16]
Array.prototype.myMap = function (callback) {
  if (!callback || typeof callback !== 'function') {
    throw Error('callback must be a function ')
  }
  const result = []

  // this.length 指向调用方法的数组
  for (let index = 0; index < this.length; index++) {
    result.push(callback(this[index], index))
  }
  return result
}

// const map1 = array1.map((x) => x * 2)
// console.log(map1)

// 实现 add(1)(2)(3)

// 参考柯里化函数

// 数组转树
let source = [
  {
    id: 1,
    pid: 0,
    name: 'body',
  },
  {
    id: 2,
    pid: 1,
    name: 'title',
  },
  {
    id: 3,
    pid: 2,
    name: 'div',
  },
  {
    id: 4,
    pid: 0,
    name: 'html',
  },
  {
    id: 5,
    pid: 4,
    name: 'div',
  },
  {
    id: 6,
    pid: 5,
    name: 'span',
  },
  {
    id: 7,
    pid: 5,
    name: 'img',
  },
]

function arrToTree(arr) {
  const map = {}
  const result = []
  for (const item of arr) {
    map[item.id] = item
  }
  console.log('map', map)
  for (let i = 0; i < arr.length; i++) {
    // 获取 pid  看是否在 map 中查询得到对应的
    const pid = arr[i].pid
    if (map[pid]) {
      // 当前 pid 在 map 中存在 将当前节点作为 map 中节点的子节点
      map[pid].children = map.children || []
      map[pid].children.push(arr[i])
    } else {
      // 不在 map 中 说明是根节点
      result.push(arr[i])
    }
  }
  return result
}

let source1 = [
  {
    id: 1,
    pid: 0,
    name: 'body',
    children: [
      {
        id: 2,
        pid: 1,
        name: 'title',
        children: [{ id: 3, pid: 2, name: 'div' }],
      },
    ],
  },
  {
    id: 4,
    pid: 0,
    name: 'html',
    children: [
      {
        id: 5,
        pid: 4,
        name: 'div',
        children: [{ id: 7, pid: 5, name: 'img' }],
      },
    ],
  },
]

// 广度优先 参考拍平数组
function treeToArr(arr) {
  let stack = [...arr]
  const result = []

  while (stack.length) {
    // 从数组中获取第一个
    const first = stack.shift()

    // 判断它有没有children
    if (first['children'] && first.children.length) {
      // 有 children 将它展开再放入到栈中
      stack.push(...first.children)

      // 删除 children 属性
      delete first.children
    }

    result.push(first)
  }

  return result
}
// console.log('111', treeToArr(source1))

// ================================================================= 场景应用题 =================================================================

// 实现每隔一秒打印 1,2,3,4
// 使用 let 块级作用域
// for (let i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i);
//   }, i * 1000);
// }

// 使用 setTimeout 实现 setInterval
function mySetInterval(fn, delay) {
  let timerId

  function interval() {
    // 执行回调
    fn()
    // 再次调用 interval
    timerId = setTimeout(interval, delay)
  }

  // 开始执行 interval
  setTimeout(interval, delay)

  return {
    clear() {
      clearTimeout(timerId)
    },
  }
}

// 实现
/**
 * 发布订阅模式
 * @method subscribe
 * @class EventCenter
 */
class EventCenter {
  constructor() {
    // 事件中心
    this.events = {}
  }

  /**
   * 订阅事件
   *
   * @param {string} eventName
   * @param {function} callback
   * @memberof EventCenter
   */
  subscribe(eventName, callback) {
    // 确保当前 eventName 在事件中心是唯一的
    if (!this.events[eventName]) {
      // 创建事件容器
      this.events[eventName] = []
    }
    // 存放事件
    this.events[eventName].push(callback)
  }

  /**
   * 取消订阅
   *
   * @param {string} eventName
   * @param {function} callback
   * @return {*}
   * @memberof EventCenter
   */
  unSubscribe(eventName, callback) {
    // 事件中心里没有这个事件
    if (!this.events[eventName]) {
      return new Error('not find event ' + eventName)
    }

    // 只有事件名 移除事件
    if (!callback) {
      delete this.events[eventName]
    } else {
      // 找到索引
      const index = this.events[eventName].findIndex((el) => el === callback)

      if (index !== -1) {
        return new Error('not find callback')
      }

      // 移除事件下的某个函数
      this.events[eventName].splice(index, 1)

      // 查看事件容器是否为空 如果为空移除事件
      if (this.events[eventName].length === 0) {
        delete this.events[eventName]
      }
    }
  }

  /**
   * 触发事件
   *
   * @param {string} eventName
   * @param {Array} args
   * @return {*}
   * @memberof EventCenter
   */
  dispatch(eventName, ...args) {
    if (!this.events[eventName]) {
      return new Error('not find event ' + eventName)
    }

    // 触发事件
    this.events[eventName].forEach((el) => {
      el(...args)
    })
  }
}

const eventCenter = new EventCenter()

// 订阅事件
eventCenter.subscribe('click', (x, y) => {
  console.log(`clicked at (${x}, ${y})`)
})

// 发布事件
eventCenter.dispatch('click', 10, 20) // 输出：clicked at (10, 20)
