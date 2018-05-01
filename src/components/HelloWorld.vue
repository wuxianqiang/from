<template>
  <div>
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic" :rules="getRules">
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
      <el-form-item label="手机号:" prop="mobil">
          <el-input v-model="dynamicValidateForm.mobil"></el-input>
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
        mobil: "",
        name: ""
      },
      rules: {
        email: { required: true, type: "email" },
        name: { required: true, maxLength: 3},
        mobil: { required: true, type: "mobile" }
      }
    };
  },
  created() {},
  computed: {
    getRules () {
      var ret = {};
      for (var key in this.rules) {
        ret[key] = this.filter_rules(this.rules[key]);
      }
      return ret;
    }
  },
  methods: {
    submit(formName) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>