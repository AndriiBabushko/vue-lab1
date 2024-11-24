<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue'
</script>

<template>
  <div class="min-h-screen h-full flex flex-col">
    <header class="m-2">
      <nav>
        <Navbar />
      </nav>
    </header>

    <main class="h-full m-2 flex-grow">
      <slot />
    </main>
  </div>
</template>
