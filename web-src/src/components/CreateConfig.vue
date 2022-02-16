<template>
  <el-form ref="formRef" :model="form" label-width="60px">
    <el-form-item label="目录">
      <el-input v-model="form.dir" placeholder="选择开始目录">
        <template #append>
          <el-button @click="choose('dir', 'dir', '选择开始目录')">选择</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="执行器">
      <el-input v-model="form.exe" placeholder="选择或填写可执行文件路径">
        <template #append>
          <el-button @click="choose('exe', '执行文件|*.exe')">选择</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="脚本">
      <el-input v-model="form.script" placeholder="选择或填写脚本的路径">
        <template #append>
          <el-button @click="choose('script', '脚本文件|*.*')">选择</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="参数">
      <el-input v-model="form.params" type="textarea" placeholder="执行参数"></el-input>
    </el-form-item>
    <el-form-item label="命名">
      <el-input v-model="form.name" placeholder="起个名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="default" @click="store.save(form)">保存</el-button>
      <el-button type="primary" @click="store.exec(form)">保存并执行</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Ref, ref, watch } from 'vue'
import { useStore } from '../stores/cmd'

const store = useStore()
const form: Ref<CMD> = ref(Object.assign({}, store.current))

const { current } = storeToRefs(store)
watch(current, (val) => {
  form.value = Object.assign({}, val)
})

const choose = async (attr: string, type: string, label: string = '选择文件') => {
  const path = await aardio.file_choose(type, label)
  if (path) {
    form.value[attr] = path
  }
}
</script>
