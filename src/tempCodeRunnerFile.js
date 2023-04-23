class MyPromise {
  constructor(executor) {
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
        this.reason = reason
        this.state = 'rejected'
        this.onRejectCallbacks.forEach((fn) => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    // 判断类型
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    const p2 = new MyPromise((resolve, reject) => {
      // 执行成功
      // 执行失败
      // pending状态放入任务队列
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            this.resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            this.resolvePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        this.onResolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              this.resolvePromise(p2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })

        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try {
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
    // 判断 p2 和x是否相等
    if (p2 === x) {
      return reject(new TypeError('type error'))
    }

    // 执行锁 确保执行一次完resolve或者reject后 不再执行
    let called = false

    // 判断x数据类型  如果是函数 对象 需要递归执行  如果是值类型 直接resolve
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        // 判断 then是否为函数
        const then = x.then
        if (typeof then === 'function') {
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
      resolve(x)
    }
  }
}
