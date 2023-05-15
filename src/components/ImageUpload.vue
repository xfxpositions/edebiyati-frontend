<!-- <template>
  <div class="max-w-xl font-gentium">
    <label
      class="flex justify-center w-full h-[100%] px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
    >
      <span class="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <span class="font-medium text-gray-600">
          Dosyaları
          <span class="hidden sm:inline">sürükleyip bırakın ya da </span>
          <span class="text-blue-600 underline">seçin</span>
        </span>
      </span>
      <input type="file" name="file_upload" class="hidden" type="file" accept="image/*" ref="fileInput" @change="handleFileInput" />
    </label>
  </div>
</template>
<script setup>

</script> -->

<template>
  <h1 class="text-center text-lg md:text-2xl font-gentium">Gönderi Resmi</h1>
  <div class="wrapper" ref="wrapper">
    <label
      class="mb-4 flex justify-center w-full h-[100%] px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
    >
      <span class="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <span class="font-medium text-gray-600">
          Dosyaları
          <span class="hidden sm:inline">sürükleyip bırakın ya da </span>
          <span class="text-blue-600 underline">seçin</span>
        </span>
      </span>
      <input
        type="file"
        name="file_upload"
        class="hidden"
        accept="image/*"
        ref="fileInput"
        @change="handleFileInput"
      />
    </label>
  </div>
  <div class="flex justify-center align-center rounded-md overflow-hidden">
    <img class="max-h-80" v-if="image" :src="image" alt="" />
  </div>
</template>
<script setup>
import { ref, defineEmits, onMounted } from "vue";

const emit = defineEmits(["inFocus", "imageUpload"]);
const props = defineProps(["src"]);

const fileInput = ref(null);
const selectedFile = ref(null);
const image = ref(null);

onMounted(() => {
  image.value = props.src;
});

const handleFileInput = (event) => {
  selectedFile.value = event.target.files[0];
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const base64Data = reader.result.split(",")[1];
    const dataUrl = `data:${file.type};base64,${base64Data}`;
    image.value = dataUrl;
    emit("imageUpload", selectedFile.value);
  };
  reader.readAsDataURL(file);
};
</script>
