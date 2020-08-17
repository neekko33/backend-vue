/* eslint-disable no-undef */
<template>
  <div class="main">
    <div class="upload" v-if="isCreate">
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
        <div class="el-upload__text">将头像拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <el-form
      :model="form"
      label-width="100px"
      label-position="right"
      style="width: 50%;"
    >
      <el-form-item label="用户名：">
        <el-input
          v-model="form.username"
          :disabled="!isCreate"
          :clearable="isCreate"
          autocomplete="off"
          placeholder="请输入用户名，注：该用户名用于后台系统的登陆"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码：" v-if="isCreate">
        <el-input
          v-model="password"
          type="password"
          clearable
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" v-if="isCreate">
        <el-input
          v-model="confirmPassword"
          type="password"
          clearable
          autocomplete="off"
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称：">
        <el-input
          v-model="form.nickname"
          clearable
          placeholder="请输入在作者页面显示的昵称，显示格式例：@neekko33"
        ></el-input>
      </el-form-item>
      <el-form-item label="标签：">
        <el-input v-model="form.tags" placeholder="请输入个性标签"></el-input>
      </el-form-item>
      <el-form-item label="地址：">
        <el-select label="地址：" v-model="city" style="width:calc(50% - 10px)">
          <el-option
            v-for="item in province"
            :key="item"
            :label="item"
            :value="item"
            >{{ item }}</el-option
          >
        </el-select>
        <el-input
          v-model="area"
          placeholder="请输入地区"
          style="width:50%;margin-left:10px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="个性签名：">
        <el-input
          v-model="form.introduce"
          type="textarea"
          :rows="6"
          placeholder="请输入个性签名"
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align: left;">
        <el-button type="primary" @click="Save" v-if="isCreate"
          >保存用户</el-button
        >
        <el-button type="primary" @click="Submit" v-else>保存更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserData, UploadFile } from "@/interface";
import { getUserById, updateUser, createUser } from "@/api/user";
import { uploadImage } from "@/api/article";
@Component
export default class Info extends Vue {
  private isCreate = false;
  private password = "";
  private confirmPassword = "";
  private file: File = new File([], "basedFile");
  private form: UserData = {
    id: JSON.parse(window.localStorage.getItem("USER_INFO") as string).id,
    username: "User",
    nickname: "",
    tags: "",
    address: "",
    introduce: ""
  };
  private city = "";
  private area = "";
  private province: string[] = [
    "北京市",
    "上海市",
    "天津市",
    "重庆市",
    "河北省",
    "山西省",
    "辽宁省",
    "吉林省",
    "河南省",
    "江苏省",
    "浙江省",
    "安徽省",
    "福建省",
    "江西省",
    "山东省",
    "湖北省",
    "湖南省",
    "广东省",
    "海南省",
    "四川省",
    "贵州省",
    "云南省",
    "陕西省",
    "甘肃省",
    "青海省",
    "黑龙江省",
    "内蒙古自治区",
    "广西壮族自治区",
    "西藏自治区",
    "宁夏回族自治区",
    "新疆维吾尔自治区",
    "台湾省",
    "香港特别行政区",
    "澳门特别行政区"
  ];
  public created() {
    this.isCreate = this.$route.name === "create";
    if (this.isCreate) return;
    this.GetUser();
  }
  public async GetUser() {
    const {
      data: { data, code }
    } = await getUserById(this.form.id as number);
    if (code != 0) {
      this.$notify.error({
        title: "错误",
        message: "获取用户信息失败"
      });
    }
    this.form = data;
    const map = this.form.address.split("/");
    this.city = map[0].trim();
    this.area = map[1].trim();
  }
  public Validate() {
    for (const key in this.form) {
      if (typeof this.form[key] == "number") {
        continue;
      }
      if (this.form[key].trim() == "") {
        console.log(key);
        this.$notify.error({
          title: "错误",
          message: "内容不能为空"
        });
        return false;
      }
    }
    return true;
  }
  public handleUpload(file: UploadFile) {
    this.file = file.raw;
  }
  public async Save() {
    delete this.form.id;
    this.form.address = `${this.city} / ${this.area}`;
    if (!this.Validate()) return;
    if (this.password !== this.confirmPassword) {
      this.$notify.error({
        title: "错误",
        message: "两次密码不相同，请重新输入"
      });
      return;
    }
    this.form.password = this.password;
    const formData = new FormData();
    formData.append("file", this.file);
    const {
      data: { data }
    } = await uploadImage(formData);
    this.form.avatar = data.path;
    const {
      data: { code }
    } = await createUser(this.form);
    if (code === 0) {
      this.$notify.success({
        title: "成功",
        message: "保存成功"
      });
      this.$router.push({ path: "/user/list" });
    } else {
      this.$notify.error({
        title: "错误",
        message: "保存失败"
      });
    }
  }
  public async Submit() {
    if (!this.Validate()) return;
    this.form.address = `${this.city} / ${this.area}`;
    await updateUser(this.form.id as number, this.form);
    this.$notify.success({
      title: "成功",
      message: "保存成功"
    });
    this.GetUser();
  }
}
</script>

<style>
.main {
  position: relative;
}

.main .upload {
  position: absolute;
  top: 0;
  left: calc(50% + 50px);
}
</style>
