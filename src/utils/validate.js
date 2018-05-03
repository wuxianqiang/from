/**
 * 处理传参问题的函数
 * @param {Object} options 该参数是配置选项
 * @returns 返回处理好的规则
 */
function dealValidate(options) {
  let obj = {}
  for (const key in options) {
    let val = options[key]
    for (const k in val) {
      if (k === 'validator') {
        let v = val[k]
        // 处理 validator 是正则的情况，默认会把输入的值和正则进行匹配
        if (Object.prototype.toString.call(v) === '[object RegExp]') {
          obj[key] = init(v, val.message)
        }
        // 处理 validator 是函数的情况，一般自定义函数可以处理一些极端条件
        else if (Object.prototype.toString.call(v) === '[object Function]') {
          obj[key] = val[k]
        }
        // 如果 validator 是其他情况，则表示可以输入任意字符
        else {
          obj[key] = init(/.+/, val.message)
        }
      }
    }
  }
  return obj
}

/**
 * 正则作为校验规则
 * @param {RegExp} reg 传入正则作为自定义规则
 * @param {String} msg 传入输入错误时的提示信息
 * @returns 返回处理函数
 */
function init(reg, msg) {
  return (rule, value, callback) => {
    if (value !== '') {
      if (!reg.test(value)) {
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
  let optionsArr = Object.keys(options) // 所有的配置key值
  let validateObj = dealValidate(options) // 所有的自定义处理函数
  
  function dealRules(item) {
    let rules = [];
    let {
      required,
      trigger = [
        'blur', 'change'
      ],
      message
    } = item
    let hasRequired = item.maxLength || (item.type && options[item.type] && options[item.type].required)
    let hasMessage = message || (item.type && options[item.type] && options[item.type].message) || '输入格式不正确！'
    if (hasRequired) {
      rules.push({
        required: true,
        message: Array.isArray(hasMessage) ? (hasMessage.length > 1 ? hasMessage[1] : '') : '',
        trigger: ['blur', 'change']
      });
    }
    // 数据都在配置文件里面，如果vue文件里面还有配置文件该怎么处理
    let hasMaxLength = item.maxLength || (item.type && options[item.type] && options[item.type].maxLength)
    if (hasMaxLength) {
      const ML = options[item.type].maxLength
      rules.push({
        min: 1,
        max: ML,
        message: options[item.type].message ? options[item.type].message : '最多输入' + ML + '个字符!',
        trigger: options[item.type].trigger ? options[item.type].message : ['blur', 'change']
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
      let hasType = optionsArr.includes(type)
      if (hasType) {
        // 使用自定义校验规则
        for (const key in validateObj) {
          if (key === type) {
            rules.push({validator: validateObj[key], trigger, message: Array.isArray(hasMessage) ? (hasMessage.length > 1 ? hasMessage[0] : '') : ''});
          }
        }
      } else {
        // 使用默认的校验规则
        rules.push({type, message: hasMessage, trigger});
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
    for (const key in obj) {
      ret[key] = dealRules(obj[key], this);
    }
    let MObj =  {}
    // for (const key in ret) {
    //   let tarObj = ret[key].find(item => 'max' in item)
    //   if (tarObj) {
    //     MObj[key] = tarObj.max
    //   }
    // }
    // var proxy = new Proxy(MObj, {
    //   get: function(target, property) {
    //     if (property in target) return target[property]
    //     throw new Error('Attribute does not exist: ' + property)
    //   }
    // });

    // let mlx = Object.create(proxy);
    return {ret, MObj}
  }
}

// TODO：默认的校验还不可以自定义信息
