<template>
  <section class="py-16 px-4 bg-gray-50">
    <div class="card">
      <h2 class="text-2xl font-semibold text-center mb-8 text-black">Освіта</h2>
      <Timeline :value="education" align="alternate" class="customized-timeline">
        <template #marker="slotProps">
          <span
            class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm"
            :style="{ backgroundColor: slotProps.item.color }"
          >
            <i :class="slotProps.item.icon"></i>
          </span>
        </template>
        <template #content="slotProps">
          <Card class="mt-4">
            <template #title>{{ slotProps.item.title }}</template>
            <template #subtitle>{{ slotProps.item.date }}</template>
            <template #content>
              <p>{{ slotProps.item.description }}</p>
              <Button label="Детальніше" text class="mt-4" />
            </template>
          </Card>
        </template>
      </Timeline>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const education = ref([
  {
    title: 'ZHYTOMYR POLYTECHNIC STATE UNIVERSITY',
    date: '2021 - Present',
    description:
      'Faculty of Information and Computer Technologies, Department of Software Engineering.',
    icon: 'pi pi-book',
    color: '#673AB7'
  },
  {
    title: 'WINWIN EDUCATION',
    date: '2019 - 2021',
    description: 'English speaking, writing, and listening skills. Cambridge B1 Exam.',
    icon: 'pi pi-globe',
    color: '#FF9800'
  }
])
</script>

<style lang="sass" scoped>
@media screen and (max-width: 960px)
  ::v-deep(.customized-timeline)
    .p-timeline-event:nth-child(even)
      flex-direction: row !important

      .p-timeline-event-content
        text-align: left !important

    .p-timeline-event-opposite
      flex: 0
</style>
