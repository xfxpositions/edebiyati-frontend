<template>
  <Navbar></Navbar>
  <router-view class="router-view" v-slot="{ Component }">
    <transition name="vue-transition">
      <component @topbarhide="topbartoggle" :is="Component" />
    </transition>
  </router-view>
</template>
<script setup>
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import Navbar from './components/Navbar.vue'
import NavbarMobile from './components/NavbarMobile.vue'

const token = localStorage.getItem('token')
const user = reactive({ avatar: '' })

onMounted(async () => {
  const response = await axios.get('http://localhost:8080/user/fetch/6432bf665d2b1fcf7bfbaba3')
  console.log(response)
  user.avatar = response.data.avatar
  console.log(userAvatar)
})
const userAvatar = user.avatar
</script>
<style scoped>
/*.vue-transition-leave-active {
  transition: 0.5s ease;
  opacity: 1;
}
.vue-transition-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.vue-transition-enter-active {
  transition: 1s ease;
}
.vue-transition-enter-from {
  opacity: 0;
  transform: translateY(200px);
}
.vue-transition-enter-to {
  opacity: 1;
}*/
</style>
