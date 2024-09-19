<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen">
    <header class="m-2">
      <nav>
        <Navbar />
      </nav>
    </header>

    <main class="flex-1 m-2">
      <slot />
    </main>
  </div>
</template>
