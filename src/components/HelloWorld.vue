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
        prop="typeName"
        label="分类名称">
        <el-input v-model="dynamicValidateForm.typeName"></el-input>
      </el-form-item>
      <el-form-item label="写备注" prop="remark">
        <el-input type="textarea" v-model="dynamicValidateForm.remark"></el-input>
      </el-form-item>
      <el-form-item
        prop="sortKey"
        label="排序值">
        <el-input v-model="dynamicValidateForm.sortKey" :maxlength="ml.sortKey"></el-input>
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
        age: "",
        typeName: "",
        remark: "",
        sortKey: ""
      },
      ml: {}
    };
  },
  computed: {
    // 必须传入和 type na
    getRules () {
      let {ret, MObj} = this.formatData(['email', 'mobile', 'typeName', 'remark', 'sortKey'])
      this.ml = MObj
      return ret
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