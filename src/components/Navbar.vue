<template>
  <nav class="flex justify-between bg-[rgb(23,23,23)] text-gray-50">
    <!-- logo, for later -->
    <div class="logo"></div>
    <!-- menus -->
    <div class="flex gap-2 mr-2">
      <a class="underline px-1 py-2" href="/posts">Posts</a>
      <span class="underline px-1 py-2" @click="modalstate = !modalstate"
        >Signup</span
      >
      <a class="underline px-1 py-2" href="/posts">SignIn</a>
    </div>
  </nav>
</template>
<script setup>
import { modalstate } from "../modalState.js";
</script>
