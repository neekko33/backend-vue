<template>
  <el-card style="height: 99%;padding: 30px;box-sizing: border-box;">
    <router-view></router-view>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Setting extends Vue {}
</script>

<style scoped></style>
