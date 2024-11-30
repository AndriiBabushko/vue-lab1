<script setup lang="ts">
import VueSVG from '@/assets/vue.svg?url'
import { ROUTE_PATHS } from '@/utils'
</script>

<template>
  <Menubar>
    <template #start>
      <Button as="router-link" link :to="ROUTE_PATHS.HOME">
        <Avatar class="hidden" :image="VueSVG" shape="square" />
      </Button>
    </template>
    <!--    <template #end>-->
    <!--      <div class="flex items-center gap-2">-->
    <!--       -->
    <!--      </div>-->
    <!--    </template>-->
  </Menubar>
</template>
