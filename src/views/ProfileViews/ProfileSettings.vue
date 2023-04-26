<template>
  <div class="main mt-5">
    <div class="w-full text-4xl">Settings</div>
    <div class="flex justify-start items-center w-full gap-3 border-b-2 border-gray-200 mt-10" ref="tabs">
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
</template>
<script setup>
const routes = [
  {
    path: 'account',
    name: 'Account'
  }
]
</script>
<style scoped>
.main {
  width: 100%;
  height: 1500px;
}
</style>
