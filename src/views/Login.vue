<template>
  <div id="login">
    <div class="shadow">
      <el-card class="box-card">
        <div slot="header">
          <span class="title">联盟魔网后台管理系统</span>
        </div>
        <el-form autocomplete="off">
          <el-form-item>
            <el-input v-model="username" placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="password"
              autocomplete="new-password"
              placeholder="Password"
              :suffix-icon="passwordIcon"
              @keyup.enter.native="checkLogin"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- <el-button type="primary" class="button" @click="checkLogin"
        >登陆</el-button
      > -->
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { login } from "@/api/user";

@Component
export default class Login extends Vue {
  private username = "";
  private password = "";
  private passwordIcon = "el-icon-arrow-right";

  // 登陆检查函数
  public async checkLogin() {
    this.passwordIcon = "el-icon-loading";
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
      this.passwordIcon = "el-icon-arrow-right";
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
  box-sizing: border-box;
  background: url("../assets/background.png");
  background-size: cover;
}

.title {
  font-weight: bold;
  font-size: 20px;
}

.shadow {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.06);
  padding-top: 15%;
  box-sizing: border-box;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
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
