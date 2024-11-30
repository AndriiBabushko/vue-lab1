<template>
  <section class="py-16 px-4 bg-gray-50">
    <h2 class="text-2xl font-semibold text-center mb-8 text-black">Блог</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="post in blogPosts"
        :key="post.id"
        class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
      >
        <h3 class="text-xl text-black font-medium">{{ post.title }}</h3>
        <p class="mt-2 text-black text-gray-600">{{ post.excerpt }}</p>
        <Button
          label="Читати далі"
          :to="`/blog/${post.id}`"
          class="mt-4 text-blue-600 hover:text-blue-800"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const blogPosts = [
  {
    id: 1,
    title: 'Як побудувати ефективний workflow з використанням Git та GitHub',
    excerpt:
      'Детальний посібник по налаштуванню та використанню Git для командної роботи. Вивчимо основні команди та практики, які допоможуть вам оптимізувати ваш робочий процес.',
    link: '/blog/1'
  },
  {
    id: 2,
    title: 'Найкращі практики для розробки адаптивних інтерфейсів з Tailwind CSS',
    excerpt:
      'У цій статті ми розглянемо основи використання Tailwind CSS для створення адаптивних і гнучких веб-дизайнів, що працюють на різних пристроях.',
    link: '/blog/2'
  },
  {
    id: 3,
    title: 'Розробка прогресивних веб-додатків (PWA) з використанням Vue.js',
    excerpt:
      'Як створити прогресивний веб-додаток за допомогою Vue.js, використовуючи сучасні технології для покращення швидкості, надійності та зручності для користувачів.',
    link: '/blog/3'
  },
  {
    id: 4,
    title: 'Типи даних у TypeScript: від основ до складних структур',
    excerpt:
      'Стаття пояснює основні типи даних у TypeScript та їх використання в реальних проектах, а також демонструє складні типи, що дозволяють забезпечити надійність коду.',
    link: '/blog/4'
  }
]
</script>

<style scoped>
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
