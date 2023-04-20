<template>
  <Navbar></Navbar>
  <router-view class="router-view" v-slot="{ Component }">
    <transition name="vue-transition">
      <component @topbarhide="topbartoggle" :is="Component" />
    </transition>
  </router-view>
</template>
<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import Navbar from "./components/Navbar.vue";

const token = localStorage.getItem("token");
const user = reactive({ avatar: "" });

onMounted(async () => {
  const response = await axios.get(
    "http://localhost:8080/user/fetch/6432bf665d2b1fcf7bfbaba3"
  );
  console.log(response);
  user.avatar = response.data.avatar;
  console.log(userAvatar);
});
const userAvatar = user.avatar;
</script>
