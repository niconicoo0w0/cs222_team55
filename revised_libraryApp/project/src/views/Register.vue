<template>
  <div class="register_wrap">
    <h1 class="title">Register</h1>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="userId" prop="userId">
        <el-input v-model="form.userId"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="username" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="role" prop="role">
        <el-radio-group v-model="form.role">
          <el-radio label="student" name="student"></el-radio>
          <el-radio label="admin" name="admin"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">confirm</el-button>
        <el-button type="danger" @click="onCancle">cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { register } from '@/api/login'
export default {
  data () {
    return {
      form: {
        userId: '',
        password: '',
        userName: '',
        role: 'student'
      },
      rules: {
        userId: [
          { required: true, message: 'please type userId', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'please type password', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: 'please type username', trigger: 'blur' }
        ],
        role: [
          { required: true, message: 'please select role', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const res = await register(this.form)
            if (res.result) {
              this.$router.push({ path: '/login' })
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
.register_wrap {
  text-align: center;
  margin: 0 auto;
  width: 520px;
  padding-top: 120px;
  .el-form-item__label {
    color: #fff !important;
    font-size: 18px;
  }
  .el-radio__label {
    color: #fff !important;
    font-size: 18px;
  }
  .title {
    font-size: 32px;
    margin-bottom: 20px;
  }
}
</style>
