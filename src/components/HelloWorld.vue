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
          label="姓名:" 
          prop="name">
      <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobile">
          <el-input v-model="dynamicValidateForm.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">立即创建</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
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
        name: ""
      }
    };
  },
  computed: {
    // 必须传入和 type 值相等的元素，规则是根据传入的值进行校验的
    getRules () {
      return this.formatData(['email', 'mobile', {name: { required: false, maxLength: 5 }}])
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