<script setup lang="ts">
  // import SwalDemo from '@/components/SwalDemo.vue';
  import Calculator from '@/components/Calculator.vue';
  const isTheme = "forest";
</script>

<template>
  <Calculator :theme="isTheme" />
  <!-- <SwalDemo /> -->
</template>

<style scoped>
</style>
