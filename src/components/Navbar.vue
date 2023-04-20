<template>
  <nav class="flex justify-between bg-[rgb(23,23,23)] text-gray-50">
    <!-- logo, for later -->
    <div class="logo flex cursor-pointer ml-2 justify-center items-center">
      <router-link to="/">
        <p class="text-xl md:text-2xl font-bold select-none">𐰅𐰑𐰅𐰉𐰄𐰖𐰀𐱃𐰄.𐰗𐰺𐰏</p>
      </router-link>
    </div>
    <!-- menus -->
    <div class="gap-2 mr-2 hidden sm:flex">
      <a class="underline px-1 py-2" href="/posts">Posts</a>
      <span
        class="underline px-1 py-2 cursor-pointer"
        @click="modalstate = !modalstate"
        >SignIn</span
      >
      <a class="underline px-1 py-2" href="/posts">SignUp</a>
    </div>
    <!-- mobile menu -->
    <div class="flex sm:hidden">
      <NavbarMobile></NavbarMobile>
    </div>
  </nav>
</template>
<script setup>
import { modalstate } from "../modalState";
import NavbarMobile from "./NavbarMobile.vue";
</script>
