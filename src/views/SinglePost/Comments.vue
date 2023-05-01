<template>
  <div class="fixed w-full overflow-auto top-0 left-0 grid grid-cols-12" :style="[{ height: containerheight }, { marginTop: marginTop }]">
    <div class="h-full col-span-2 sm:col-span-8" @click="commentClose"></div>
    <div class="h-full col-span-10 sm:col-span-4 dark:bg-gray-900 bg-gray-100 dark:text-white p-5 flex flex-wrap content-start">
      <div class="w-full text-2xl font-bold flex justify-between">
        <div>Yorumlar(1)</div>
        <div><font-awesome-icon :icon="['fas', 'xmark']" class="cursor-pointer" @click="commentClose" /></div>
      </div>
      <!--Comment write-->
      <div class="w-full mt-5 rounded-lg shadow-xl flex flex-wrap content-start border border-b-2 bg-white">
        <div class="flex p-4 w-full justify-between">
          <div class="flex items-center">
            <img class="w-12 h-12 rounded-full mr-4" :src="avatar" alt="User Photo" />
            <div>
              <h2 class="text-lg font-semibold">
                {{ username }}
              </h2>
            </div>
          </div>
        </div>
        <div class="w-full p-3 flex flex-wrap content-start">
          <textarea v-model="comment" class="w-full bg-inherit p-2 resize-none outline-none" placeholder="Düşüncelerini Yaz"></textarea>
          <div class="w-full flex justify-end">
            <div class="accept button flex items-center justify-center" @click="save">Gönder</div>
          </div>
        </div>
      </div>
      <!--Comments-->
      <div class="w-full mt-5 rounded-lg shadow-xl content-start border border-b-2 bg-white">
        <div style="border-bottom: 1px solid #e2e2e2">
          <div class="flex p-4 w-full justify-between">
            <div class="flex items-center">
              <img class="w-8 h-8 rounded-full mr-2" :src="avatar" alt="User Photo" />
              <div>
                <h2 class="text-lg font-semibold">
                  {{ username }}
                </h2>
              </div>
            </div>
          </div>
          <div class="w-full p-3 flex flex-wrap content-start">
            <div class="w-full bg-inherit p-2 resize-none outline-none">Yorum</div>
            <div class="w-full pl-2 flex items-center justify-between gap-2">
              <div class="gap-2 flex">
                <div>
                  <font-awesome-icon :icon="['far', 'heart']" size="lg" />
                  0
                </div>
                <font-awesome-icon :icon="['far', 'comment']" size="lg" />
                0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const emits = defineEmits(['commentClose'])
const commentClose = () => {
  emits('commentClose')
}
const comment = ref('')
const avatar = ref(localStorage.getItem('userAvatar'))
const username = ref(localStorage.getItem('userName'))
const containerheight = 'calc(100vh - ' + localStorage.getItem('navbar') + 'px)'
const marginTop = localStorage.getItem('navbar') + 'px'
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
