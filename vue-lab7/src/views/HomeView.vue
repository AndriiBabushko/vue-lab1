<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import HeroSection from '@/components/ui/HeroSection.vue'
import AboutSection from '@/components/ui/AboutSection.vue'
import SkillsSection from '@/components/ui/SkillsSection.vue'
import EducationSection from '@/components/ui/EducationSection.vue'
import ProjectsSection from '@/components/ui/ProjectsSection.vue'
import BlogSection from '@/components/ui/BlogSection.vue'
import ContactForm from '@/components/ui/ContactForm.vue'
import FooterSection from '@/components/ui/FooterSection.vue'
</script>

<template>
  <DefaultLayout>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <EducationSection />
    <ProjectsSection />
    <BlogSection />
    <ContactForm />
    <FooterSection />
  </DefaultLayout>
</template>
