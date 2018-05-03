<template>
  <div>
    <el-form :model="dynamicValidateForm" 
             ref="dynamicValidateForm" 
             label-width="100px" 
             class="demo-dynamic" 
             :rules="getRules">
      <el-form-item
        prop="email"
        label="邮箱">
        <el-input v-model="dynamicValidateForm.email"></el-input>
      </el-form-item>
      <el-form-item
        prop="mobile"
        label="手机号">
        <el-input v-model="dynamicValidateForm.mobile"></el-input>
      </el-form-item>
      <el-form-item
        prop="name"
        label="用户名">
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        email: "",
        mobile: "",
        name: "",
        age: ""
      },
      ml: []
    };
  },
  computed: {
    // 必须传入和 type na
    getRules () {
      let ret = this.formatData(['email', 'mobile', 'name'])
      this.ml = ret[1]
      return ret[0]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          console.log(this.dynamicValidateForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>