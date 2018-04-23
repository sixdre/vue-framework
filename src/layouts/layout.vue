<template>
  <el-container>
    <el-header>
      <header-component></header-component>
    </el-header>
    <el-container>
      <el-aside class="app-aside">
        <aside-component></aside-component>
      </el-aside>
      <el-main>
        <breadcrumb class="breadcrumb-container"></breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headerComponent from '@/components/header/header'
import asideComponent from '@/components/aside/aside'
import breadcrumb from '@/components/breadcrumb'
export default {
  components: {
    headerComponent,
    asideComponent,
    breadcrumb
  },


}
</script>

<style>
.el-header,
.el-footer {
  background-color: #B3C0D1;
  line-height: 60px;
}

.el-main {
  background-color: #fff;
  color: #333;
  padding: 10px;
}
.app-aside{
  max-width: 202px !important;
}
</style>