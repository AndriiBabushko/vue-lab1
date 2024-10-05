<script setup lang="ts">
import { watch, defineProps, defineAsyncComponent } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import type { Todo, TodoPriority } from '@/stores/todo'
import { useTaskManager } from '@/hooks/useTaskManager'
const DropdownInputField = defineAsyncComponent(
  () => import('@/components/common/DropdownInputField.vue')
)
const TextInputField = defineAsyncComponent(() => import('@/components/common/TextInputField.vue'))
const DateInputField = defineAsyncComponent(() => import('@/components/common/DateInputField.vue'))

const props = defineProps<{
  visible: boolean
  isEdit?: boolean
  todo?: Todo
}>()

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().optional(),
  priority: yup
    .mixed<TodoPriority>()
    .oneOf(['Low', 'Medium', 'High'])
    .required('Priority is required'),
  deadline: yup.date().nullable().optional()
})

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    title: '',
    description: '',
    priority: 'Medium',
    deadline: undefined
  }
})

const { addTask, editTask } = useTaskManager()

const emit = defineEmits(['update:visible'])

const closeModal = () => emit('update:visible', false)

const priorityOptions: TodoPriority[] = ['Low', 'Medium', 'High']

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible && props.isEdit && props.todo) {
      setValues({
        title: props.todo.title,
        description: props.todo.description,
        priority: props.todo.priority,
        deadline: props.todo.deadline || null
      })
    } else {
      resetForm()
    }
  }
)

const handleCancel = () => {
  resetForm()
  closeModal()
}

const onSubmit = handleSubmit((values) => {
  if (props.isEdit && props.todo) {
    const updatedTodo: Todo = {
      ...props.todo,
      title: values.title,
      description: values.description,
      priority: values.priority,
      deadline: values.deadline || undefined
    }

    editTask(props.todo.id, updatedTodo)
  } else {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      status: 'Active',
      createdAt: new Date(),
      priority: values.priority,
      deadline: values.deadline || undefined,
      tags: []
    }

    addTask(newTodo)
  }

  handleCancel()
})
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="closeModal()"
    modal
    :header="props.isEdit ? 'Edit Todo' : 'Add New Todo'"
    class="w-[25rem]"
  >
    <form @submit.prevent="onSubmit">
      <TextInputField name="title" label="Title" />
      <TextInputField name="description" label="Description" />
      <DropdownInputField name="priority" label="Priority" :suggestions="priorityOptions" />
      <DateInputField name="deadline" label="Deadline date" />
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="handleCancel" />
        <Button type="submit" label="Save" />
      </div>
    </form>
  </Dialog>
</template>
