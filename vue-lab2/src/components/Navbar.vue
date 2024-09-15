<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import VueSVG from '@/assets/vue.svg?url'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
const { t } = useI18n()

const items = ref([
  {
    label: t('main'),
    icon: 'pi pi-home'
  },
  {
    label: 'Cart',
    icon: 'pi pi-shopping-cart',
    badge: 5
  }
])
</script>

<template>
  <div class="card">
    <Menubar :model="items">
      <template #start><Avatar class="hidden" :image="VueSVG" shape="square" /> </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down',
              { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }
            ]"
          ></i>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
          <LanguageSwitcher />
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<style scoped></style>
