<template>
  <Toast
    title="Uçmağa vardı."
    text="Bu gönderi bozkırda kaybolup gitti.."
    v-if="isDeleted"
  ></Toast>
  <div
    class="container-fluid w-100 grid grid-cols-12 dark:bg-gray-900 bg-white dark:text-white px-10 lg:px-0"
  >
    <div class="reading-progress-bar">
      <div class="progress-bar w-0 z-10" ref="progressbar"></div>
    </div>
    <div class="col-span-12 lg:col-span-9 box3 grid grid-cols-12">
      <div class="col-span-2 hidden lg:block"></div>
      <div class="col-span-12 lg:col-span-10">
        <div class="flex p-4 w-full justify-between">
          <div class="flex items-center">
            <router-link
              :to="{
                name: 'ProfileHome',
                params: { username: user.name },
              }"
            >
              <img
                class="w-12 h-12 rounded-full mr-4"
                :src="user.avatar"
                alt="Author Photo"
              />
            </router-link>
            <div>
              <router-link
                :to="{
                  name: 'ProfileHome',
                  params: { username: user.name },
                }"
              >
                <h2 class="text-lg font-semibold bg-white dark:text-white">
                  {{ user.name }}
                </h2>
              </router-link>
              <p
                class="bg-white block md:inline-block text-gray-500 dark:text-gray-300 justify-self-end w-full"
              >
                {{ data.fulldate }} . {{ data.read_time }} dakika
              </p>
            </div>
          </div>

          <div
            class="h-full dark:text-slate-100 text-gray-900 text-lg flex items-center gap-x-4"
          >
            <Vue3Lottie
              v-if="fav"
              :loop="false"
              :animationData="favoriteJSON"
              :autoPlay="true"
              :height="20"
              :width="20"
              @click="addFav"
            />

            <font-awesome-icon
              v-else
              :icon="['far', 'star']"
              class="cursor-pointer"
              @click="addFav"
            ></font-awesome-icon>

            <div class="h-full flex items-center">
              <Vue3Lottie
                :loop="1"
                :animationData="heartJSON"
                :autoPlay="false"
                :height="30"
                :width="30"
                :initial-frame="60"
                style="cursor: pointer"
                ref="likeButton"
                @click="
                  toggleLikeButton();
                  togglelike(comment.id, index);
                "
              />
              {{ data.likes.length }}
            </div>
          </div>

          <div
            class="h-full dark:text-slate-100 text-slate-100 font-bold text-xs hidden sm:block"
          >
            <div class="flex flex-wrap justify-end">
              <div
                v-for="(tag, index) in data.tags"
                class="mr-2 mt-1"
                style="height: fit-content; width: fit-content"
              >
                <a href="#" target="_blank">
                  <div
                    class="bg-green-800 text-white rounded-full px-2 py-1 h-fit flex items-center"
                  >
                    {{ tag }}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="font-bold font-gentium text-4xl p-5">{{ data.title }}</div>
        <div
          class="p-5 flex max-w-[2000px] max-h-[2000px] justify-center items-center"
        >
          <img
            class="md:w-[60%] h-3/6 object-cover rounded-md"
            :src="data.image"
          />
        </div>

        <div class="content">
          <div class="px-5" v-html="data.content.html"></div>
        </div>
      </div>
    </div>
    <div class="hidden lg:grid sm:col-span-3 sidenav p-10">
      <div class="w-full flex flex-wrap">
        <div class="w-full rounded-lg">
          <button v-wave class="w-full rounded-lg" @click="openComments">
            <font-awesome-icon :icon="['far', 'comments']" />
            Yorumlar
          </button>
        </div>
      </div>
    </div>
    <div
      class="fixed top-0 left-0 bg-slate-900 h-full w-full overlay"
      :style="[
        { 'z-index': commentsOpen ? 0 : -1 },
        { opacity: commentsOpen ? 0.3 : 0 },
      ]"
    ></div>
    <Transition name="comment">
      <div
        v-if="!commentsOpen"
        class="side-button flex justify-center items-center lg:hidden"
        @click="openComments"
      >
        <font-awesome-icon
          :icon="['far', 'comments']"
          class="cursor-pointer"
          size="xl"
          @click="addFav"
        />
      </div>
    </Transition>
    <Transition name="comment">
      <Comments
        :comment-data="data.comments"
        :post-id="id"
        v-if="commentsOpen == true"
        :scrollPos="scroll"
        @comment-close="closeComments"
      ></Comments>
    </Transition>
  </div>
  <div v-if="hisOwn" class="flex gap-5 justify-center items-center p-5">
    <router-link
      :to="'/update?id=' + id"
      class="bg-green-600 text-white rounded-full p-2 border-black"
    >
      Gönderiyi Düzenle
    </router-link>

    <button
      class="bg-red-600 text-white rounded-full p-2 border-black"
      @click="openModal"
    >
      Gönderiyi Sil
    </button>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Silmek istediğinizden emin misiniz?
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Bu işlem geri alınamaz</p>
                </div>

                <div class="mt-4 flex gap-4">
                  <button
                    type="button"
                    class="inline-flex bg-red-600 text-white justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="deletePost"
                  >
                    Sil
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    Vazgeç
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import Comments from "./SinglePost/Comments.vue";
import axiosUtil from "../utils/axios.js";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";
import favoriteJSON from "../assets/favorite.json";
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import heartJSON from "./../assets/heart.json";
import Toast from "../components/Toast.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import router from "../router/router";
import { modalstate } from "../modalState";
const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
const hisOwn = ref(false);
const isPlayingFirstPart = ref(true);
const likeButton = ref(null);
function toggleLikeButton() {
  if (localStorage.getItem("currentUser")) {
    axiosUtil
      .post(
        `/post/add_like_post/${id}?user_id=${localStorage.getItem(
          "currentUser"
        )}`
      )
      .then((response) => {
        //notification.
        if (response.data.isDeleted) {
          data.value.likes.pop();
        } else {
          data.value.likes.push("userLiked");
        }
        console.log("like added");
      });
  } else {
    console.log("giris yapilmadi");
  }
  if (isPlayingFirstPart.value) {
    // Play the first part of the animation (frames 0-40)
    likeButton.value.playSegments([0, 40], true);
  } else {
    // Play the second part of the animation (frames 40-75)
    likeButton.value.playSegments([40, 75], true);
  }
  // Toggle the isPlayingFirstPart data property
  isPlayingFirstPart.value = !isPlayingFirstPart.value;
}

