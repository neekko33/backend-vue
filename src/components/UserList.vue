<template>
  <div style="position:relative;padding-top: 5%;">
    <el-button
      type="primary"
      size="large"
      style="position: absolute;top: 10px;right: 10px;"
      @click="createUser"
      >新增用户</el-button
    >
    <el-table :data="userList" border size="large" style="margin-bottom: 5%">
      <el-table-column
        label="ID"
        type="index"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tags"
        label="标签"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="danger" @click="deleteUser(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--      <el-pagination background layout="prev, pager, next" :total="1000">-->
    <!--      </el-pagination>-->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getUserList, deleteUser } from "../api/user";
import { UserData } from "../interface";

@Component
export default class List extends Vue {
  private userList: UserData[] = [];
  public created() {
    this.getUser();
  }
  public async getUser() {
    try {
      const {
        data: { data }
      } = await getUserList();
      this.userList = data;
    } catch (e) {
      console.log(e);
    }
  }
  public async deleteUser(id: string) {
    try {
      const {
        data: { code }
      } = await deleteUser(id);
      if (code === 0) {
        this.$notify.success({
          title: "成功",
          message: "删除成功"
        });
        this.getUser();
      }
    } catch (e) {
      this.$notify.error({
        title: "失败",
        message: "删除失败"
      });
      console.log(e);
    }
  }
  public async createUser() {
    this.$router.push({ name: "create" });
  }
}
</script>

<style scoped>
.el-dialog__body {
  padding: 0 20px;
}
</style>
