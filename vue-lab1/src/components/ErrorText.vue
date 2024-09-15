<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  message: string
}>()
</script>

<template>
  <p class="text-red-500 text-sm mt-1">{{ message }}</p>
</template>

<style scoped></style>