onMounted(async () => {
  setTimeout(() => {
    if (data.value.likes.includes(localStorage.getItem("currentUser"))) {
      likeButton.value.playSegments([40, 41], true);
      isPlayingFirstPart.value = false;
    }
  }, 10);
});

const route = useRoute();
const id = route.query.id;
var data = ref(null);
var user = ref("");

const getuser = (userid) => {
  console.log(userid);
  axiosUtil.get("/user/fetch/" + userid).then((result) => {
    user.value = result.data;
  });
};
const isDeleted = ref(false);
const deletePost = () => {
  axiosUtil.delete(`/post/delete/${id}`).then((response) => {
    isDeleted.value = true;
    isOpen.value = false;

    setTimeout(() => {
      router.push("/");
    }, 2500);
  });
};

onMounted(() => {
  let currentUser = localStorage.getItem("currentUser");
  if (data.value.author == currentUser) {
    hisOwn.value = true;
  }
  if (currentUser) {
    axiosUtil.get("/user/fetch/" + currentUser).then((result) => {
      for (const post_id of result.data.favorites) {
        console.log(result.data.favorites);
        if (post_id == id) {
          fav.value = true;
        }
      }
    });
  } else {
    fav.value = false;
  }
});

const getarticle = () => {
  axiosUtil.get("/post/fetch/" + id).then((result) => {
    data.value = result.data;
    let date = new Date(result.data.created_at * 1000);
    let month = date.toLocaleString("tr-TR", { month: "long" });
    let day = date.toLocaleString("tr-TR", { day: "numeric" });
    let year = date.toLocaleString("tr-TR", { year: "numeric" });
    let fulldate = day + " " + month + " " + year;
    data.value.fulldate = fulldate;
    getuser(result.data.author);
    console.log(result.data);
  });
};
getarticle();
const fav = ref(false);
const addFav = (added) => {
  if (localStorage.getItem("currentUser")) {
    fav.value = !fav.value;
    axiosUtil
      .post(`/user/addbookmark/${localStorage.getItem("currentUser")}`, {
        post_id: id,
      })
      .then((response) => {
        //notification.
        console.log("fav added");
      });
    console.log("fav");
  } else {
    console.log("giris yapilmadi");
  }
};
var progressbar = ref(null);
var progressBarWidth = ref(null);
const updateProgressBarWidth = () => {
  const windowHeight = window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = pageHeight - windowHeight;
  const percentageScrolled = (scrollTop / scrollHeight) * 100;
  progressBarWidth = percentageScrolled;
  progressbar.value.style.width = progressBarWidth + "%";
};
onMounted(() => {
  window.addEventListener("scroll", updateProgressBarWidth);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateProgressBarWidth);
});
const commentsOpen = ref(false);
const openComments = () => {
  commentsOpen.value = !commentsOpen.value;
};
var scroll = ref(null);
const closeComments = (scrollPosition) => {
  scroll.value = scrollPosition;
  commentsOpen.value = !commentsOpen.value;
};
</script>

<style scoped>
.side-button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  position: fixed;
  top: calc(100% - (45px));
  right: 0;
  z-index: 4;
  background-color: rgb(196, 212, 227);
  cursor: pointer;
}
.overlay {
  transition: all 0.3s ease;
}
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
.comment-leave-active {
  transition: 0.3s ease;
  opacity: 1;
}
.comment-leave-to {
  opacity: 0;
  transform: translatex(200px);
}
.comment-enter-active {
  transition: 0.3s ease;
}
.comment-enter-from {
  transform: translatex(200px);
  opacity: 0;
}
.comment-enter-to {
  opacity: 1;
  transform: translatex(0px);
}
</style>
