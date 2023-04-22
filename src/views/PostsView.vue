<template>
  <div class="w-full grid grid-cols-12">
    <div class="col-span-12 lg:col-span-8 lg:col-start-3">
      <template v-for="(post, index) in posts">
        <section>
          <div class="max-h-(screen-h-50) background rounded-lg mt-5">
            <!-- Info Top section -->
            <div class="-200 p-4 flex justify-between">
              <span class="text-black">John Doe tarafından {{ post.fulldate }} tarihinde gönderildi</span>
              <div>
                <span>{{ post.views }} defa görüntülendi</span>
              </div>
            </div>
            <!-- Author section -->
            <div class="flex p-4 w-full">
              <div class="flex items-center w-6/12">
                <img class="w-12 h-12 rounded-full mr-4" src="../assets/profile.png" alt="Author Photo" />
                <div>
                  <h2 class="text-lg font-semibold text-gray-700">John Doe</h2>
                  <p class="text-gray-700 justify-self-end">Bu Makalenin Yazarı</p>
                </div>
              </div>
              <div class="h-full text-slate-100 w-6/12 text-xs">
                <div class="flex flex-wrap justify-end">
                  <div v-for="(tag, index) in post.tags" class="mr-2 mt-1" style="height: fit-content; width: fit-content">
                    <a :href="'#' + tag" target="_blank">
                      <div class="tag-box p-1 h-fit flex items-center">
                        {{ tag }}
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- Image section -->
            <div class="" style="height: 70vh">
              <img class="h-full w-full object-cover object-center rounded-lg" :src="post.image" alt="Main Image" />
            </div>
            <!-- Title section -->
            <div class="pl-4 pr-4">
              <h3 class="text-2xl font-semibold text-black">{{ post.title }}</h3>
            </div>

            <!-- Preview section -->
            <div class="px-4 text-gray-900 overflow-hidden transition-all duration-200 ease-in-out" ref="container">
              <!--<div ref="longabbr" :hidden="post.showmore != true" v-html="'<p>' + post.longabbr + '</p>'"></div>-->
              <!--<div ref="abbr" :hidden="post.showmore == true" v-html="post.abbr + '...'"></div>-->
              <div ref="abbr" v-html="post.content.html"></div>
            </div>
            <!--<div v-if="data.showmore == true" class="font-bold pl-4 show-more" @click="showless(index)">Daha Az</div>-->
            <div class="font-bold pl-4 show-more" @click="showmore(index)">Daha Fazla</div>
            <div id="container" class="mt-2">
              <button class="learn-more">
                <span class="circle flex items-center" aria-hidden="true">
                  <span class="icon arrow"></span>
                </span>
                <span class="button-text flex items-center ml-8">Okumaya Devam Et</span>
              </button>
            </div>

            <!-- Footer section -->
            <div class="pr-4 pl-4 py-2">
              <div class="flex justify-between items-center">
                <div>
                  <button class="mr-2 button">
                    <font-awesome-icon :icon="['fas', 'thumbs-up']" size="lg" class="ease duration-300 text-black hover:text-gray-600" />
                    {{ post.likes }}
                  </button>
                  <button class="mr-2 button">
                    <font-awesome-icon :icon="['fas', 'thumbs-down']" size="lg" class="ease duration-300 text-black hover:text-gray-600" />
                    {{ post.dislikes }}
                  </button>
                  <button class="button">
                    <font-awesome-icon :icon="['fas', 'comments']" size="lg" class="ease duration-300 text-black hover:text-gray-600" />
                  </button>
                </div>
                <div>
                  <button>
                    <font-awesome-icon :icon="['fas', 'share']" size="lg" class="ease duration-300 text-black hover:text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>
<script setup>
import '../../src/assets/learnmore.scss'
import axiosUtil from '../utils/axios.js'
import { onMounted, ref } from 'vue'
let page = ref(1)
let posts = ref([])
async function fetchPost(page) {
  axiosUtil.get('/post/fetchall/' + page).then(result => {
    result.data.forEach(element => {
      posts.value.push(element)
    })
    posts.value.forEach(post => {
      ///write sayfasından gönderilen post olduğu zaman commentları kaldır
      /*post.longabbr = data.content.split('<p>')[1].split('</p>')[0]
      let array = data.content.split(' ').slice(0, 26)
      let string = array.join(' ')
      post.abbr = string*/
      let date = new Date(post.created_at * 1000)
      let month = date.toLocaleString('tr-TR', { month: 'long' })
      let day = date.toLocaleString('tr-TR', { day: 'numeric' })
      let year = date.toLocaleString('tr-TR', { year: 'numeric' })
      let fulldate = day + ' ' + month + ' ' + year
      post.fulldate = fulldate
    })
  })
}
const showmore = index => {
  //posts[index].showmore = true
  console.log(index)
}
const showless = index => {
  posts[index].showmore = false
}
onMounted(async () => {
  await fetchPost(page.value)
})
</script>
<style scoped>
.button {
  width: 40px;
}
.tag-box {
  border-radius: 5px;
  height: fit-content;
  background-color: crimson;
  cursor: pointer;
}
.show-more {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.show-more:hover {
  color: rgb(19, 106, 205);
}
.background {
  background-color: rgb(212, 212, 212);
}
.page-footer {
  height: 50px;
}
</style>
