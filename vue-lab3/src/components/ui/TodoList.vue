<script setup lang="ts">
import { defineAsyncComponent, provide } from 'vue'
import { useTaskManager } from '@/hooks/useTaskManager'
const TodoItem = defineAsyncComponent(() => import('@/components/ui/TodoItem.vue'))
const NoTodos = defineAsyncComponent(() => import('@/components/ui/NoTodos.vue'))

const { activeTodos, deleteTask, markAsCompleted } = useTaskManager()

provide('deleteTask', deleteTask)
provide('markAsCompleted', markAsCompleted)
</script>

<template>
  <div class="flex flex-col items-center">
    <h2 class="p-text-bold text-2xl pb-[12px]">⬇️ Active Tasks ⬇️</h2>

    <div v-if="activeTodos.length === 0">
      <NoTodos />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-[12px]">
      <div v-for="task in activeTodos" :key="task.id">
        <TodoItem :task="task" />
      </div>
    </div>
  </div>
</template>
