<script setup>
import Navbar from "./components/Navbar.vue";
import FooterPage from "./components/Footer.vue";
</script>

<template>
  <div>
      <Navbar />
      <router-view />
      <FooterPage />
  </div>
</template>
