<template>
  <div class="p-4">
    <div class="font-gentium text-2xl font-semibold mb-4">Gönderiler</div>
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
              :src="user.avatar"
              alt="Author Photo"
            />
            <h2
              class="text-lg font-bold flex items-center font-gentium cursor-pointer underline"
            >
              {{ user.name }}
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
  </div>
</template>
<script setup>
import axiosUtil from "../../utils/axios.js";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Posts from "../../components/Posts.vue";
const route = useRoute();
const id = route.query.id;
const username = route.params.username;
let posts = ref([]);
let user = ref({});
onMounted(() => {
  axiosUtil.get(`/user/getbyname/${username}`).then((response) => {
    user.value = response.data;
    let postsResponse = response.data.posts;

    for (const post_id of postsResponse) {
      axiosUtil.get(`/post/fetch/${post_id}`).then((response) => {
        let post = response.data;
        let date = new Date(post.created_at * 1000);
        let month = date.toLocaleString("tr-TR", { month: "long" });
        let day = date.toLocaleString("tr-TR", { day: "numeric" });
        let year = date.toLocaleString("tr-TR", { year: "numeric" });
        let fulldate = day + " " + month + " " + year;
        post.fulldate = fulldate;
        posts.value.push(post);
      });
    }
  });
});
</script>
