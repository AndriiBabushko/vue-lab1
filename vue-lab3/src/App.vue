<script setup lang="ts">
import { markRaw, ref } from 'vue'
import TodoList from './components/ui/TodoList.vue'
import ArchivedList from './components/ui/ArchivedList.vue'
import TodoModal from '@/components/ui/TodoModal.vue'

const currentView = ref(markRaw(TodoList))
const isAddModalVisible = ref(false)
</script>

<template>
  <div id="app">
    <div class="flex flex-row justify-between py-[24px] px-[12px]">
      <div class="flex flex-row gap-[16px]">
        <Button class="!px-0" link @click="currentView = markRaw(TodoList)" label="Todo Tasks" />
        <Button
          class="!px-0"
          link
          @click="currentView = markRaw(ArchivedList)"
          label="Archived Tasks"
        />
      </div>

      <Button icon="pi pi-plus" @click="isAddModalVisible = true" class="p-button-success" />
      <TodoModal v-model:visible="isAddModalVisible" />
    </div>
    <KeepAlive>
      <component :is="currentView" />
    </KeepAlive>
  </div>
</template>
