<template>
  <section class="py-16 px-4 bg-white">
    <h2 class="text-2xl font-semibold text-center mb-8 text-black">Мої навички</h2>
    <ul class="space-y-6">
      <li class="flex flex-col">
        <p class="text-lg text-black font-medium mb-2">HTML5 / CSS / SCSS / TailwindCSS</p>
        <ProgressBar :value="90" class="w-full" />
      </li>
      <li class="flex flex-col">
        <p class="text-lg text-black font-medium mb-2">JavaScript / TypeScript</p>
        <ProgressBar :value="95" class="w-full" />
      </li>
      <li class="flex flex-col">
        <p class="text-lg text-black font-medium mb-2">React / Next.js</p>
        <ProgressBar :value="90" class="w-full" />
      </li>
      <li class="flex flex-col">
        <p class="text-lg text-black font-medium mb-2">Redux / Zustand / GraphQL</p>
        <ProgressBar :value="85" class="w-full" />
      </li>
      <li class="flex flex-col">
        <p class="text-lg text-black font-medium mb-2">Firebase / Strapi</p>
        <ProgressBar :value="80" class="w-full" />
      </li>
      <li class="flex flex-col">
        <p class="text-lg text-black font-medium mb-2">
          Аналіз даних (Clarity, Sentry, Firebase Analytics)
        </p>
        <ProgressBar :value="75" class="w-full" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup></script>
