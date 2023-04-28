<template>
  <div class="container-fluid w-100 grid grid-cols-12 dark:bg-gray-900 bg-white dark:text-white">
    <div class="reading-progress-bar">
      <div class="progress-bar w-0" ref="progressbar"></div>
    </div>
    <div class="col-span-12 lg:col-span-9 box3 grid grid-cols-12">
      <div class="col-span-2 hidden lg:block"></div>
      <div class="col-span-12 lg:col-span-10">
        <div class="flex p-4 w-full justify-between">
          <div class="flex items-center">
            <img class="w-12 h-12 rounded-full mr-4" :src="user.avatar" alt="Author Photo" />
            <div>
              <h2 class="text-lg font-semibold bg-white dark:text-white">{{ user.name }}</h2>
              <p class="bg-white text-gray-500 dark:text-gray-300 justify-self-end w-full">{{ data.fulldate }} . {{ data.read_time }} dakika</p>
            </div>
          </div>
          <div class="h-full dark:text-slate-100 text-gray-900 font-bold text-lg">
            <div class="flex justify-end">
              <font-awesome-icon v-if="!fav" :icon="['far', 'star']" class="cursor-pointer" @click="addFav" />
              <font-awesome-icon v-else :icon="['fas', 'star']" class="cursor-pointer" @click="addFav" />
            </div>
          </div>
          <div class="h-full dark:text-slate-100 text-slate-100 font-bold text-xs hidden sm:block">
            <div class="flex flex-wrap justify-end">
              <div v-for="(tag, index) in data.tags" class="mr-2 mt-1" style="height: fit-content; width: fit-content">
                <a href="#" target="_blank">
                  <div class="tag-box p-1 h-fit flex items-center">
                    {{ tag }}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="font-bold text-3xl p-5">{{ data.title }}</div>
        <div class="image-frame p-5">
          <img class="image" :src="data.image" />
        </div>

        <div class="content">
          <div class="px-5" v-html="data.content.html"></div>
        </div>
      </div>
    </div>
    <div class="hidden lg:grid sm:col-span-3 sidenav"></div>
  </div>
</template>

<script setup>
import axiosUtil from '../utils/axios.js'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const route = useRoute()
const id = route.query.id
var data = ref(null)
var user = ref('')

const getuser = () => {
  axiosUtil.get('/user/fetch/' + localStorage.getItem('currentUser')).then(result => {
    user.value = result.data
  })
}
getuser()
const getarticle = () => {
  axiosUtil.get('/post/fetch/' + id).then(result => {
    data.value = result.data
    let date = new Date(result.data.created_at * 1000)
    let month = date.toLocaleString('tr-TR', { month: 'long' })
    let day = date.toLocaleString('tr-TR', { day: 'numeric' })
    let year = date.toLocaleString('tr-TR', { year: 'numeric' })
    let fulldate = day + ' ' + month + ' ' + year
    data.value.fulldate = fulldate
  })
}
getarticle()
const fav = ref(false)
const addFav = () => {
  fav.value = !fav.value
  console.log('fav')
}
var progressbar = ref(null)
var progressBarWidth = ref(null)
const updateProgressBarWidth = () => {
  const windowHeight = window.innerHeight
  const pageHeight = document.documentElement.scrollHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = pageHeight - windowHeight
  const percentageScrolled = (scrollTop / scrollHeight) * 100
  progressBarWidth = percentageScrolled
  progressbar.value.style.width = progressBarWidth + '%'
}
onMounted(() => {
  window.addEventListener('scroll', updateProgressBarWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgressBarWidth)
})
</script>

<style scoped>
.reading-progress-bar {
  position: fixed;
  top: 72px;
  left: 0;
  width: 100%;
  height: 3px;
}

.progress-bar {
  height: 100%;
  background-color: #007bff;
}
.tag-box {
  border-radius: 5px;
  height: fit-content;
  background-color: crimson;
  cursor: pointer;
}
.sidenav {
  position: sticky;
  height: 100vh;
  max-height: calc(100vh - 50px);
  top: 50px;
  right: 0;
  overflow-y: scroll;
}
.image {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.image-frame {
  width: 100%;
  height: 80vh;
}
.box3 {
  height: auto;
}
</style>
