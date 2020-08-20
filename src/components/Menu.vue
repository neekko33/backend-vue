<template>
  <div id="menu">
    <div class="menu_head" v-show="!isCollapse">
      MWWOW
    </div>
    <div class="menu_head" v-show="isCollapse">
      M
    </div>
    <el-menu
      :default-active="
        $route.path.startsWith('/setting')
          ? $route.path.split('/')[2]
          : $route.path.split('/')[1]
      "
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <router-link :to="{ name: 'dashboard' }">
        <el-menu-item index="dashboard">
          <i class="el-icon-odometer"></i>
          <span slot="title">后台管理</span>
        </el-menu-item>
      </router-link>
      <router-link :to="{ name: 'type' }">
        <el-menu-item index="type">
          <i class="el-icon-collection-tag"></i>
          <span slot="title">类型管理</span>
        </el-menu-item>
      </router-link>
      <router-link :to="{ name: 'article' }">
        <el-menu-item index="article">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
      </router-link>
      <!-- <router-link :to="{ name: 'message' }">
        <el-menu-item index="message">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">留言管理</span>
        </el-menu-item>
      </router-link> -->
      <router-link :to="{ name: 'user' }">
        <el-menu-item index="user">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </router-link>
      <el-submenu index="fiannce" :disabled="!isAdmin">
        <template slot="title">
          <i class="el-icon-coin"></i>
          <span slot="title">财务管理</span>
        </template>
        <router-link :to="{ name: 'query' }">
          <el-menu-item index="query">
            <span slot="title">信息查询</span>
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="setting">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </template>
        <router-link :to="{ name: 'info' }">
          <el-menu-item index="info">
            <span slot="title">个人信息</span>
          </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'password' }">
          <el-menu-item index="password">
            <span slot="title">修改密码</span>
          </el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style>
#menu {
  overflow: hidden;
  height: 100%;
  /*font-weight: bold;*/
  font-size: 1.7rem;
  color: #ffffff;
}
.menu_head {
  width: 100%;
  height: 60px;
  background-color: #409eff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Menu extends Vue {
  private isAdmin = false;
  public get isCollapse(): boolean {
    return this.$store.state.menu.isCollapse;
  }
  public created() {
    const user = window.localStorage.getItem("USER_INFO");
    if (user) {
      this.isAdmin =
        parseInt(JSON.parse(user).id) === 1 ||
        parseInt(JSON.parse(user).id) === 9;
    }
  }
}
</script>
