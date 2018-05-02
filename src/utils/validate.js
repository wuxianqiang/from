
function dealValidate(options) {
  let obj = {}
  for (const key in options) {
    let val = options[key]
    for (const k in val) {
      if (k === 'validator') {
        let v = val[k]
        if (Object.prototype.toString.call(v) === '[object RegExp]') {
          obj[key] = init(v, val.message)
        }
      }
    }
  }
  return obj
}

function init(reg, msg) {
  return (rule, value, callback) => {
    if (v === '' || v === undefined) {
      if (!reg(value)) {
        callback(new Error(msg));
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
}

export default function install(Vue, options) {
  let optionsArray = Object.keys(options)
  console.log(optionsArray)
  dealValidate(options)
  function dealRules(item) {
    let rules = [];
    let {
      required = true,
      trigger = [
        'blur', 'change'
      ],
      message = '输入格式不正确！'
    } = item
    if (required) {
      rules.push({
        required: true,
        message: '该输入项为必填项!',
        trigger: ['blur', 'change']
      });
    }
    if (item.maxLength) {
      rules.push({
        min: 1,
        max: item.maxLength,
        message: '最多输入' + item.maxLength + '个字符!',
        trigger: ['blur', 'change']
      });
    }
    if (item.min && item.max) {
      rules.push({
        min: item.min,
        max: item.max,
        message: '字符长度在' + item.min + '至' + item.max + '之间!',
        trigger: ['blur', 'change']
      });
    }
    if (item.type) {
      let type = item.type;
      switch (type) {
        case 'email':
          rules.push({type: 'email', message, trigger});
          break;
        default:
          rule.push({});
          break;
      }
    }
    return rules;
  }

  Vue.prototype.formatData = function (data) {
    let obj = {}
    if (Array.isArray(data)) {
      for (const val of data) {
        if (typeof val === 'string') {
          obj[val] = {
            type: val
          }
        } else {
          for (const key in val) {
            obj[key] = val[key]
          }
        }
      }
    } else if (Object.prototype.toString.call(data) === '[object Object]') {
      for (const key in val) {
        obj[key] = val[key]
      }
    } else if (typeof data === 'string') {
      obj[data] = {
        type: data
      }
    }
    let ret = {}
    let arr = []
    for (const key in obj) {
      ret[key] = dealRules(obj[key], this);
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
