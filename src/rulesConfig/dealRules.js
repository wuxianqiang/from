export default {
  name: {maxLength: 5},
  mobile: {
    message: '手机的格式不正确，请求重新输入！', // 输入错误时的提示信息
    validator: /^1[3|4|5|8][0-9]\d{4,8}$/ // 校验规则可以是正则也可以是函数
  }
}