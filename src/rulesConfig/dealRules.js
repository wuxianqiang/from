import {validateMoneyNumber, qq, mobile, regexn, integer} from './defineRules'
/* 保留两位小数 */
const isvalidateMoney = (rule, value, callback) => {
  if (value != null && value != "") {
    if (!validateMoneyNumber(value)) {
      callback(new Error('请输入正确的数字，最多保留两位小数!'));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/* 验证QQ号码 */
const isvalidateQQ = (rule, value, callback) => {
  if (value != null && value != "") {
    if (!qq(value)) {
      callback(new Error('您输入的QQ号不正确!'));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/* 验证手机号 */
const isvalidateMobile = (rule, value, callback) => {
  if (value != null && value != "") {
    if (!mobile(value)) {
      callback(new Error('您输入的手机号不正确!'));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/* 含有非法字符(只能输入字母、汉字) */
const isvalidateRegexn = (rule, value, callback) => {
  if (value != null && value != "") {
    if (!regexn(value)) {
      callback(new Error('含有非法字符(只能输入字母、汉字)!'));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/* 请输入正整数 */
const isvalidateInteger = (rule, value, callback) => {
  if (value != null && value != "") {
    if (!integer(value)) {
      callback(new Error('请输入正整数!'));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * 处理 rules 规则，带默认参数
 * 
 * @export
 * @param {object} item 传入对象作为参数
 * @returns 返回每个字段的规则
 */

export default function dealRules(item, vm) {
  let rules = [];
  let {
    required = true,
    trigger = [
      'blur', 'change'
    ],
    message = '格式不正确！'
  } = item
  if (required) {
    rules.push({required: true, message: '该输入项为必填项!', trigger: ['blur', 'change']});
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
      case 'qq':
        rules.push({validator: isvalidateQQ, trigger});
        break;
      case 'mobile':
        rules.push({validator: isvalidateMobile, trigger});
        break;
      case 'regexn':
        rules.push({validator: isvalidateRegexn, trigger});
        break;
      case 'integer':
        rules.push({validator: isvalidateInteger, trigger});
        break;
      default:
        rule.push({});
        break;
    }
  }
  return rules;
};