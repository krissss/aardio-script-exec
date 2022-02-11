<script setup>
import CreateConfig from './components/CreateConfig.vue';
import AppMenu from './components/AppMenu.vue';
</script>

<template>
  <el-container class="layout">
    <el-aside width="200px">
      <app-menu/>
    </el-aside>
    <el-container class="container">
      <create-config/>
    </el-container>
  </el-container>
</template>

<style>
html, body, #app {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
.layout {
  height: 100%;
}
.container {
  padding: 20px;
}
</style>
