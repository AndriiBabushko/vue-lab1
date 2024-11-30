<template>
  <section
    class="bg-cover bg-center text-white text-center py-24 px-4"
    style="background-image: url('/assets/hero-bg.jpg')"
  >
    <div>
      <h1 class="text-4xl font-bold mb-4">Привіт, я Андрій Бабушко!</h1>
      <p class="text-lg mb-6">C++/Fullstack Developer</p>
      <Button
        label="Дізнатись більше"
        class="p-button-lg p-button-primary"
        @click="scrollToAbout"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
const scrollToAbout = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' })
}
</script>
