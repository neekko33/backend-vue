<template>
  <div id="login">
    <el-card class="box-card">
      <div slot="header">
        <span class="title">联盟魔网后台管理系统</span>
      </div>
      <el-form label-width="60px" label-position="left">
        <el-form-item label="用户名:">
          <el-input v-model="username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="password" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="button" @click="checkLogin"
        >登陆</el-button
      >
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { login } from "@/api/user";

@Component
export default class Login extends Vue {
  private username = "";
  private password = "";
  // 登陆检查函数
  public async checkLogin() {
    const params = {
      username: this.username,
      password: this.password
    };
    try {
      const {
        data: { data, code }
      } = await login(params);
      if (code != 0) {
        throw new Error();
      }
      window.localStorage.setItem("USER_INFO", JSON.stringify(data));
      location.href = "/";
    } catch (e) {
      this.$notify.error({
        title: "错误",
        message: "用户名或密码错误，请重新登陆"
      });
      return;
    }
  }
}
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  padding-top: 10%;
  box-sizing: border-box;
}

.title {
  font-weight: bold;
  font-size: 20px;
}

.box-card {
  width: 23%;
  margin: 0 auto;
}

.button {
  margin-top: 10px;
  width: 70%;
  font-weight: bold;
}
</style>
