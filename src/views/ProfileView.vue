<template>
  <div class="w-full grid grid-cols-12">
    <div class="col-span-12 lg:col-span-8 grid grid-cols-12">
      <div class="col-span-1 box"></div>
      <!--main section-->
      <div class="col-span-10 box" :class="{ hidden: loading == true }">
        <div class="w-full py-10 text-4xl font-bold flex justify-between">
          <div class="w-full flex justify-start items-center">
            <img class="object-cover object-center avatar lg:hidden" :src="data.avatar" alt="Main Image" />
            <div class="ml-5 lg:ml-0 h-full flex flex-wrap items-center">
              <div class="w-full">{{ data.name }}</div>
              <div class="w-full lg:hidden text-lg text-gray-500">{{ data.email }}</div>
            </div>
          </div>
          <div class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
              <path
                d="M207.858 624Q188 624 174 609.858q-14-14.141-14-34Q160 556 174.142 542q14.141-14 34-14Q228 528 242 542.142q14 14.141 14 34Q256 596 241.858 610q-14.141 14-34 14Zm272 0Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm272 0Q732 624 718 609.858q-14-14.141-14-34Q704 556 718.142 542q14.141-14 34-14Q772 528 786 542.142q14 14.141 14 34Q800 596 785.858 610q-14.141 14-34 14Z"
              />
            </svg>
          </div>
        </div>
        <div class="activetab" ref="activetab"></div>
        <div class="flex justify-start items-center w-full gap-3 border-b-2 border-gray-200" ref="tabs">
          <div v-for="(route, index) in routes">
            <router-link :class="{ active: selectedIndex == index }" :to="route.path" ref="home" @click="tabclick">
              {{ route.name }}
            </router-link>
          </div>
        </div>
        <router-view class="router-view mt-2" v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
      <div class="col-span-10 box flex items-center justify-center" :class="{ hidden: loading == false }">Yükleniyor</div>
    </div>
    <div class="lg:col-span-4 lg:block box py-5 hidden">
      <div class="w-full"><img class="object-cover object-center avatar mt-10" :src="data.avatar" alt="Main Image" /></div>
      <div class="w-full font-bold pl-2 pt-5 text-xl">{{ data.name }}</div>
      <div class="w-full pl-2 text-base">{{ data.email }}</div>
      <div class="w-full pl-2 mt-5 text-base cursor-pointer text-emerald-500">
        Edit Profile
        <font-awesome-icon :icon="['fas', 'pen-to-square']" />
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import axiosInstance from '../utils/axios.js'
import { onBeforeMount, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const currentroute = useRoute()
const routes = [
  {
    path: 'home',
    name: 'Home'
  },
  {
    path: 'about',
    name: 'About'
  }
]
var loading = ref(true)
var selectedIndex = ref(0)
var tabs = ref(null)
var activetab = ref(null)
const tabclick = event => {
  activetab.value.style.left = event.target.offsetLeft + 'px'
  activetab.value.style.width = event.target.offsetWidth + 'px'
}
onMounted(async () => {
  window.addEventListener('resize', () => {
    //getBoundingClientRect()
    activetab.value.style.left = tabs.value.children[selectedIndex.value].offsetLeft + 'px'
    activetab.value.style.width = tabs.value.children[selectedIndex.value].offsetWidth + 'px'
    activetab.value.style.top = tabs.value.getBoundingClientRect().top + tabs.value.offsetHeight - 2 + 'px'
  })
  routes.forEach((route, index) => {
    const modifiedString = currentroute.fullPath.replace(/^\/profile\//, '')
    if (modifiedString == route.path) {
      selectedIndex.value = index
    }
  })
  setTimeout(() => {
    loading.value = false
  }, 300)
  setTimeout(() => {
    activetab.value.style.left = tabs.value.children[selectedIndex.value].offsetLeft + 'px'
    activetab.value.style.width = tabs.value.children[selectedIndex.value].offsetWidth + 'px'
    activetab.value.style.top = tabs.value.getBoundingClientRect().top + tabs.value.offsetHeight - 2 + 'px'
  }, 300)
})
var avatar = ref('')
var name = ref('')
var email = ref('')
var created_at = ref('')
var data = ref({})

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
.activetab {
  position: absolute;
  bottom: 0;
  transition: left 0.5s ease-in-out, width 0.5s 0.1s;
  height: 2px;
  background-color: blue;
  left: 0;
  width: 69px;
  pointer-events: none;
}
.avatar {
  background-size: cover;
  width: 88px;
  height: 88px;
  border-radius: 50% 50%;
}
.box {
  height: auto;
}
</style>
