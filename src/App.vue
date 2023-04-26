<template>
  <div class="w-full">
    <back-ground></back-ground>
    <navbar @marginTopFunction="margintop"></navbar>
    <div class="routerview" id="routerview">
      <router-view class="router-view" v-slot="{ Component }">
        <transition name="vue-transition">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import NavbarMobile from './components/NavbarMobile.vue'
import BackGround from './components/BackGround.vue'

const emits = defineEmits(['myEvent'])
const token = localStorage.getItem('token')
const user = reactive({ avatar: '' })
/*onMounted(async () => {
  const response = await axios.get(
    "http://localhost:8080/user/fetch/6432bf665d2b1fcf7bfbaba3"
  );
  console.log(response);
  user.avatar = response.data.avatar;
  console.log(userAvatar);
});
const userAvatar = user.avatar;*/
const margintop = height => {
  document.getElementById('routerview').style.marginTop = height + 'px'
}
</script>
<style scoped>
.routerview {
  z-index: 1;
}
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
<style>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #212121;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(190, 190, 190);
}
</style>
