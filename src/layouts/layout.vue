<template>
  <el-container>
    <el-header>
      <header-component></header-component>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <aside-component></aside-component>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headerComponent from '@/components/header/header'
import asideComponent from '@/components/aside/aside'
export default {
  components: {
    headerComponent,
    asideComponent
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
  background-color: #E9EEF3;
  color: #333;
}
</style>