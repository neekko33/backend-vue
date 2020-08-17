<template>
  <el-card style="height: 99%;padding: 30px;box-sizing: border-box;">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="centerDialogVisible"
      width="30%"
    >
      <el-form label-width="80px">
        <el-form-item label="标签名称:">
          <el-input v-model="typeName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmBtn">确 定</el-button>
      </span>
    </el-dialog>
    <div style="position:relative;padding-top: 5%;">
      <el-button
        type="primary"
        size="large"
        style="position: absolute;top: 10px;right: 10px;"
        @click="handleAddBtn"
        >新增类型</el-button
      >
      <el-table :data="typeList" border size="large" style="margin-bottom: 5%">
        <el-table-column
          label="ID"
          type="index"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="typeName"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" @click="handleEditBtn(row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="handleDelBtn(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      <el-pagination background layout="prev, pager, next" :total="1000">-->
      <!--      </el-pagination>-->
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getTypeList, deleteType, addType, updateType } from "../api/type";
import { TypeData } from "../interface";

@Component
export default class Type extends Vue {
  private dialogTitle = "新增类型";
  private centerDialogVisible = false;
  private typeList: TypeData[] = [];
  private typeName = "";
  private typeId = 0;
  public created() {
    this.getType();
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
  public handleAddBtn() {
    this.dialogTitle = "新增类型";
    this.typeName = "";
    this.centerDialogVisible = true;
  }
  public async handleConfirmBtn() {
    if (this.typeName === "") {
      this.$notify.warning({
        title: "警告",
        message: "类型不能为空"
      });
    }
    this.centerDialogVisible = false;
    if (this.dialogTitle === "新增类型") {
      try {
        const {
          data: { code }
        } = await addType({ typeName: this.typeName });
        if (code === 0) {
          this.$notify.success({
            title: "成功",
            message: "添加成功"
          });
        }
        await this.getType();
      } catch (e) {
        this.$notify.error({
          title: "失败",
          message: "添加失败"
        });
        console.log(e);
      }
    } else {
      try {
        const {
          data: { code }
        } = await updateType(this.typeId, { typeName: this.typeName });
        if (code === 0) {
          this.$notify.success({
            title: "成功",
            message: "修改成功"
          });
        }
        await this.getType();
      } catch (e) {
        this.$notify.error({
          title: "失败",
          message: "修改失败"
        });
        console.log(e);
      }
    }
  }
  public handleEditBtn(row: TypeData) {
    this.dialogTitle = "修改类型";
    this.typeName = row.typeName;
    this.typeId = row.id as number;
    this.centerDialogVisible = true;
  }
  public handleDelBtn(row: TypeData) {
    this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        try {
          const {
            data: { code }
          } = await deleteType(row.id as number);
          if (code === 0) {
            this.$notify.success({
              title: "成功",
              message: "删除成功"
            });
          }
          await this.getType();
        } catch (e) {
          this.$notify.error({
            title: "失败",
            message: "删除失败"
          });
          console.log(e);
        }
      })
      .catch(() => {
        this.$notify.info({
          title: "提示",
          message: "取消删除"
        });
      });
  }
}
</script>

<style scoped>
.el-dialog__body {
  padding: 0 20px;
}
</style>
