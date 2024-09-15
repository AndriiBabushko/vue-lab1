<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="contain-layout">
    <Navbar />
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped></style>
