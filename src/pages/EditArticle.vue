<template>
  <div style="height: 100%;">
    <mavon-editor
      v-model="form.content"
      ref="md"
      @imgAdd="$imgAdd"
      @save="handleSave"
      style="height: 100%;"
    />
    <el-drawer
      title="保存文章选项（必填）"
      :visible.sync="drawer"
      direction="rtl"
      size="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="form"
        label-width="120px"
        style="margin-right: 50px;margin-top: 50px;"
      >
        <el-form-item label="文章标题：">
          <el-input
            v-model="form.title"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章类型：">
          <el-select v-model="form.typeId" style="width: 100%">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-date-picker
            style="width: 100%"
            v-model="form.addTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="文章简介：">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入文章简介"
            v-model="form.introduce"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%;margin-top: 10px;"
            @click="handleAddBtn"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  addArticle,
  getArticleById,
  updateArticle,
  uploadImage
} from "../api/article";
import { ArticleData, TypeData } from "@/interface";
import { getTypeList } from "@/api/type";
import moment from "moment";
@Component
export default class EditArticle extends Vue {
  private form: ArticleData = {
    id: 0,
    title: "",
    content: "",
    introduce: "",
    addTime: new Date().getTime(),
    typeId: 12,
    userId: Number(
      JSON.parse(window.localStorage.getItem("USER_INFO") as string).id
    )
  };
  private typeList: TypeData[] = [];
  private value = "";
  private drawer = false;
  public created() {
    this.getType();
    if (this.$route.name === "update") {
      const id = this.$route.params.id;
      this.getArticle(id);
    }
  }
  public async getType() {
    try {
      const {
        data: { data }
      } = await getTypeList();
      this.typeList = data;
    } catch (e) {
      console.log(e);
    }
  }
  public async getArticle(id: string) {
    try {
      const {
        data: { data }
      } = await getArticleById(Number(id));
      this.form = data;
      this.form.addTime = Number(data.addTime);
    } catch (e) {
      console.log(e);
    }
  }
  public async $imgAdd(filename: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const {
      data: { code, data }
    } = await uploadImage(formData);
    if (code === 0) {
      this.$notify.success({
        title: "成功",
        message: "图片上传成功"
      });
      const url = data.path;
      const ref: any = this.$refs.md;
      ref.$img2Url(filename, url);
    } else {
      this.$notify.error({
        title: "失败",
        message: "图片上传失败"
      });
    }
  }
  public handleSave() {
    this.drawer = true;
  }
  public handleClose() {
    this.drawer = false;
  }
  public async handleAddBtn() {
    if (
      this.form.title === "" ||
      this.form.content === "" ||
      this.form.introduce === ""
    ) {
      this.$notify.warning({
        title: "警告",
        message: "内容不能为空"
      });
      return;
    }
    this.form.addTime = moment(this.form.addTime).valueOf();
    if (this.$route.name == "add") {
      const {
        data: { code }
      } = await addArticle(this.form);
      if (code === 0) {
        this.$notify.success({
          title: "成功",
          message: "保存成功"
        });
        await this.$router.push({ name: "list" });
      } else {
        this.$notify.error({
          title: "失败",
          message: "保存失败"
        });
      }
    } else {
      const {
        data: { code }
      } = await updateArticle(this.form.id as number, this.form);
      if (code === 0) {
        this.$notify.success({
          title: "成功",
          message: "保存成功"
        });
        await this.$router.push({ name: "list" });
      } else {
        this.$notify.error({
          title: "失败",
          message: "保存失败"
        });
      }
    }
  }
}
</script>

<style scoped></style>
