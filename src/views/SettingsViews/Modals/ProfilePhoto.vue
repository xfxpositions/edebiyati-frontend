<template>
  <Transition name="transition">
    <div class="fixed-container flex justify-center items-center">
      <div class="sub-layer flex justify-center items-center" @click="modal"></div>

      <div class="modal p-10 grid grid-cols-12">
        <div class="col-span-12 text-2xl flex justify-between mb-2 h-6">
          <div>Profil Fotoğrafı</div>
          <div class="cursor-pointer" @click="modal"><font-awesome-icon :icon="['fas', 'xmark']" /></div>
        </div>
        <div class="col-span-12" style="height: 530px; overflow-y: auto">
          <TestingVue :image="avatar"></TestingVue>
        </div>
        <div class="col-span-12 flex justify-end items-end gap-3 mt-5">
          <div class="cancel button flex items-center justify-center" @click="modal">İptal</div>
          <div class="accept button flex items-center justify-center" @click="save">Kaydet</div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import 'cropperjs/dist/cropper.css'
import 'cropperjs/dist/cropper.min.css'
import { ref, onMounted, onUnmounted, watch, reactive } from 'vue'
import '../../../../src/assets/input.css'
import TestingVue from './TestingVue.vue'
import axios from 'axios'

const emit = defineEmits(['eventA', 'saveInput'])
const modal = () => {
  emit('eventA')
}
const props = defineProps({
  avatar: String
})
const save = () => {
  if (localStorage.getItem('croppedImage') != null) {
    console.log(localStorage.getItem('croppedImage'))
    let formData = new FormData()
    formData.append('avatar', localStorage.getItem('croppedImage'))
    //axios.post bla bla ekle işte amk
    localStorage.removeItem('croppedImage')
  }
  modal()
}
</script>
<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50% 50%;
}
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
.modal {
  width: 1000px;
  height: calc(100vh - 72px);
  margin-top: 72px;
  background-color: rgb(238, 238, 238);
  z-index: 4;
  border-radius: 15px;
}
.fixed-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
.sub-layer {
  background-color: rgba(24, 24, 24, 0);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>
