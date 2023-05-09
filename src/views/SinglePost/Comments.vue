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
            v-model="comment"
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
        <div v-for="(comment, index) in comments">
          <div style="border-bottom: 1px solid #e2e2e2">
            <div class="flex p-4 w-full justify-between">
              <div class="flex items-center">
                <router-link
                  :to="{
                    name: 'ProfileHome',
                    params: { username: 'yazilim' },
                  }"
                >
                  <div class="flex w-full text-center items-center">
                    <img
                      class="w-8 h-8 rounded-full mr-2"
                      :src="avatar"
                      alt="User Photo"
                    />
                    <div>
                      <h2 class="text-lg font-semibold">
                        {{ username }}
                      </h2>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
            <div class="w-full p-3 flex flex-wrap content-start">
              <div class="w-full bg-inherit p-2 resize-none outline-none">
                {{ comment.content }}
              </div>

              <div class="w-full pl-2 flex items-center justify-between gap-2">
                <div class="gap-2 flex">
                  <div
                    class="cursor-pointer flex items-center"
                    @click="position"
                  >
                    {{ isLiked(comment.likes) }}
                    <Vue3Lottie
                      :loop="1"
                      :animationData="heartJSON"
                      :autoPlay="false"
                      :height="30"
                      :width="30"
                      ref="lottie"
                      @click="
                        toggleAnimation(index);
                        togglelike(comment.id);
                      "
                    />

                    {{ comment.likes.length }}
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  toRaw,
  onBeforeMount,
  computed,
} from "vue";
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import heartJSON from "./heart.json";
import commentJSON from "./comment.json";
import axiosUtil from "../../utils/axios.js";
const isPlayingFirstPart = ref([]);
const lottie = ref(null);
const liked = ref(true);
function toggleAnimation(index) {
  if (isPlayingFirstPart.value[index]) {
    // Play the first part of the animation (frames 0-40)
    lottie.value[index].playSegments([0, 40], true);
  } else {
    // Play the second part of the animation (frames 40-75)
    lottie.value[index].playSegments([40, 75], true);
  }

  // Toggle the isPlayingFirstPart data property
  isPlayingFirstPart.value[index] = !isPlayingFirstPart.value[index];
}
const props = defineProps({
  scrollPos: Number,
  comments: Array,
  postId: String,
});
const deneme = [{ content: "deneme" }, { content: "deneme2" }];
const comments = ref(props.comments);
const emits = defineEmits(["commentClose"]);
var container = ref(null);
var scrollPosition = ref(null);
const commentClose = () => {
  scrollPosition = container.value.scrollTop;
  emits("commentClose", scrollPosition);
};
const isLiked = (likes) => {
  console.log(likes);
  return likes.includes(localStorage.getItem("currentUser"));
};
onBeforeMount(() => {});
onMounted(() => {
  if (lottie.value) {
    lottie.value.forEach((element) => {
      isPlayingFirstPart.value.push(true);
      console.log(isPlayingFirstPart.value);
    });
  }

  if (props.scrollPos != null) {
    container.value.scrollTop = props.scrollPos;
  }
});
const comment = ref("");
const avatar = ref(localStorage.getItem("userAvatar"));
const username = ref(localStorage.getItem("userName"));
const userId = ref(localStorage.getItem("currentUser"));

const containerheight =
  "calc(100vh - " + localStorage.getItem("navbar") + "px)";
const marginTop = localStorage.getItem("navbar") + "px";

var like = ref(false);
const togglelike = (comment_id) => {
  axiosUtil
    .post(
      `/post/add_like/${
        props.postId
      }?comment_id=${comment_id}&user_id=${localStorage.getItem("currentUser")}`
    )
    .then((response) => {
      console.log(response);
      like.value = !like.value;
    });
};
const togglecomment = () => {};
const commentSending = ref(false);
const save = () => {
  console.log(comment.value);
  if (comment.value.length > 0) {
    commentSending.value = true;
    const commentData = {
      author_id: localStorage.getItem("currentUser"),
      content: comment.value,
    };
    axiosUtil
      .post(`/post/addcomment/${props.postId}`, commentData)
      .then((response) => {
        console.log(response);
        comment.value = "";
        commentSending.value = false;
        //commentClose();
      });
  }
};
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
