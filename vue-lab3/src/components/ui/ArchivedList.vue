<script setup lang="ts">
import { defineAsyncComponent, provide } from 'vue'
import { useTaskManager } from '@/hooks/useTaskManager'
const TodoItem = defineAsyncComponent(() => import('@/components/ui/TodoItem.vue'))
const NoTodos = defineAsyncComponent(() => import('@/components/ui/NoTodos.vue'))

const { completedTodos, deleteTask } = useTaskManager()

provide('deleteTask', deleteTask)
</script>

<template>
  <div class="flex flex-col items-center">
    <h2 class="p-text-bold text-2xl pb-[12px]">⬇️ Archived Tasks ⬇️</h2>

    <div v-if="completedTodos.length === 0">
      <NoTodos />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="task in completedTodos" :key="task.id">
        <TodoItem :task="task" />
      </div>
    </div>
  </div>
</template>
