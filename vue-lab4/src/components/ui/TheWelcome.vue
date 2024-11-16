<script setup lang="ts">
const labInfo = {
  title: 'Lab Work 4 - Vue 3 and Firebase',
  description:
    'This lab focuses on integrating Firebase Authentication with basic CRUD operations in a Vue 3 application. You will implement Firebase authentication and interact with Firebase Firestore for managing data.',
  tasks: [
    'Set up Firebase authentication in the project.',
    'Create a basic authentication system with login and registration.',
    'Perform basic CRUD operations with Firebase Firestore.',
    'Optimize the application using async components and dynamic imports.'
  ]
}
</script>

<template>
  <div class="p-8">
    <h1 class="text-4xl font-bold mb-4">{{ labInfo.title }}</h1>
    <p class="mb-6">{{ labInfo.description }}</p>
    <ul class="list-disc pl-6">
      <li v-for="task in labInfo.tasks" :key="task" class="mb-2">{{ task }}</li>
    </ul>
  </div>
</template>
