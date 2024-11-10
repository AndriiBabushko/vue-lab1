<script setup lang="ts">
import { ref, watch } from 'vue'
import VueSVG from '@/assets/vue.svg?url'
import { useRouter } from 'vue-router'
import { ROUTE_PATHS } from '@/utils'
import { useUserStore } from '@/stores/user'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
const { t } = useI18n()

const menu = ref()
const avatarItems = ref([
  {
    label: t('message.menu.testResults'),
    icon: 'pi pi-inbox',
    command: () => {
      router.push(ROUTE_PATHS.RESULT)
    }
  },
  {
    label: t('message.menu.logout'),
    icon: 'pi pi-sign-out',
    command: () => {
      userStore.logout().then(() => {
        toast.add({
          severity: 'success',
          summary: t('message.menu.loggedOutSummary'),
          detail: t('message.menu.loggedOutDetail'),
          life: 3000
        })
      })
    }
  }
])

const items = ref(
  userStore.isLoggedIn
    ? [
        {
          label: t('message.menu.test'),
          icon: 'pi pi-pencil',
          command: () => router.push(ROUTE_PATHS.TEST)
        }
      ]
    : []
)

watch(
  () => userStore.isLoggedIn,
  (isLoggedIn) => {
    items.value = isLoggedIn
      ? [
          {
            label: t('message.menu.test'),
            icon: 'pi pi-inbox',
            command: () => router.push(ROUTE_PATHS.TEST)
          }
        ]
      : []
  }
)

const toggleAvatarMenu = (event: any) => {
  menu.value.toggle(event)
}
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <Button as="router-link" link :to="ROUTE_PATHS.HOME">
        <Avatar class="hidden" :image="VueSVG" shape="square" />
      </Button>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a v-ripple class="flex items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
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
        <Button
          v-if="!userStore.isLoggedIn"
          as="router-link"
          :label="t('message.menu.signUp')"
          :to="ROUTE_PATHS.REGISTER"
        />
        <Button
          v-if="!userStore.isLoggedIn"
          as="router-link"
          :label="t('message.menu.signIn')"
          :to="ROUTE_PATHS.LOGIN"
        />
        <LanguageSwitcher />
        <Avatar
          v-if="userStore.isLoggedIn"
          class="cursor-pointer"
          @click="toggleAvatarMenu"
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          shape="circle"
        />
        <TieredMenu
          v-if="userStore.isLoggedIn"
          ref="menu"
          :model="avatarItems"
          popup
          :pt="{ root: { class: '!min-w-fit' } }"
        />
      </div>
    </template>
  </Menubar>
</template>

<style scoped>
.custom-tiered-menu {
  min-width: 20rem;
}
</style>
