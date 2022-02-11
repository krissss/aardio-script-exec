<template>
  <div v-if="store.isExec">
    <div v-if="store.name !== store.cmd">{{ store.name }}</div>
    <div>{{ store.cmd }}</div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../stores/cmd'

const store = useStore()
const { isExec } = storeToRefs(store)
</script>
