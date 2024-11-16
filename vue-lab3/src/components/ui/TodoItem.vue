<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Todo } from '@/stores/todo'
import { formatDate } from '@/utils'
import TodoModal from '@/components/ui/TodoModal.vue'

const props = defineProps<{
  task: Todo
}>()

const isEditModalVisible = ref(false)
const isVisible = ref(true)

const deleteTask = inject('deleteTask') as (id: string) => void
const markAsCompleted = inject('markAsCompleted') as (id: string) => void

const getStatusClass = (status: string) => {
  return status === 'Active' ? 'text-green-600' : 'text-yellow-600'
}

const getPriorityClass = (priority: string) => {
  return priority === 'Low'
    ? 'text-green-600'
    : priority === 'Medium'
      ? 'text-yellow-600'
      : 'text-red-600'
}

const animation = ref('slide')

const handleMarkAsCompleted = () => {
  animation.value = 'rotate-scale'
  isVisible.value = false
  setTimeout(() => {
    markAsCompleted(props.task.id)
  }, 500)
}

const handleOpenEditModal = () => {
  animation.value = 'bounce'
  isVisible.value = false
  isEditModalVisible.value = true
  setTimeout(() => {
    isVisible.value = true
  }, 500)
}

const handleDelete = () => {
  animation.value = 'slide'
  isVisible.value = false
  setTimeout(() => {
    deleteTask(props.task.id)
  }, 500)
}
</script>

<template>
  <transition :name="animation">
    <Card class="w-full overflow-hidden" v-if="isVisible">
      <template #title>{{ task.title }}</template>
      <template #subtitle>
        <span :class="getStatusClass(task.status)">{{ task.status }}</span> -
        <span :class="getPriorityClass(task.priority)">{{ task.priority }}</span>
      </template>
      <template #content>
        <div class="grid grid-cols-2 gap-x-4 gap-y-2">
          <strong>Description:</strong>
          <span>{{ task.description || 'No description available.' }}</span>
          <strong>Created At:</strong> <span>{{ formatDate(task.createdAt) }}</span>
          <strong>Tags:</strong>
          <span v-if="task.tags.length">{{ task.tags.join(', ') }}</span>
          <span v-else>No tags</span>
          <strong>Deadline:</strong>
          <span>{{ task.deadline ? formatDate(task.deadline) : 'No deadline' }}</span>
          <strong v-if="task.status === 'Completed' && task.completedAt">Completed At:</strong>
          <span v-if="task.status === 'Completed' && task.completedAt">{{
            formatDate(task.completedAt)
          }}</span>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-4 justify-between mt-1">
          <Button icon="pi pi-trash" @click="handleDelete" severity="danger" class="w-full" />
          <Button
            v-if="task.status === 'Active'"
            icon="pi pi-pencil"
            @click="handleOpenEditModal()"
            severity="info"
            class="w-full"
          />
          <Button
            v-if="task.status === 'Active'"
            icon="pi pi-check"
            severity="success"
            @click="handleMarkAsCompleted"
            class="p-button-success w-full"
          />
        </div>
      </template>
    </Card>
  </transition>
  <TodoModal v-model:visible="isEditModalVisible" is-edit :todo="props.task" />
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-enter-from {
  opacity: 1;
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(1000px);
}

.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.5s ease-in-out;
}
.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.5s ease-in-out;
}

.bounce-enter-from {
  animation: bounceIn 0.5s forwards;
}

.bounce-leave-to {
  animation: bounceOut 0.5s forwards;
}

@keyframes bounceIn {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.rotate-scale-enter-active,
.rotate-scale-leave-active {
  transition: all 0.5s ease-in-out;
}

.rotate-scale-leave-to {
  animation: rotateScaleOut 0.5s forwards;
}

@keyframes rotateScaleOut {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(0.5) rotate(90deg);
    opacity: 0.5;
  }
  100% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
}
</style>
