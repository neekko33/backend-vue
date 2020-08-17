<template>
  <el-container id="home">
    <el-aside width="auto">
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: { Menu, Header }
})
export default class Home extends Vue {
  public created() {
    const userInfo = window.localStorage.getItem("USER_INFO");
    if (!userInfo) {
      this.$notify.error({
        title: "错误",
        message: "登陆已过期，请重新登录"
      });
      this.$router.push({ name: "login" });
    }
  }
}
</script>
<style>
#home {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}

.el-avatar--circle {
  margin-top: 6px;
  cursor: pointer;
}

.el-breadcrumb {
  margin-top: 22px;
  font-size: 16px;
}
.el-header,
.el-footer {
  /*background-color: #b3c0d1;*/
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /*background-color: #d3dce6;*/
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 10px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
