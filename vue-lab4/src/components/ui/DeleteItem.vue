<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { type Item, useItemsStore } from '@/stores/items'
import { watch } from 'vue'

const itemsStore = useItemsStore()

const props = defineProps<{
  visible: boolean
  item: Item
}>()

const schema = yup.object({
  id: yup.string().required(),
  name: yup.string().required('Title is required'),
  description: yup.string().optional(),
  price: yup.number().required('Price is required').min(0)
})

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    id: props.item.id,
    name: props.item.name,
    description: props.item.description,
    price: props.item.price
  }
})

const emit = defineEmits(['update:visible'])

const closeModal = () => emit('update:visible', false)

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible && props.item) {
      setValues({
        name: props.item.name,
        description: props.item.description,
        price: props.item.price
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

const onSubmit = handleSubmit((formData) => {
  itemsStore.deleteItem(formData.id)
  handleCancel()
})
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="closeModal()"
    modal
    header="Delete Todo"
    class="w-[25rem]"
  >
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <p>Are you sure you want to delete {{ item.name }} item?</p>
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="handleCancel" />
        <Button type="submit" severity="danger" label="Delete" />
      </div>
    </form>
  </Dialog>
</template>
