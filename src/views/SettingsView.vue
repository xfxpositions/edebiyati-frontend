<template>
  <div class="w-full grid grid-cols-12">
    <div class="hidden lg:flex lg:col-span-1"></div>
    <div class="col-span-10">
      <div class="w-full text-4xl mt-10">Ayarlar</div>
      <div class="flex justify-start items-center w-full gap-3 border-b-2 border-gray-200 mt-20" ref="tabs">
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
  </div>
</template>
<script setup>
const routes = [
  {
    path: 'account',
    name: 'Account'
  }
]
</script>
