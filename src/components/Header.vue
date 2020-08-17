<template>
  <div id="header">
    <el-row :gutter="20" style="height: 100%;width: 100%">
      <el-col :span="1" style="height: 100%;font-size: 20px;line-height: 60px;">
        <i
          class="el-icon-s-fold"
          style="cursor:pointer"
          v-if="!isCollapse"
          @click="handleClick"
        ></i>
        <i
          class="el-icon-s-unfold"
          style="cursor:pointer"
          v-else
          @click="handleClick"
        ></i>
      </el-col>
      <el-col :span="16" style="height: 100%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        :span="7"
        style="height: 100%;text-align: right;line-height: 60px;"
      >
        <div style="position: absolute;right: 70px;font-weight: bold">
          {{ username }}
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
          <el-avatar :src="userImg"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item divided command="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Header extends Vue {
  private userImg: string = JSON.parse(
    window.localStorage.getItem("USER_INFO") as string
  ).avatar;
  private username = "";
  public get isCollapse(): boolean {
    return this.$store.state.menu.isCollapse;
  }

  public created() {
    this.username = JSON.parse(
      window.localStorage.getItem("USER_INFO") as string
    ).username;
  }
  public handleCommand(command: string) {
    if (command === "logout") {
      window.localStorage.removeItem("USER_INFO");
      location.href = "/login";
    }
  }
  public handleClick() {
    this.$store.dispatch("changeCollapse");
  }
}
</script>

<style scoped>
#header {
  height: 100%;
  width: 100%;
}
</style>
