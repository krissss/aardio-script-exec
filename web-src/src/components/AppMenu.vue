<template>
  <div class="title">记录</div>
  <ul class="list">
    <li v-for="(item, index) in store.history" :key="index" class="list-item">
      <el-link type="primary" @click="store.useHistory(index)" class="item-name" :title="item.name">{{ item.name }}</el-link>
      <el-button @click="store.delHistory(index)" type="danger" :icon="Delete" size="small"></el-button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '../stores/cmd'
import { Delete } from '@element-plus/icons-vue'

const store = useStore()

onMounted(() => {
  store.loadHistory()
})

</script>

<style scoped>
.title {
  text-align: center;
  margin-top: 20px;
}
.list {
  padding: 0 20px;
}
.list-item {
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  font-size: 14px;
}
.item-name {
  display: block;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
