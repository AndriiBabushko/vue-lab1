<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import VueSVG from '@/assets/vue.svg?url'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { ROOT_ROUTE_NAMES, ROOT_ROUTE_PATHS } from '@/utils'
import { useUserStore } from '@/stores/user'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n()

const cartStore = useCartStore()
const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

const mainLabel = computed(() => t('main'))
const cartLabel = computed(() => t('cart'))
const logoutLabel = computed(() => t('logout'))
const cartItemsAmount = computed(() => cartStore.cart.length)

const menu = ref()
const avatarItems = ref([
  {
    label: logoutLabel,
    icon: 'pi pi-sign-out',
    command: () => {
      userStore.logout()
    }
  }
])
const items = ref([
  {
    label: mainLabel,
    icon: 'pi pi-home',
    command: () => router.push(ROOT_ROUTE_PATHS.HOME)
  },
  {
    label: cartLabel,
    icon: 'pi pi-shopping-cart',
    badge: cartItemsAmount,
    command: () => router.push(ROOT_ROUTE_PATHS.CART)
  }
])

watch([() => userStore.isLoggedIn, () => userStore.loginMessage], ([isLoggedIn, loginMessage]) => {
  if (!isLoggedIn) {
    router.push({ name: ROOT_ROUTE_NAMES.LOGIN })
    if (loginMessage) {
      toast.add({
        severity: 'success',
        summary: loginMessage,
        life: 3000
      })
    }
  } else if (loginMessage) {
    toast.add({
      severity: 'error',
      summary: loginMessage,
      life: 3000
    })
  }
  userStore.clearLoginMessage()
})

const toggleAvatarMenu = (event) => {
  menu.value.toggle(event)
}
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
          <LanguageSwitcher />
          <Avatar
            class="cursor-pointer"
            @click="toggleAvatarMenu"
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <TieredMenu
            ref="menu"
            :model="avatarItems"
            popup
            :pt="{ root: { class: '!min-w-fit' } }"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<style scoped>
.custom-tiered-menu {
  min-width: 20rem;
}
</style>
