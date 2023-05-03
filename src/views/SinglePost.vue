<template>
  <div
    class="container-fluid w-100 grid grid-cols-12 dark:bg-gray-900 bg-white dark:text-white px-10 lg:px-0"
  >
    <div class="reading-progress-bar">
      <div class="progress-bar w-0" ref="progressbar"></div>
    </div>
    <div class="col-span-12 lg:col-span-9 box3 grid grid-cols-12">
      <div class="col-span-2 hidden lg:block"></div>
      <div class="col-span-12 lg:col-span-10">
        <div class="flex p-4 w-full justify-between">
          <div class="flex items-center">
            <router-link
              :to="{
                name: 'ProfileHome',
                params: { username: data.author },
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
                  params: { username: data.author },
                }"
              >
                <h2 class="text-lg font-semibold bg-white dark:text-white">
                  {{ user.name }}
                </h2>
              </router-link>
              <p
                class="bg-white text-gray-500 dark:text-gray-300 justify-self-end w-full"
              >
                {{ data.fulldate }} . {{ data.read_time }} dakika
              </p>
            </div>
          </div>
          <div
            class="h-full dark:text-slate-100 text-gray-900 font-bold text-lg"
          >
            <div class="flex justify-end">
              <font-awesome-icon
                v-if="!fav"
                :icon="['far', 'star']"
                class="cursor-pointer"
                @click="addFav"
              />
              <font-awesome-icon
                v-else
                :icon="['fas', 'star']"
                class="cursor-pointer"
                @click="addFav"
              />
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
        v-if="commentsOpen == true"
        :scrollPos="scroll"
        @comment-close="closeComments"
      ></Comments>
    </Transition>
  </div>
</template>

<script setup>
import Comments from "./SinglePost/Comments.vue";
import axiosUtil from "../utils/axios.js";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";
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

onMounted(() => {
  let currentUser = localStorage.getItem("currentUser");
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
