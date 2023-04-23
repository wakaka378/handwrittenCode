// const promise = new Promise((resolve, reject) => {
//   console.log(1)
//   console.log(2)
//   // promise 没有resolve 不执行 then
// })
// promise.then(() => {
//   console.log(3)
// })
// console.log(4)

// const promise1 = new Promise((resolve, reject) => {
//   console.log('promise1')
//   resolve('resolve1')
// })
// const promise2 = promise1.then(res => {
//   console.log(res)
// })
// console.log('1', promise1);
// console.log('2', promise2);

// const promise = new Promise((resolve, reject) => {
//   console.log(1);
//   setTimeout(() => {
//     console.log("timerStart");
//     resolve("success");
//     console.log("timerEnd");
//   }, 0);
//   console.log(2);
// });
// promise.then((res) => {
//   console.log(res);
// });
// console.log(4);

// Promise.resolve().then(() => {
//   console.log('promise1');
//   const timer2 = setTimeout(() => {
//     console.log('timer2')
//   }, 0)
// });
// const timer1 = setTimeout(() => {
//   console.log('timer1')
//   Promise.resolve().then(() => {
//     console.log('promise2')
//   })
// }, 0)
// console.log('start');

// start promise1 timer1  promise2 timer2

// const promise = new Promise((resolve, reject) => {
//   resolve('success1');
//   reject('error');
//   resolve('success2');
// });
// promise.then((res) => {
//   console.log('then:', res);
// }).catch((err) => {
//   console.log('catch:', err);
// })
// then：success1
// Promise.resolve(1)
//   .then(2)
//   .then(Promise.resolve(3))
//   .then(console.log)

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 1000)
// })
// const promise2 = promise1.then(() => {
//   throw new Error('error!!!')
// })
// console.log('promise1', promise1)
// console.log('promise2', promise2)
// setTimeout(() => {
//   console.log('promise1', promise1)
//   console.log('promise2', promise2)
// }, 2000)

// Promise.resolve(1)
//   .then(res => {
//     console.log(res);
//     return 2;
//   })
//   .catch(err => {
//     return 3;
//   })
//   .then(res => {
//     console.log(res);
//   });

// Promise.resolve().then(() => {
//   return new Error('error!!!')
// }).then(res => {
//   console.log("then: ", res)
// }).catch(err => {
//   console.log("catch: ", err)
// })

// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
//   setTimeout(() => {
//     console.log('timer1')
//   }, 0)
// }
// async function async2() {
//   setTimeout(() => {
//     console.log('timer2')
//   }, 0)
//   console.log("async2");
// }
// async1();
// setTimeout(() => {
//   console.log('timer3')
// }, 0)
// console.log("start")
// async1 start  async2 start async1 end timer2 timer3 timer1

// async function async1 () {
//   console.log('async1 start');
//   await new Promise(resolve => {
//     console.log('promise1')
//   })
//   console.log('async1 success');
//   return 'async1 end'
// }
// console.log('script start')
// async1().then(res => console.log(res))
// console.log('script end')

// script start
// async1 start
// promise1
// script end

// async function async1 () {
//   console.log('async1 start');
//   await new Promise(resolve => {
//     console.log('promise1')
//     resolve('promise1 resolve')
//   }).then(res => console.log(res))
//   console.log('async1 success');
//   return 'async1 end'
// }
// console.log('script start')
// async1().then(res => console.log(res))
// console.log('script end')

// script start   async1 start promise1 script end promise1 resolve async1 success async1 end

// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }

// async function async2() {
//   console.log("async2");
// }

// console.log("script start");

// setTimeout(function() {
//   console.log("setTimeout");
// }, 0);

// async1();

// new Promise(resolve => {
//   console.log("promise1");
//   resolve();
// }).then(function() {
//   console.log("promise2");
// });
// console.log('script end')

// script start  async1 start  async2  promise1 script end  async1 end promise2 setTimeout

// async function async1 () {
//   await async2();
//   console.log('async1');
//   return 'async1 success'
// }
// async function async2 () {
//   return new Promise((resolve, reject) => {
//     console.log('async2')
//     reject('error')
//   })
// }
// async1().then(res => console.log(res))
// async2  error

// const first = () => (new Promise((resolve, reject) => {
//   console.log(3);
//   let p = new Promise((resolve, reject) => {
//       console.log(7);
//       setTimeout(() => {
//           console.log(5);
//           resolve(6);
//           console.log(p)
//       }, 0)
//       resolve(1);
//   });
//   resolve(2);
//   p.then((arg) => {
//       console.log(arg);
//   });
// }));
// first().then((arg) => {
//   console.log(arg);
// });
// console.log(4);

// 3 7 4  1 2 5 Promise { 1 }

// const async1 = async () => {
//   console.log('async1');
//   setTimeout(() => {
//     console.log('timer1')
//   }, 2000)
//   await new Promise(resolve => {
//     console.log('promise1')
//   })
//   console.log('async1 end')
//   return 'async1 success'
// }
// console.log('script start');
// async1().then(res => console.log(res));
// console.log('script end');
// Promise.resolve(1)
//   .then(2)
//   .then(Promise.resolve(3))
//   .catch(4)
//   .then(res => console.log(res))
// setTimeout(() => {
//   console.log('timer2')
// }, 1000)

// script start  async1 promise1 script end  1  timer2  timer1

// const p1 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve('resolve3');
//     console.log('timer1')
//   }, 0)
//   resolve('resolve1');
//   resolve('resolve2');
// }).then(res => {
//   console.log(res)  // resolve1
//   setTimeout(() => {
//     console.log(p1)
//   }, 1000)
// }).finally(res => {
//   console.log('finally', res)
// })

// resolve1 finally timer1 p1

// console.log(1)

// setTimeout(() => {
//   console.log(2)
// })

// new Promise(resolve =>  {
//   console.log(3)
//   resolve(4)
// }).then(d => console.log(d))

// setTimeout(() => {
//   console.log(5)
//   new Promise(resolve =>  {
//     resolve(6)
//   }).then(d => console.log(d))
// })

// setTimeout(() => {
//   console.log(7)
// })

// console.log(8)

// 1  3  8  4 2 5 6 7

// setTimeout(function () {
//   console.log(1)
// }, 100)

// new Promise(function (resolve) {
//   console.log(2)
//   resolve()
//   console.log(3)
// }).then(function () {
//   console.log(4)
//   new Promise((resolve, reject) => {
//     console.log(5)
//     setTimeout(() => {
//       console.log(6)
//     }, 10)
//   })
// })
// console.log(7)
// console.log(8)
