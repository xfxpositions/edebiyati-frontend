<template>
  <div class="w-full h-full grid grid-cols-12">
    <div v-if="selectedFile == null" class="col-span-12 flex justify-center items-center flex-wrap p-10">
      <div class="w-full flex justify-center">
        <img style="border-radius: 50% 50%; width: 300px; height: 300px" :src="imageSrc" class="cursor-pointer" @click="openFileBrowser" />
      </div>
      <div class="w-full flex justify-center">
        <input class="input hidden" type="file" accept="image/*" ref="fileInput" @change="handleFileInput" />
        <div class="cursor-pointer w-32 h-8 rounded-lg" style="background-color: aqua">
          <button class="w-full h-full items-center rounded-lg flex justify-center" v-wave @click="openFileBrowser">Avatarı Değiştir</button>
        </div>
      </div>
    </div>

    <div class="col-span-12 p-10" v-else>
      <div class="w-full flex justify-center mb-5">
        <input class="input hidden" type="file" accept="image/*" ref="fileInput" @change="handleFileInput" />
        <div class="cursor-pointer w-32 h-8 rounded-lg" style="background-color: aqua">
          <button class="w-full h-full items-center rounded-lg flex justify-center" v-wave @click="openFileBrowser">Avatarı Değiştir</button>
          <button class="w-full h-full items-center rounded-lg flex justify-center" v-wave @click="openCanvasModal">Avatarı</button>
        </div>
      </div>

      <vue-cropper
        ref="vueCropperRef"
        class="img-container"
        :src="imageSrc"
        preview=".img-preview"
        v-bind="cropperOptions"
        @cropend="cropend"
        @crop="onCrop"
      />
    </div>
    <div class="col-span-12" v-if="selectedFile != null">
      <div class="col-span-12 text-2xl flex justify-center">Önizleme</div>
      <div class="col-span-12 flex justify-center">
        <div class="img-preview" id="image-preview" style="border-radius: 50% 50%; width: 100px; height: 100px"></div>
      </div>
    </div>
  </div>
  <canvas-modal ref="canvasModalRef"></canvas-modal>
</template>

<script setup>
import VueCropper from '@ballcat/vue-cropper'
import 'cropperjs/dist/cropper.css'
import { reactive, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import CanvasModal from './CanvasModal.vue'

const props = defineProps({
  image: String
})
const emits = defineEmits(['image'])
const vueCropperRef = ref()
const imageSrc = ref('')
const selectedFile = ref(null)
const fileInput = ref(null)

onMounted(() => {
  if (props.image !== undefined) {
    imageSrc.value = props.image
  }
})
const handleFileInput = event => {
  selectedFile.value = event.target.files[0]
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    const base64Data = reader.result.split(',')[1]
    const dataUrl = `data:${file.type};base64,${base64Data}`
    imageSrc.value = dataUrl
  }
  reader.readAsDataURL(file)
}
const openFileBrowser = () => {
  fileInput.value.click()
}
const cropperOptions = reactive({
  aspectRatio: 1,
  viewMode: 3,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  modal: true,
  guides: true,
  center: true,
  highlight: true,
  background: true,
  autoCrop: true,
  movable: true,
  rotatable: true,
  scalable: true,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true
})

const cropend = () => {
  const croppedCanvas = vueCropperRef.value.getCroppedCanvas({
    width: 300, // set the width of the cropped image
    height: 300 // set the height of the cropped image
  })
  const base64 = croppedCanvas.toDataURL() // get the base64 encoded image
  localStorage.setItem('croppedImage', base64)
}
const canvasModalRef = ref()
</script>

<style scoped>
@import '../../../../src/assets/app.css';
img {
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
