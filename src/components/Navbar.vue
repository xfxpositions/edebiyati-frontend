<template>
  <nav class="flex justify-between bg-[rgb(23,23,23)] text-gray-50">
    <!-- logo, for later -->
    <div class="logo flex cursor-pointer ml-2 justify-center items-center">
      <router-link to="/">
        <p class="text-xl md:text-2xl font-bold select-none">𐰅𐰑𐰅𐰉𐰄𐰖𐰀𐱃𐰄.𐰗𐰺𐰏</p>
      </router-link>
    </div>
    <!-- menus -->
    <div v-if="!isAuth" class="gap-2 mr-2 flex">
      <a class="underline px-1 py-2" href="/posts">Posts</a>
      <font-awesome-icon :icon="['fas', 'right-to-bracket']"
        ><span class="underline px-1 py-2 cursor-pointer"
          >SignIn</span
        ></font-awesome-icon
      >
      <router-link class="underline px-1 py-2" to="/signin">SignIn</router-link>
      <router-link class="underline px-1 py-2" to="/signup">SignUp</router-link>
    </div>
    <!-- mobile menu -->
    <div v-if="isAuth" class="flex">
      <NavbarMobile></NavbarMobile>
    </div>
  </nav>
</template>
<script setup>
import { modalstate } from "../modalState";
import NavbarMobile from "./NavbarMobile.vue";
import { ref, onMounted } from "vue";
import { verifyToken } from "../utils/jwt.js";

const isAuth = ref(false);
onMounted(() => {
  isAuth.value = Boolean(localStorage.getItem("currentUser"));
  console.log(isAuth.value);
});
</script>
