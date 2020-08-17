<template>
  <el-form label-width="100px" label-position="right" style="width: 30%;">
    <el-form-item label="旧密码：" prop="pass">
      <el-input
        type="password"
        v-model="password.oldPassword"
        autocomplete="off"
        placeholder="请输入原始密码"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码：" prop="pass">
      <el-input
        type="password"
        v-model="password.newPassword"
        autocomplete="off"
        placeholder="请输入新密码"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码：" prop="checkPass">
      <el-input
        type="password"
        v-model="checkPassword"
        autocomplete="off"
        placeholder="请再次输入新密码"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item style="text-align: left;">
      <el-button type="primary" @click="handleClick">保存更改</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Passwords } from "@/interface";
import { updatePassword } from "@/api/user";

@Component
export default class Password extends Vue {
  private checkPassword = "";
  private password: Passwords = {
    oldPassword: "",
    newPassword: ""
  };
  public async handleClick() {
    if (this.checkPassword != this.password.newPassword) {
      this.$notify.error({
        title: "错误",
        message: "两次输入密码不一致，请重新输入"
      });
      return;
    }
    const id: string = JSON.parse(
      window.localStorage.getItem("USER_INFO") as string
    ).id;
    const {
      data: { code }
    } = await updatePassword(id, this.password);
    if (code != 0) {
      this.$notify.error({
        title: "错误",
        message: "密码输入错误，请重新输入"
      });
      return;
    }
    this.$notify.success({
      title: "成功",
      message: "密码修改成功，请重新登陆"
    });
    window.localStorage.removeItem("USER_INFO");
    await this.$router.push({ name: "login" });
  }
}
</script>

<style></style>
