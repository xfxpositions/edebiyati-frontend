<template>
  <div class="fixed w-full top-0 left-0" ref="navbar2" style="z-index: 90">
    <nav class="flex justify-between bg-[rgb(23,23,23)] text-gray-50">
      <!-- logo, for later -->
      <div class="logo flex cursor-pointer ml-2 justify-center items-center">
        <router-link to="/">
          <p class="text-xl md:text-2xl font-bold select-none">𐰉𐰄𐱃𐰄𐰏𐰄𐰣.𐰗𐰺𐰏</p>
        </router-link>
      </div>
      <!-- menus -->
      <div v-if="!isAuth" class="gap-2 mr-2 flex items-center">
        <div v-for="link in navbar">
          <router-link :to="link.path">
            <font-awesome-icon :icon="['fas', link.icon]"></font-awesome-icon>
            <span class="underline px-1 py-2 cursor-pointer">{{
              link.name
            }}</span>
          </router-link>
        </div>
      </div>
      <!-- mobile menu -->
      <div v-if="isAuth" class="flex">
        <NavbarMobile></NavbarMobile>
      </div>
    </nav>
  </div>
</template>
<script setup>
import navbar from "./Navbar.js";
import { modalstate } from "../modalState";
import NavbarMobile from "./NavbarMobile.vue";
import { ref, onMounted } from "vue";
import { verifyToken } from "../utils/jwt.js";

const emits = defineEmits(["marginTopFunction"]);
const navbar2 = ref(null);
const isAuth = ref(false);
onMounted(() => {
  isAuth.value = Boolean(localStorage.getItem("currentUser"));
  console.log(localStorage.getItem("currentUser"));
});
onMounted(async () => {
  setTimeout(() => {
    const height = navbar2.value.offsetHeight;
    localStorage.setItem("navbar", height);
    emits("marginTopFunction", height);
  }, 200);
});
</script>
