let oo = {name: 'wuxianqiang'}

var proxy = new Proxy(oo, {
  get: function(target, property) {
    if (property in target) return target[property]
    throw new Error('Attribute does not exist: ' + property)
  }
});

let obj = Object.create(proxy);
console.log(obj.age)