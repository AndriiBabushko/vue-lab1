import { defineStore } from 'pinia'
import { ref } from 'vue'

export type TodoPriority = 'Low' | 'Medium' | 'High'
export type TodoStatus = 'Active' | 'Completed'

export interface Todo {
  id: string
  title: string
  description?: string
  status: TodoStatus
  createdAt: Date
  completedAt?: Date
  priority: TodoPriority
  tags: string[]
  deadline?: Date
}

export const useTodoStore = defineStore(
  'todo',
  () => {
    const todos = ref<Todo[]>([])

    const addTodo = (todo: Todo) => {
      todos.value.push(todo)
    }

    const updateTodo = (id: string, updatedTodo: Partial<Todo>) => {
      const index = todos.value.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        todos.value[index] = { ...todos.value[index], ...updatedTodo }
      }
    }

    const removeTodo = (id: string) => {
      todos.value = todos.value.filter((todo) => todo.id !== id)
    }

    const markAsCompleted = (id: string) => {
      const index = todos.value.findIndex((todo) => todo.id === id)
      if (index !== -1 && todos.value[index].status !== 'Completed') {
        todos.value[index].status = 'Completed'
        todos.value[index].completedAt = new Date()
      }
    }

    return {
      todos,
      addTodo,
      updateTodo,
      removeTodo,
      markAsCompleted
    }
  },
  {
    persist: true
  }
)
