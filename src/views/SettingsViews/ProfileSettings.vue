<template>
  <div class="w-full flex flex-wrap">
    <div class="mt-10 w-full flex justify-between cursor-pointer" @click="emailModal">
      <div>Email Adresi</div>
      <div class="text-gray-500">{{ data.email }}</div>
    </div>
    <div class="mt-10 w-full flex justify-between cursor-pointer" @click="usernameModal">
      <div>Kullanıcı Adı</div>
      <div class="text-gray-500">{{ data.name }}</div>
    </div>
    <div class="mt-10 w-full flex justify-between cursor-pointer" @click="ppModal">
      <div>Profil Fotoğrafı</div>
      <div class="text-gray-500"><img class="object-cover object-center avatar" :src="data.avatar" alt="Main Image" /></div>
    </div>

    <transition name="transition"><EMail v-if="emailmodal" @eventA="emailModal"></EMail></transition>

    <transition name="transition"><EMail v-if="usernamemodal" @eventA="usernameModal"></EMail></transition>
    <transition name="transition"><EMail v-if="ppmodal" @eventA="ppModal"></EMail></transition>
  </div>
</template>
<script setup>
import EMail from './Modals/EMail.vue'
import ProfilePhoto from './Modals/ProfilePhoto.vue'
import UserName from './Modals/UserName.vue'
import axiosInstance from '../../utils/axios.js'
import { onBeforeMount, onMounted, onBeforeUnmount, ref, watch } from 'vue'
var emailmodal = ref(false)
var usernamemodal = ref(false)
var ppmodal = ref(false)
const emailModal = () => {
  emailmodal.value = !emailmodal.value
  console.log(emailmodal.value)
}
const usernameModal = () => {
  usernamemodal.value = !usernamemodal.value
  console.log(usernamemodal.value)
}
const ppModal = () => {
  ppmodal.value = !ppmodal.value
  console.log(ppmodal.value)
}
const data = ref({})
const profileget = () => {
  axiosInstance
    .get('/user/fetch/' + localStorage.getItem('currentUser'))
    .then(response => {
      data.value = response.data
    })
    .catch(error => {
      console.error(error)
    })
}
profileget()
</script>
<style scoped>
.avatar {
  background-size: cover;
  width: 45px;
  height: 45px;
  border-radius: 50% 50%;
}
.transition-enter-active,
.transition-leave-active {
  transition: 0.5s ease;
}
.transition-enter-from,
.transition-leave-to {
  opacity: 0;
  transform: translatey(100px);
}
</style>
