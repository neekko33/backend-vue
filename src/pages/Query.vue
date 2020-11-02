<template>
  <div id="app">
    <el-dialog title="更新数据" :visible.sync="dialogVisible" width="30%">
      <el-upload
        ref="file"
        class="upload-demo"
        :auto-upload="false"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleUpload"
        :multiple="false"
        :limit="1"
        :show-file-list="true"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-input
        v-model="endNum"
        placeholder="请输入表格总行数"
        style="width:360px;margin-top:10px;"
        clearable
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="container">
      <div class="container-item" style="text-align:left">
        <el-input
          v-if="radio === '手机查询'"
          v-model="query"
          placeholder="请输入手机号"
          clearable
          style="width:30%"
          @keyup.enter.native="search"
        ></el-input>
        <el-date-picker
          v-else
          v-model="selectedTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button
          type="primary"
          @click="search"
          :loading="loading"
          style="margin-left:1vw"
          >搜索</el-button
        >
      </div>
      <div class="container-item" style="text-align:right">
        <el-button type="warning" @click="dialogVisible = true"
          >更新数据</el-button
        >
      </div>
    </div>
    <Table :tableData="queryData" style="margin:30px 30px;height:60vh;" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StudentInfo } from "@/interface";
import Table from "@/components/Table.vue";
import { getStudentByNum, uploadFile } from "@/api/finance";
@Component({
  components: { Table }
})
export default class Query extends Vue {
  private selectedTime: Date[] = [];
  private radio = "手机查询";
  private searchByDate = false;
  private dialogVisible = false;
  private password = "";
  private isShow = false;
  private loading = false;
  private index = "result";
  private query = "";
  private queryData: StudentInfo[] = [];
  private file: File = new File([], "basedFile");
  private endNum = "";

  public async handleConfirm() {
    if (!this.file) {
      this.$notify({
        title: "警告",
        message: "上传文件不能为空",
        type: "warning"
      });
      return;
    }
    if (!this.endNum.trim() || parseInt(this.endNum).toString() === "NaN") {
      this.$notify({
        title: "警告",
        message: "表格行数格式不正确",
        type: "warning"
      });
      return;
    }
    const loading = this.$loading({
      lock: true,
      text: "更新中，请稍后...",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.7)"
    });
    // 上传文件
    const formData = new FormData();
    formData.append("file", this.file);
    const {
      data: { code }
    } = await uploadFile(formData, this.endNum);
    if (code !== 0) {
      this.$notify({
        title: "错误",
        message: "服务器错误！",
        type: "error"
      });
      return;
    }
    this.$notify({
      title: "成功",
      message: "数据更新成功",
      type: "success"
    });
    loading.close();
    this.queryData = [];
    this.query = "";
    this.handleCancel();
  }
  public handleCancel() {
    this.dialogVisible = false;
    this.file = new File([], "basedFile");
    this.endNum = "";
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handleUpload(file: any) {
    this.file = file.raw;
  }

  public async search() {
    if (!this.query.trim()) {
      this.$notify({
        title: "警告",
        message: "搜索内容不能为空",
        type: "warning"
      });
      return;
    }
    this.loading = true;
    const {
      data: { data, code }
    } = await getStudentByNum(this.query);
    this.index = "result";
    this.loading = false;
    if (code !== 0) {
      this.$notify({
        title: "错误",
        message: "服务器错误！",
        type: "error"
      });
      return;
    }
    this.queryData = data;
    this.query = "";
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  display: flex;
  padding: 0 30px;
  box-sizing: border-box;
}

.container-item {
  flex: 1;
}
</style>
