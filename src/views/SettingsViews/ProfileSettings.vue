<template>
  <div>
    <div
      class="fixed top-0 left-0 w-full h-full transition duration-300 bg-black opacity-0"
      :class="{ 'opacity-20': emailmodal || usernamemodal || ppmodal }"
      style="z-index: -1"
    ></div>
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

      <transition name="transition"><EMail :email="data.email" v-if="emailmodal" @eventA="emailModal" @saveInput="changeEmail"></EMail></transition>
      <transition name="transition"><UserName :username="data.name" v-if="usernamemodal" @eventA="usernameModal"></UserName></transition>
      <transition name="transition"><ProfilePhoto :avatar="data.avatar" v-if="ppmodal" @eventA="ppModal"></ProfilePhoto></transition>
    </div>
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
}
const usernameModal = () => {
  usernamemodal.value = !usernamemodal.value
}
const ppModal = () => {
  ppmodal.value = !ppmodal.value
}

const changeEmail = email => {
  console.log(email)
  //data.value.email = email
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
