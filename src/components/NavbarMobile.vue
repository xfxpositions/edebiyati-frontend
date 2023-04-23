<template>
  <div class="flex justify-center items-center cursor-pointer p-2 box-border" style="height: 72px">
    <div v-if="!avatar" class="w-[32px] h-[32px] mr-5 relative bottom-5 right-5">
      <Loader></Loader>
    </div>
    <Menu v-if="avatar" as="div" class="transition-all duration-300 ease-in-out">
      <MenuButton class="p-2">
        <img :src="avatar && avatar" alt="me" class="w-[40px] h-[40px] object-cover rounded-full" />
      </MenuButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="flex flex-col gap-1 px-2 py-1 justify-start items-start backdrop-blur-[2px] bg-opacity-[98%] text-md z-20 absolute right-0 w-56 origin-top-right rounded-md bg-white text-black dark:text-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-black"
        >
          <MenuItem class="px-1 pl-2">
            <router-link
              to="/write"
              class="group px-1 py-1 rounded-md h-[100%] w-[100%] flex items-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out"
            >
              <font-awesome-icon :icon="['fas', 'pen-to-square']" class="mr-1" />
              <button class="group-hover:underline ml-1">Yaz</button>
            </router-link>
          </MenuItem>
          <MenuItem class="px-1 pl-2">
            <router-link
              to="/profile"
              class="group px-1 py-1 rounded-md h-[100%] w-[100%] flex items-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out"
            >
              <font-awesome-icon :icon="['fas', 'user']" class="mr-1" />
              <button class="group-hover:underline ml-1">Profilim</button>
            </router-link>
          </MenuItem>
          <MenuItem class="px-1 pl-2">
            <router-link
              to="/posts/{userid}"
              class="group px-1 py-1 rounded-md h-[100%] w-[100%] flex items-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out"
            >
              <font-awesome-icon :icon="['fas', 'file-lines']" class="mr-1" />
              <button class="group-hover:underline ml-1">Gönderilerim</button>
            </router-link>
          </MenuItem>
          <MenuItem class="px-1 pl-2">
            <router-link
              to="/favorites"
              class="group px-1 py-1 rounded-md h-[100%] w-[100%] flex items-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out"
            >
              <font-awesome-icon :icon="['fas', 'bookmark']" class="mr-1" />
              <button class="group-hover:underline ml-1">
                <span>Favorilerim</span>
              </button>
            </router-link>
          </MenuItem>

          <!-- divider -->
          <MenuItem class="">
            <div class="h-[1px] w-full bg-black"></div>
          </MenuItem>
          <MenuItem class="px-1 pl-2">
            <router-link
              to="/logout"
              class="group px-1 py-1 rounded-md h-[100%] w-[100%] flex items-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out"
            >
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="mr-1" />
              <button class="group-hover:underline">Çıkış Yap</button>
            </router-link>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import axiosUtil from '../utils/axios.js'
import Loader from '../components/Loader.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const avatar = ref('')
onMounted(async () => {
  await axiosUtil.get(`/user/fetch/${localStorage.getItem('currentUser')}`).then(result => {
    avatar.value = result.data?.avatar
    avatar.value = avatar.value ? avatar.value : 'https://upload.wikimedia.org/wikipedia/commons/1/16/K2-big.jpg'
    console.log('avatar=>' + avatar.value)
  })
})
</script>
