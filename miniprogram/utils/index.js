/**
 * 云函数助手
 * @param {Object} data 云函数参数 
 */
export const cloudFunction = (data) => {
  return wx.cloud.callFunction({
    name: 'classmate',
    data
  })
}
/**
 * 节流函数
 * @param {Function} fn 节流函数
 * @param {Number} time 节流时间
 * @returns {Function}
 */
export function throttle(fn, time = 200) {
  let canUse = true;
  return function () {
    if (!canUse) { return false }
    canUse = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canUse = true
    }, time)
  }
}
