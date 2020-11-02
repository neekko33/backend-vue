<template>
  <el-table
    v-if="hasHeight"
    :data="tableData"
    border
    stripe
    style="width: 100%;text-align:center;overflow: -moz-scrollbars-none; "
    :max-height="height"
  >
    <el-table-column
      type="index"
      label="序号"
      width="50"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="signUpTime"
      label="报名日期"
      align="center"
      width="120"
    >
    </el-table-column>
    <el-table-column prop="consultant" label="咨询师" align="center">
    </el-table-column>
    <el-table-column prop="consultingAssistant" label="咨询助理" align="center">
    </el-table-column>
    <el-table-column prop="enterTime" label="入学日期" align="center">
    </el-table-column>
    <el-table-column prop="enterClass" label="入班班级" align="center">
    </el-table-column>
    <el-table-column prop="hasUpdate" label="证书" align="center" width="50">
    </el-table-column>
    <el-table-column
      prop="studentName"
      label="学员姓名"
      align="center"
      width="80"
    >
    </el-table-column>
    <el-table-column prop="phoneNum" label="手机号" align="center" width="120">
    </el-table-column>
    <el-table-column prop="idCard" label="身份证号" align="center" width="170">
    </el-table-column>
    <el-table-column
      prop="lessonName"
      label="报名专业"
      align="center"
      width="150"
    >
    </el-table-column>
    <el-table-column prop="specialComment" label="特殊备注" align="center">
    </el-table-column>
    <el-table-column prop="majorCost" label="专业学费" align="center">
    </el-table-column>
    <el-table-column prop="beforeCost" label="以前学费" align="center">
    </el-table-column>
    <el-table-column prop="discount" label="优惠金额" align="center">
    </el-table-column>
    <el-table-column prop="cost" label="缴费" align="center"></el-table-column>
    <el-table-column prop="payment" label="支付方式" align="center">
    </el-table-column>
    <el-table-column prop="arrears" label="欠费" align="center">
    </el-table-column>
    <el-table-column prop="receiptNum" label="收据号码" align="center">
    </el-table-column>
    <el-table-column prop="addCost" label="补费" align="center">
    </el-table-column>
    <el-table-column prop="addPayment" label="支付方式" align="center">
    </el-table-column>
    <el-table-column prop="addReceiptNum" label="收据号码" align="center">
    </el-table-column>
    <el-table-column prop="addTime" label="补费日期" align="center">
    </el-table-column>
    <el-table-column prop="addTeacher" label="补费老师" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center" fixed="right" width="100">
      <template slot-scope="{ row }">
        <el-tooltip
          class="item"
          effect="dark"
          content="请提前打开录入页面并确保油猴脚本正常运行"
          placement="top"
        >
          <el-button
            @click="handleClick($event, row.id)"
            size="mini"
            type="primary"
            >复制</el-button
          >
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { StudentInfo } from "@/interface";
import { addTemporary } from "@/api/finance";
@Component
export default class Table extends Vue {
  @Prop()
  tableData: StudentInfo[] | undefined;

  private height = 0;
  private hasHeight = false;
  private webSocket: false | WebSocket | null = null;

  public mounted() {
    this.height = window.innerHeight * 0.6;
    this.hasHeight = true;
    // 备案完成前停用 websocket 传送数据
    // this.$nextTick(() => {
    //   // 判断浏览器是否支持websocket
    //   const CreateWebSocket = (function() {
    //     return function(urlValue: string) {
    //       if (window.WebSocket) return new WebSocket(urlValue);
    //       return false;
    //     };
    //   })();
    //   // 创建一个websocket
    //   this.webSocket = CreateWebSocket(
    //     "ws://212.64.78.155:7003/websocket"
    //   ) as WebSocket;

    //   // 监听websocket通讯
    //   this.webSocket.onmessage = function(evt) {
    //     // 这是服务端返回的数据
    //     console.log(evt.data);
    //   };

    //   // 监听连接关闭
    //   this.webSocket.onclose = function() {
    //     console.log("Connection closed.");
    //   };
    // });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async handleClick(e: any, id: number) {
    console.log(e);
    const ele = e.target.nodeName === "SPAN" ? e.target.parentNode : e.target;
    ele.classList.remove("el-button--primary");
    ele.classList.add("el-button--danger");
    ele.childNodes[2].innerText = "已复制";
    // 备案完成前停用 websocket 传送数据
    // if (this.tableData && this.webSocket) {
    //   const stuInfo = this.tableData.find((item) => item.id === id);
    //   this.webSocket.send(JSON.stringify(stuInfo));
    //   this.$notify({
    //     title: '成功',
    //     message: '复制成功，请到录入页面一键导入',
    //     type: 'success',
    //   });
    // }
    if (this.tableData) {
      const stuInfo = JSON.parse(
        JSON.stringify(this.tableData.find(item => item.id === id))
      ) as StudentInfo;
      // eslint-disable-next-line @typescript-eslint/camelcase
      const {
        data: { code }
      } = await addTemporary(stuInfo);
      if (code === 0) {
        this.$notify({
          title: "成功",
          message: "复制成功，请到录入页面一键导入",
          type: "success"
        });
      } else {
        this.$notify({
          title: "失败",
          message: "复制失败，请重试",
          type: "warning"
        });
      }
    }
  }
}
</script>

<style>
.el-table__body-wrapper::-webkit-scrollbar {
  width: 0 !important;
}

.el-table__fixed-right {
  bottom: 0;
}
</style>
