<template>
  <HeaderComponent />
  <router-view />
  <FooterComponent />
</template>

<script setup>
import HeaderComponent from '@/components/shared/HeaderComponent.vue';
import FooterComponent from '@/components/shared/FooterComponent.vue';
</script>

<style scoped></style>
