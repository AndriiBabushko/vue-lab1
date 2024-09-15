<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import TextareaField from '@/components/TextareaField.vue'
import { useField } from 'vee-validate'
import { defineProps } from 'vue'

const props = defineProps<{
  name: string
}>()

const { value: projects, setValue } = useField<Array<object>>(() => props.name)

// Function to add a new project
const addProject = () => {
  const currentProjects = [...projects.value]
  currentProjects.push({
    projectName: '',
    projectDescription: '',
    projectRole: '',
    projectLink: ''
  })
  setValue(currentProjects)
}

const removeProject = (index: number) => {
  const currentProjects = [...projects.value]
  currentProjects.splice(index, 1)
  setValue(currentProjects)
}
</script>

<template>
  <div v-for="(project, index) in projects" :key="index" class="mb-4">
    <InputField :name="`projects.${index}.projectName`" label="Project Name" />
    <TextareaField :name="`projects.${index}.projectDescription`" label="Project Description" />
    <InputField :name="`projects.${index}.projectRole`" label="Role in Project" />
    <InputField :name="`projects.${index}.projectLink`" label="Project Link" type="url" />
    <button type="button" class="mt-2 text-red-600" @click="removeProject(index)">
      Remove Project
    </button>
  </div>
  <button
    type="button"
    class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    @click="addProject"
  >
    Add Another Project
  </button>
</template>

<style scoped></style>
