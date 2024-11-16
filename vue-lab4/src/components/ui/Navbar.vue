<script setup lang="ts">
import { ref, watch } from 'vue'
import VueSVG from '@/assets/vue.svg?url'
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_PATHS } from '@/utils'
import { useUserStore } from '@/stores/user'
import { useToast } from 'primevue/usetoast'
import { useItemsStore } from '@/stores/items'
import AddEditItem from '@/components/ui/AddEditItem.vue'

const userStore = useUserStore()
const itemsStore = useItemsStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const menu = ref()
const isAddModalVisible = ref(false)
const avatarItems = ref([
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      userStore.logout().then(() => {
        toast.add({
          severity: 'success',
          summary: 'Logged out',
          detail: 'You have been logged out successfully.',
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
          label: 'Feed',
          icon: 'pi pi-inbox',
          command: () => router.push(ROUTE_PATHS.FEED)
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
            label: 'Feed',
            icon: 'pi pi-inbox',
            command: () => router.push(ROUTE_PATHS.FEED)
          }
        ]
      : []
  }
)

watch(
  () => route.path,
  (newPath) => {
    if (newPath === ROUTE_PATHS.FEED && userStore.isLoggedIn) {
      avatarItems.value = [
        {
          label: 'Add new Item',
          icon: 'pi pi-plus',
          command: () => {
            isAddModalVisible.value = true
          }
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            userStore.logout()
          }
        }
      ]
    } else {
      avatarItems.value = [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            userStore.logout()
          }
        }
      ]
    }
  },
  { immediate: true }
)

const toggleAvatarMenu = (event: any) => {
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
          <Button
            v-if="!userStore.isLoggedIn"
            as="router-link"
            label="Sign up"
            :to="ROUTE_PATHS.REGISTER"
          />
          <Button
            v-if="!userStore.isLoggedIn"
            as="router-link"
            label="Sign in"
            :to="ROUTE_PATHS.LOGIN"
          />
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
  </div>
  <AddEditItem v-model:visible="isAddModalVisible" />
</template>

<style scoped>
.custom-tiered-menu {
  min-width: 20rem;
}
</style>
