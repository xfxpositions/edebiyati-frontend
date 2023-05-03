<template>
  <div class="p-4">
    <h1 class="font-gentium text-4xl font-semibold">Favorilerim</h1>
    <hr class="mb-6" />
    <template v-if="posts.length > 0">
      <div class="flex flex-col gap-16 px-12 py-6" v-for="post in posts">
        <router-link
          :to="{
            name: 'SinglePost',
            params: {
              title: post.title.replace(/ /g, '-'),
            },
            query: {
              id: post._id.$oid,
            },
          }"
        >
          <div class="">
            <!-- top info -->
            <div
              class="flex gap-2 text-center backdrop-blur-[5px] dark:bg-gray-900 bg-white dark:text-white mb-3"
            >
              <img
                class="w-10 h-10 rounded-full"
                :src="post.authorAvatar"
                alt="Author Photo"
              />
              <h2
                class="text-lg font-bold flex items-center font-gentium cursor-pointer underline"
              >
                {{ post.authorName }}
              </h2>
              <p class="flex items-center">.</p>
              <p class="text-sm text-slate-600 flex items-center">
                {{ post.fulldate }}
              </p>
            </div>
            <!-- middle -->
            <div class="grid md:grid-cols-[2fr_1fr] md:flex-row min-h-[220px]">
              <div class="flex flex-col box-border px-3">
                <h1 class="text-2xl font-bold cursor-pointer">
                  {{ post.title }}
                </h1>
                <p class="font-gentium">
                  <span
                    class="inline cursor-pointer"
                    v-html="post.content.html.substring(0, 200) + '...'"
                  ></span>
                </p>
                <div class="flex mt-4 md:mt-12 mb-5 gap-4">
                  <div class="flex gap-2 justify-center items-center">
                    <div
                      v-for="tag in post.tags"
                      class="bg-slate-200 text-sm px-2 py-1 rounded-full cursor-pointer"
                    >
                      {{ tag }}
                    </div>
                    <div class="text-sm font-gentium">
                      {{ post.read_time }} dakika
                    </div>
                  </div>
                </div>
              </div>

              <!-- bottom -->

              <div class="flex">
                <img
                  :src="post.image"
                  class="object-cover w-full h-full max-h-[200px] aspect-auto md:w-full md:h-full"
                  alt="post image"
                />
              </div>
              <!-- ileride content.text yap -->
            </div>
            <hr />
          </div>
        </router-link>
      </div>
    </template>
    <template v-else>
      <h1 class="font-bold text-3xl">Favorilere hiç gönderi eklenmemiş :|</h1>
      <router-link class="text-xl text-green-700 underline font-gentium" to="/"
        >Hadi yeni gönderiler ekle!</router-link
      >
    </template>
  </div>
</template>
<script setup>
import "../../src/assets/learnmore.scss";
import axiosUtil from "../utils/axios.js";
import { onMounted, onBeforeUnmount, ref, watch, onBeforeMount } from "vue";
let posts = ref([]);
onBeforeMount(() => {
  console.log("hold on");
  axiosUtil
    .get(`/user/fetch/${localStorage.getItem("currentUser")}?fields=favorites`)
    .then((response) => {
      let postsResponse = response.data.favorites;
      for (const post_id of postsResponse) {
        axiosUtil.get(`/post/fetch/${post_id}`).then((response) => {
          console.log("favorites");
          console.log(response.data);
          let a = response.data;
          axiosUtil.get("/user/fetch/" + a.author).then((response) => {
            a.authorName = response.data.name;
            a.authorAvatar = response.data.avatar;
            posts.value.push(a);
          });
        });
      }
    })
    .catch((error) => {
      console.log("error on fetching favorites" + error);
    });
});
</script>
