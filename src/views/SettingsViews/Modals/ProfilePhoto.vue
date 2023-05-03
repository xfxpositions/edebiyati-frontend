<template>
  <Transition name="transition">
    <div class="fixed-container flex justify-center items-center">
      <div class="sub-layer flex justify-center items-center" @click="modal"></div>

      <div class="modal p-10 grid grid-cols-12">
        <div class="col-span-12 text-2xl flex justify-between mb-2 h-6">
          <div>Profil Fotoğrafı</div>
          <div class="cursor-pointer" @click="modal">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </div>
        </div>
        <div class="col-span-12" style="height: 530px; overflow-y: auto">
          <TestingVue :image="avatar"></TestingVue>
        </div>
        <div class="col-span-12 flex justify-end items-end gap-3 mt-5">
          <button v-wave class="cancel button flex items-center justify-center" @click="modal">İptal</button>
          <button
            v-wave="{
              initialOpacity: 0.8
            }"
            class="accept button flex items-center justify-center"
            @click="save"
          >
            Kaydet
          </button>
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
import axiosUtil from '../../../utils/axios.js'

const emit = defineEmits(['eventA', 'saveInput'])
const modal = () => {
  emit('eventA')
}
const props = defineProps({
  avatar: String
})
const save = () => {
  console.log('saving')
  if (localStorage.getItem('croppedImage') != null) {
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, { type: mime })
    }
    let imageB64 = localStorage.getItem('croppedImage')
    let avatarToUpload = dataURLtoFile(imageB64, 'avatar.png')
    let formData = new FormData()
    formData.append('avatar', avatarToUpload)
    axiosUtil
      .post(`/user/changeavatar/${localStorage.getItem('currentUser')}`, formData)
      .then(response => {
        if (response.status == 200) {
          console.log('avatar changed successfully')
          //notification
          modal()
        }
      })
      .catch(error => {
        console.log(`error => ${error}`)
        //notification
      })
    localStorage.removeItem('croppedImage')
  }
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
