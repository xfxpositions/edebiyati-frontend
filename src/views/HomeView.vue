<template>
  <div v-if="!userLogged">
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
        Bitigin.org sayesinde diller ve edebiyat hakkında yeni şeyler
        öğrenebilirsiniz.
      </h2>
      <RouterLink to="/posts">
        <button
          class="px-8 bg-gray-900 text-white rounded-lg py-3 shadow-md hover:shadow-lg"
        >
          Okumaya Başlayın
        </button>
      </RouterLink>
    </div>
  </div>
  <div v-else>
    <div
      class="p-8 pt-16 border-black border bg-[#819417]"
      :class="{ 'opacity-25': modalstate }"
    >
      <h1
        class="mb-4 text-4xl font-bold font-gentium tracking-tight text-gray-900 lg:font-extrabold lg:text-4xl lg:leading-none dark:text-white lg:mb-7"
      >
        <Section delay="300"> Bitigin.org'a tekrardan hoşgeldiniz! </Section>
      </h1>
      <h2
        class="mb-4 text-xl font-bold tracking-tight text-gray-900 lg:text-2xl lg:leading-none dark:text-white lg:mb-7"
      >
        <Section delay="1000"> İşte sizin için seçtiğimiz yazılar </Section>
      </h2>
    </div>
  </div>
  <!-- <Toast text="deneme" title="zibidi"></Toast> -->
  <Posts></Posts>
</template>
<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import SignInVue from "../components/SignIn.vue";
import { modalstate } from "../modalState";
import Posts from "../components/Posts.vue";
import Toast from "../components/Toast.vue";
const userLogged = localStorage.getItem("currentUser");
import Section from "../components/Section.vue";
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
