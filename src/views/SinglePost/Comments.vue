<template>
  <div
    class="fixed w-full overflow-auto top-0 left-0 grid grid-cols-12"
    ref="container"
    :style="[{ height: containerheight }, { marginTop: marginTop }]"
  >
    <div class="h-full col-span-2 lg:col-span-9" @click="commentClose"></div>
    <div
      class="h-full col-span-10 lg:col-span-3 dark:bg-gray-900 bg-gray-100 dark:text-white p-5 flex flex-wrap content-start"
    >
      <div class="w-full text-2xl font-bold flex justify-between">
        <div>Yorumlar(1)</div>
        <div>
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            class="cursor-pointer"
            @click="commentClose"
          />
        </div>
      </div>
      <!--Comment write-->
      <div
        class="w-full mt-5 rounded-lg shadow-xl flex flex-wrap content-start border border-b-2 bg-white"
      >
        <div class="flex p-4 w-full justify-between">
          <div class="flex items-center">
            <img
              class="w-12 h-12 rounded-full mr-3"
              :src="avatar"
              alt="User Photo"
            />
            <div>
              <h2 class="text-lg font-semibold">
                {{ username }}
              </h2>
            </div>
          </div>
        </div>
        <div class="w-full p-3 flex flex-wrap content-start">
          <textarea
            v-model="commentText"
            class="w-full bg-inherit p-2 resize-none outline-none"
            placeholder="Düşüncelerini Yaz"
          ></textarea>
          <div class="w-full flex justify-end">
            <div
              v-wave="{ initialOpacity: 0.8 }"
              class="accept button flex items-center justify-center"
              @click="save"
            >
              Gönder
            </div>
          </div>
        </div>
      </div>
      <!--Comments-->
      <div
        class="w-full mt-5 rounded-lg shadow-xl content-start border border-b-2 bg-white"
      >
        <div style="border-bottom: 1px solid #e2e2e2">
          <template v-for="comment in comments">
            <div class="flex p-4 w-full justify-between">
              <div class="flex items-center">
                <router-link
                  :to="{
                    name: 'ProfileHome',
                    params: { username: comment.author_data.name },
                  }"
                >
                  <div class="flex w-full text-center items-center">
                    <img
                      class="w-8 h-8 rounded-full mr-2"
                      :src="comment.author_data.avatar"
                      alt="User Photo"
                    />
                    <div>
                      <h2 class="text-lg font-semibold">
                        {{ comment.author_data.name }}
                      </h2>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
            <div style="border-bottom: 1px solid #e2e2e2">
              <div class="w-full p-3 flex flex-wrap content-start">
                <div class="w-full bg-inherit p-2 resize-none outline-none">
                  {{ comment.content }}
                </div>

                <div
                  class="w-full pl-2 flex items-center justify-between gap-2"
                >
                  <div class="gap-2 flex">
                    <div
                      class="cursor-pointer flex items-center"
                      @click="position"
                    >
                      <Vue3Lottie
                        :loop="1"
                        :animationData="heartJSON"
                        :autoPlay="false"
                        :height="30"
                        :width="30"
                        ref="lottie"
                        @click="toggleAnimation"
                      />

                      0
                    </div>

                    <div
                      class="cursor-pointer flex items-center gap-1"
                      @click="togglecomment"
                    >
                      <Vue3Lottie
                        :animationData="commentJSON"
                        :autoPlay="true"
                        :height="30"
                        :width="30"
                      />
                      0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, toRaw, onBeforeMount } from "vue";
import axiosUtil from "../../utils/axios.js";
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import heartJSON from "./heart.json";
import commentJSON from "./comment.json";
const isPlayingFirstPart = ref(true);
const lottie = ref(null);
function toggleAnimation() {
  if (isPlayingFirstPart.value) {
    // Play the first part of the animation (frames 0-40)
    lottie.value.playSegments([0, 40], true);
  } else {
    // Play the second part of the animation (frames 40-75)
    lottie.value.playSegments([40, 75], true);
  }

  // Toggle the isPlayingFirstPart data property
  isPlayingFirstPart.value = !isPlayingFirstPart.value;
}
const props = defineProps(["scrollPos", "commentData"]);
const emits = defineEmits(["commentClose"]);
var container = ref(null);
var scrollPosition = ref(null);
const commentClose = () => {
  scrollPosition = container.value.scrollTop;
  emits("commentClose", scrollPosition);
};
const comments = ref([]);
onBeforeMount(() => {
  comments.value = props.commentData;
  console.log(`comments =>`);
  console.log(props.comments_data);

  for (let comment of comments.value) {
    let author = {};
    axiosUtil
      .get(`/user/fetch/${comment.author_id}?fields=avatar,name,email`)
      .then((response) => {
        author = response.data;
        console.log(author);
        comment.author_data = author;
      });
  }
});

onMounted(() => {
  if (props.scrollPos != null) {
    container.value.scrollTop = props.scrollPos;
  }
});
const commentText = ref("");
const avatar = ref(localStorage.getItem("userAvatar"));
const username = ref(localStorage.getItem("userName"));
const containerheight =
  "calc(100vh - " + localStorage.getItem("navbar") + "px)";
const marginTop = localStorage.getItem("navbar") + "px";

var like = ref(false);
const togglelike = () => {
  like = !like;
};
const togglecomment = () => {};
</script>

<style scoped>
.cancel {
  color: rgb(35, 151, 0);
}
.accept {
  background-color: greenyellow;
  color: aliceblue;
}
.button {
  cursor: pointer;
  font-weight: bold;
  width: 100px;
  height: 40px;
  border: 1px solid greenyellow;
  border-radius: 20px;
}
</style>
