import { computed } from 'vue'
import { type Todo, useTodoStore } from '@/stores/todo'

export function useTaskManager() {
  const todoStore = useTodoStore()

  const todos = computed(() => todoStore.todos)
  const activeTodos = computed(() => todos.value.filter((task) => task.status === 'Active'))
  const completedTodos = computed(() => todos.value.filter((task) => task.status === 'Completed'))

  const addTask = (task: Todo) => {
    todoStore.addTodo(task)
  }

  const editTask = (id: string, updatedTask: Partial<Todo>) => {
    todoStore.updateTodo(id, updatedTask)
  }

  const deleteTask = (id: string) => {
    todoStore.removeTodo(id)
  }

  const markAsCompleted = (id: string) => {
    todoStore.markAsCompleted(id)
  }

  return {
    todos,
    activeTodos,
    completedTodos,
    addTask,
    editTask,
    deleteTask,
    markAsCompleted
  }
}
