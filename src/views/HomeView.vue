<template>
  <div>
    <SignInVue></SignInVue>

    <div
      class="p-8 pt-16 border-black border bg-[#819417]"
      :class="{ 'opacity-25': modalstate }"
    >
      <h1
        class="mb-4 text-4xl font-bold font-gentium tracking-tight text-gray-900 lg:font-extrabold lg:text-4xl lg:leading-none dark:text-white lg:mb-7"
      >
        Edebiyat ve Dil hakkında bilmek istediklerin..
      </h1>
      <h2
        class="mb-4 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl lg:leading-none dark:text-white lg:mb-7"
      >
        Edebiyati.org sayesinde diller ve edebiyat hakkında yeni şeyler
        öğrenebilirsiniz.
      </h2>
      <button
        class="px-8 bg-gray-900 text-white rounded-lg py-3 shadow-md hover:shadow-lg"
      >
        Okumaya Başlayın
      </button>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import SignInVue from "../components/SignIn.vue";
import { modalstate } from "../modalState";
</script>
<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translatey(100px);
}
</style>
