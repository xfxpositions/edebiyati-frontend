<template>
  <Navbar></Navbar>
  <router-view class="router-view" v-slot="{ Component }">
    <transition name="vue-transition">
      <component @topbarhide="topbartoggle" :is="Component" />
    </transition>
  </router-view>
</template>
<script setup>
import Navbar from "./components/Navbar.vue";
</script>
