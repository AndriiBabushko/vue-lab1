<script setup lang="ts">
import { watch, defineProps, defineAsyncComponent } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import type { Item } from '@/stores/items'
import { useItemsStore } from '@/stores/items'

const NumberInputField = defineAsyncComponent(
  () => import('@/components/common/NumberInputField.vue')
)
const TextInputField = defineAsyncComponent(() => import('@/components/common/TextInputField.vue'))

const props = defineProps<{
  visible: boolean
  isEdit?: boolean
  item?: Item
}>()

const itemsStore = useItemsStore()

const schema = yup.object({
  name: yup.string().required('Title is required'),
  description: yup.string().optional(),
  price: yup.number().required('Price is required').min(0)
})

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: props.item?.name || '',
    description: props.item?.description || undefined,
    price: props.item?.price || 0
  }
})

const emit = defineEmits(['update:visible'])

const closeModal = () => emit('update:visible', false)

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible && props.isEdit && props.item) {
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

const onSubmit = handleSubmit((values) => {
  if (props.isEdit && props.item) {
    const updatedItem: Item = {
      ...props.item,
      name: values.name,
      description: values.description,
      price: values.price
    }
    itemsStore.updateItem(updatedItem)
  } else {
    const newItem: Omit<Item, 'id'> = {
      name: values.name,
      description: values.description,
      price: values.price
    }
    itemsStore.createItem(newItem)
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
      <TextInputField name="name" label="Name" />
      <TextInputField name="description" label="Description" />
      <NumberInputField name="price" label="Price" />
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="handleCancel" />
        <Button type="submit" label="Save" />
      </div>
    </form>
  </Dialog>
</template>
