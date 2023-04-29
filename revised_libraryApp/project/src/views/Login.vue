<template>
  <div class="login_wrap">
    <h1 class="title">Login</h1>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="userId" prop="userId">
        <el-input v-model="form.userId"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">login</el-button>
        <el-button type="danger" @click="onCancle">cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from '@/api/login'
export default {
  data () {
    return {
      form: {
        userId: '',
        password: ''
      },
      rules: {
        userId: [{ required: true, message: 'type useId', trigger: 'blur' }],
        password: [
          { required: true, message: 'type password', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const res = await login(this.form)
            if (res.result) {
              this.$store.commit('SET_USERINFO', res.data)
              window.localStorage.setItem('userInfo', JSON.stringify(res.data))
              this.$router.push({ path: '/' })
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('error submit!!')
        }
      })
    },
    onCancle () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less">
.login_wrap {
  text-align: center;
  margin: 0 auto;
  width: 520px;
  padding-top: 120px;
  .el-form-item__label {
    color: #fff !important;
    font-size: 18px;
  }
  label.el-form-item__label {
    color: #fff !important;
    font-size: 18px;
  }
  .title {
    font-size: 32px;
    margin-bottom: 20px;
  }
}
</style>
