class MyPromise {
  constructor(exector) {
    this.state = 'pending'
    this.value
    this.reason

    this.onResolveCallbacks = []
    this.onRejectCallbacks = []

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.value = value
        this.state = 'fulfilled'
        this.onResolveCallbacks.forEach((fn) => fn())
      }
    }

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectCallbacks.forEach((fn) => fn())
      }
    }

    try {
      exector(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    // 判断 onFulfilled onRejected 是否为函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    // 返回 promise 支持链式调用
    const p2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.state === 'fulfilled') {
        // 执行成功的
        setTimeout(() => {
          try {
            // 确保在上一个promise之后执行
            const x = onFulfilled(this.value)
            this.resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.state === 'rejected') {
        // 执行失败的
        setTimeout(() => {
          try {
            // 确保在上一个promise之后执行
            const x = onRejected(this.reason)
            this.resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        // pending 状态  放入队列等待执行
        this.onResolveCallbacks.push(() => {
          // 执行成功的
          setTimeout(() => {
            try {
              // 确保在上一个promise之后执行
              const x = onFulfilled(this.value)
              this.resolvePromise(p2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })

        this.onRejectCallbacks.push(() => {
          // 执行成功的
          setTimeout(() => {
            try {
              // 确保在上一个promise之后执行
              const x = onRejected(this.reason)
              this.resolvePromise(p2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })

    return p2
  }

  resolvePromise(p2, x, resolve, reject) {
    // 判断前后两个promise 是否相等  避免在p2 里面返回p1的then  陷入死循环
    if (p2 === x) {
      return reject(new TypeError('type error'))
    }

    let called = false
    // 判断x数据类型  如果是函数或者对象，需要递归调用
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // 判断 then 是否为函数
        const then = x.then

        if (typeof then === 'function') {
          // 递归调用 then
          then.call(
            x,
            (y) => {
              if (called) return
              called = true
              this.resolvePromise(p2, y, resolve, reject)
            },
            (r) => {
              if (called) return
              called = true
              reject(r)
            },
          )
        } else {
          resolve(x)
        }
      } catch (error) {
        if (called) return
        called = true
        reject(error)
      }
    } else {
      // 直接resolve返回
      resolve(x)
    }
  }
  /**
   * 1.返回一个新的promise对象
   * 2.遍历传入的数据，将数据包装成一个 promise 对象
   * 3. 执行resolve 或者reject
   * 4. 返回结果
   * 这里的代码是一个 forEach 循环，对于每个 Promise，调用 MyPromise.resolve 方法将其转换为 Promise 对象，然后调用 then 方法，将 fulfilled 的值存储到 results 数组中，count 加 1。当 count 等于 promises 数组的长度时，说明所有的 Promise 都 fulfilled，此时调用 resolve 方法，将 results 数组作为返回值传递给新的 Promise。
   * 在遍历时记录当前promise在数组中的位置，这个位置就是index。
   */
  all(array) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(array)) {
        throw new TypeError('You must pass an array to all.')
      }
      const result = []
      let count = 0
      // 遍历 array 拿到每一条数据
      array.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            result[index] = value
            count++
            // 判断 result 结果值的长度 和 array参数的长度相等  执行最外面的 resolve 返回 all 结果
            if (count === array.length) {
              resolve(array)
            }
          },
          (err) => {
            reject(err)
          },
        )
      })
    })
  }

  race(array) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(array)) {
        throw new TypeError('You must pass an array to all.')
      }

      array.forEach((promise) => {
        MyPromise.resolve(promise).then(
          (value) => {
            resolve(value)
          },
          (reason) => {
            reject(reason)
          },
        )
      })
    })
  }
}

MyPromise.defer = MyPromise.deferred = function () {
  var result = {}
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}
module.exports = MyPromise
