<template>
  <div>
    <!-- <div>{{aaa}}</div> -->
    <el-form :model="dynamicValidateForm" ref="ruleForm" label-width="100px" class="demo-dynamic" :rules="getRules(rules)">
      <el-form-item
        prop="email"
        label="邮箱"
      >
      <el-input v-model="dynamicValidateForm.email"></el-input>
    </el-form-item>
    <el-form-item 
        label="姓名:" 
        prop="name" 
        :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
    <el-input v-model="dynamicValidateForm.name"></el-input>
    </el-form-item>
    <el-form-item label="手机号:" prop="mobil">
        <el-input v-model="dynamicValidateForm.mobil"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit"> Submit </el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dynamicValidateForm: {
          email: '',
          mobil: '',
          name: ''
        },
        rules: {
          'mobil':{required:true, type:'mobile'}
        }
      }
    },
    created () {
    },
    methods: {
      submit(formName) {
      },
      getRules (rules) {
        var ret = {}
        for(var key in rules) {
          ret[key] = this.filter_rules(rules[key]);
        }
        return ret;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
