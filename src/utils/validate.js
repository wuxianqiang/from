export default function install(Vue, options) {
/**
 * Vue表单插件
 * 
 * @param {array, object, string} data 可以传入数组和对象或字符串作为参数
 * @returns 返回 element from 验证规则的 rules 对象
 */

Vue.prototype.formatData = function (data) {
    let obj = {}
    if (Array.isArray(data)) {
      for (const val of data) {
        if (typeof val === 'string') {
          obj[val] = {type: val}
        } else {
          for (const key in val) {
            obj[key] = val[key]
          }
        }
      }
    }
    else if (Object.prototype.toString.call(data) === '[object Object]') {
      for (const key in val) {
        obj[key] = val[key]
      }
    }
    else if (typeof data === 'string') {
      obj[data] = {type: data}
    }
    let ret = {}
    let arr = []
    for (const key in obj) {
      ret[key] = options(obj[key], this);
      let val = obj[key]
      for (const k in val) {
        if (k === 'maxLength') {
          arr.push(val[k])
        }
      }
    }
    return [ret, arr]
  }
}
