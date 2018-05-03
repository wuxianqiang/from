export default {
  name: {
    maxLength: 5,
    message: '用户名不能超过5个字符！',
    required: true
  },
  mobile: {
    message: '手机的格式不正确，请求重新输入！', // 输入错误时的提示信息
    validator: /^1[3|4|5|8][0-9]\d{4,8}$/ // 校验规则可以是正则也可以是函数，如果是正则表示输入的值和正则进行匹配，如果是函数，则可以自定义一些极端条件
  },
  email: {
    message: '格式不正确'
  }
}