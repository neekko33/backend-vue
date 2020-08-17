<template>
  <el-card
    style="height: 99%;padding: 30px;box-sizing: border-box;overflow: auto;"
  >
    <div style="position:relative;padding-top: 5%;">
      <el-button
        type="primary"
        size="large"
        style="position: absolute;top: 10px;right: 10px;"
        @click="handleAddBtn"
        >新增文章</el-button
      >
      <el-table
        :data="articleList"
        border
        size="large"
        style="margin-bottom: 3%"
      >
        <el-table-column
          label="ID"
          type="index"
          :index="indexMethod"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column label="作者" align="center" width="120">
          <template slot-scope="{ row }">
            {{ row.user.username }}
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" width="120">
          <template slot-scope="{ row }">
            {{ row.type.typeName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center"
        ></el-table-column>
        <el-table-column label="创建时间" align="center" width="180">
          <template slot-scope="{ row }">
            {{ formatTime(Number(row.addTime)) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="{ row }">
            <el-button type="primary" @click="handleEditBtn(row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="handleDelBtn(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleChange"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getArticleList, deleteArticle } from "../api/article";
import { ArticleListData } from "../interface";
import moment from "moment";

@Component
export default class ArticleList extends Vue {
  private articleList: ArticleListData[] = [];
  private total = 0;
  private pageSize = 5;
  private currentPage = 1;
  public created() {
    this.getArticle(this.currentPage, this.pageSize);
  }
  public indexMethod(index: number) {
    return index + 1 + (this.currentPage - 1) * this.pageSize;
  }
  public formatTime(time: number) {
    return moment(Number(time)).format("YYYY-MM-DD");
  }
  public handleChange(page: number) {
    this.currentPage = page;
    this.getArticle(this.currentPage, this.pageSize);
  }
  public async getArticle(pageNum: number, pageSize: number) {
    try {
      const {
        data: {
          data: { articles, count }
        }
      } = await getArticleList(pageNum, pageSize);
      this.articleList = articles;
      this.total = count;
    } catch (e) {
      console.log(e);
    }
  }
  public handleEditBtn(row: ArticleListData) {
    this.$router.push({ name: "update", params: { id: row.id.toString() } });
  }
  public handleAddBtn() {
    this.$router.push({ name: "add" });
  }
  public handleDelBtn(row: ArticleListData) {
    this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        try {
          const {
            data: { code }
          } = await deleteArticle(row.id as number);
          if (code === 0) {
            this.$notify.success({
              title: "成功",
              message: "删除成功"
            });
          }
          await this.getArticle(this.currentPage, this.pageSize);
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
