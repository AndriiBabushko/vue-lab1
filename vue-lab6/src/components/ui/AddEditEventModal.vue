<script setup lang="ts">
import { watch, defineProps } from 'vue'
import { useForm } from 'vee-validate'
import { type Event } from '@/stores/events'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import TextInputField from '@/components/common/TextInputField.vue'
import DateInputField from '@/components/common/DateInputField.vue'

const props = defineProps<{
  visible: boolean
  isEdit?: boolean
  event?: Event
}>()

const emit = defineEmits(['update:visible', 'save'])

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().optional(),
  date: yup.string().required('Date is required')
})

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    title: props?.event?.title || '',
    description: props?.event?.description || '',
    date: props?.event?.date || ''
  }
})

const closeModal = () => emit('update:visible', false)

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible && props.isEdit && props.event) {
      setValues({
        title: props.event.title,
        description: props.event.description,
        date: props.event.date
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
  const event: Omit<Event, 'id'> = {
    ...props.event,
    title: values.title,
    description: values.description,
    date: values.date
  }

  emit('save', event)
  handleCancel()
})
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="closeModal"
    modal
    :header="props.isEdit ? 'Edit Event' : 'Add New Event'"
    class="w-[25rem]"
  >
    <form @submit.prevent="onSubmit">
      <TextInputField name="title" label="Title" />
      <TextInputField name="description" label="Description" />
      <DateInputField name="date" show-time label="Date" />
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="handleCancel" />
        <Button type="submit" label="Save" />
      </div>
    </form>
  </Dialog>
</template>
