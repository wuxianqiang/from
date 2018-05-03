export default {
  name: {
    maxLength: 5,
    message: ['用户名不能超过5个字符！', '用户名称是必填选项'], // 必须是个数组，而且不填时的提示信息写在后面，默认提示是：该项为必填项
    required: true
  },
  mobile: {
    message: ['手机的格式不正确，请求重新输入！', '手机号是必填选项'], // 输入错误时的提示信息
    validator: /^1[3|4|5|8][0-9]\d{4,8}$/, // 校验规则可以是正则也可以是函数，如果是正则表示输入的值和正则进行匹配，如果是函数，则可以自定义一些极端条件
    required: true
  },
  // 写在这里的配置都是自定义的，不写的话会调用默认的规则江西校验
  age: {
    maxLength: 3,
    message: ['用户名不能超过5个字符！'],
    required: true
  },
  typeName: {
    required: true,
    message: ['分类名称长度不能超过50', '分类名称不能为空'],
    maxLength: 50
  },
  remark: {
    maxLength: 200,
    message: ['备注不能超过200']
  }
}