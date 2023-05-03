<template>
  <div class="w-full grid grid-cols-12">
    <div class="col-span-10 col-start-2 flex flex-col gap-16 px-12 py-6" v-for="post in posts">
      <router-link
        :to="{
          name: 'SinglePost',
          params: {
            title: post.title.replace(/ /g, '-')
          },
          query: {
            id: post._id.$oid
          }
        }"
      >
        <div class="">
          <!-- top info -->
          <div class="flex gap-2 text-center backdrop-blur-[5px] dark:bg-gray-900 bg-white dark:text-white mb-3">
            <router-link
              :to="{
                name: 'ProfileHome',
                params: { username: post.author }
              }"
            >
              <div class="flex w-full text-center items-center gap-2">
                <img class="w-10 h-10 rounded-full" :src="post.authorAvatar" alt="Author Photo" />
                <h2 class="text-lg font-bold flex items-center font-gentium cursor-pointer underline">
                  {{ post.authorName }}
                </h2>
              </div>
            </router-link>
            <p class="flex items-center">.</p>
            <p class="text-sm text-slate-600 flex items-center">
              {{ post.fulldate }}
            </p>
          </div>
          <!-- middle -->
          <div class="grid md:grid-cols-[2fr_1fr] md:flex-row min-h-[220px]">
            <div class="flex flex-col box-border px-3">
              <h1 class="text-2xl font-bold cursor-pointer">{{ post.title }}</h1>
              <p class="font-gentium">
                <span class="inline cursor-pointer" v-html="post.content.html.substring(0, 200) + '...'"></span>
              </p>
              <div class="flex mt-4 md:mt-12 mb-5 gap-4">
                <div class="flex gap-2 justify-center items-center">
                  <div v-for="tag in post.tags" class="bg-slate-200 text-sm px-2 py-1 rounded-full cursor-pointer">
                    {{ tag }}
                  </div>
                  <div class="text-sm font-gentium">{{ post.read_time }} dakika</div>
                </div>
              </div>
            </div>

            <!-- bottom -->

            <div class="flex">
              <img :src="post.image" class="object-cover w-full h-full max-h-[200px] aspect-auto md:w-full md:h-full" alt="post image" />
            </div>
            <!-- ileride content.text yap -->
          </div>
          <hr />
        </div>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import '../../src/assets/learnmore.scss'
import axiosUtil from '../utils/axios.js'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
let currentpage = ref(1)
let posts = ref([])
async function fetchPost(page) {
  axiosUtil.get('/post/fetchall/' + page).then(result => {
    if (result.data.length > 0) {
      console.log(result.data)
      currentpage.value++
      result.data.forEach(element => {
        posts.value.push(element)
      })
      posts.value.forEach(async post => {
        ///write sayfasından gönderilen post olduğu zaman commentları kaldır
        let date = new Date(post.created_at * 1000)
        let month = date.toLocaleString('tr-TR', { month: 'long' })
        let day = date.toLocaleString('tr-TR', { day: 'numeric' })
        let year = date.toLocaleString('tr-TR', { year: 'numeric' })
        let fulldate = day + ' ' + month + ' ' + year
        post.fulldate = fulldate
        await axiosUtil.get('/user/fetch/' + post.author).then(response => {
          post.authorAvatar = response.data?.avatar
          post.authorName = response.data?.name
        })
      })
    }
  })
}
let intersecting = ref(false)

const observer = () => {
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
    intersecting.value = true
  } else {
    intersecting.value = false
  }
}

// Invoke the observer function to start observing the scroll event

watch(
  () => intersecting.value,
  newValue => {
    if (newValue == true) {
      fetchPost(currentpage.value)
    }
  }
)
onMounted(() => {
  window.addEventListener('scroll', observer)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', observer)
})
const showmore = index => {
  //posts[index].showmore = true
  console.log(index)
}
const showless = index => {
  posts[index].showmore = false
}
onMounted(async () => {
  await fetchPost(currentpage.value)
})
</script>
