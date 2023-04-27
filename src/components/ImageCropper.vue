<template>
  <vue-cropper ref="vueCropperRef" :src="imgSrc" alt="Source Image" />
</template>

<script setup>
import VueCropper from '@ballcat/vue-cropper'
const imgSrc = '../assets/image.jpg'

const vueCropperRef = ref(null)

onMounted(() => {
  console.log(vueCropperRef.value.getData())
})
</script>
