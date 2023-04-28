<template>
  <Transition name="transition">
    <div class="fixed-container flex justify-center items-center">
      <div class="sub-layer flex justify-center items-center" @click="modal"></div>

      <div class="modal flex p-10 flex-wrap">
        <div class="w-full text-2xl flex justify-between">
          <div>Profil Fotoğrafı</div>
          <div class="cursor-pointer" @click="modal"><font-awesome-icon :icon="['fas', 'xmark']" /></div>
        </div>
        <div class="w-full flex justify-center">
          <div class="w-full h-96">
            <div class="container">
              <div>
                <vue-cropper ref="vueCropperRef" :src="imgSrc" alt="Source Image" />
                <button @click="saveCroppedImage">Save</button>
              </div>
              <div><img :src="dataUrl" /></div>
            </div>
          </div>
          <!--<div class="avatar"><img :src="avatar" class="w-full h-full" style="border-radius: 50% 50%" /></div>-->
        </div>
        <div class="w-full flex justify-end items-end gap-3">
          <div class="cancel button flex items-center justify-center" @click="saveCrop">deneme</div>
          <div class="cancel button flex items-center justify-center" @click="modal">İptal</div>
          <div class="accept button flex items-center justify-center" @click="save">Kaydet</div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import VueCropper from '@ballcat/vue-cropper'
import 'cropperjs/dist/cropper.css'
import 'cropperjs/dist/cropper.min.css'
import { ref, onMounted, onUnmounted } from 'vue'
import '../../../../src/assets/input.css'
import ImageCropper from '../../../../src/components/ImageCropper.vue'

const imgSrc = ref('../../../../src/assets/image.jpg')
const vueCropperRef = ref(null)
const dataUrl = ref(null)
onMounted(() => {
  console.log(vueCropperRef.value.getData())
})
const saveCroppedImage = () => {
  const croppedCanvas = vueCropperRef.value?.getCroppedCanvas({
    maxWidth: 1000,
    maxHeight: 1000
  })
  if (croppedCanvas) {
    dataUrl.value = croppedCanvas.toDataURL()
    // now you can do something with the data URL, such as:
    // save it to server using AJAX, or
    // display it in an <img> tag on the page
    console.log(dataUrl.value)
  }
}
const emit = defineEmits(['eventA', 'saveInput'])
const modal = () => {
  console.log('a')
  emit('eventA')
}
const props = defineProps({
  avatar: String
})
const modelname = ref(props.username)
const save = () => {
  emit('saveInput', modelname.value)
  modal()
}
</script>
<style scoped>
cropper-handle {
  height: 200px;
}
.container {
  display: flex;
  justify-content: center;
  justify-items: center;
}
#output {
  margin: 0 5px;
}
img {
  display: block;
  width: 500px;
  height: 400px;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
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
  width: 800px;
  height: 600px;
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
