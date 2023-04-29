<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 rounded-lg overflow-hidden"
      style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px important!"
    >
      <div
        class="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 bg-[url('https://media.timeout.com/images/105702184/1024/768/image.jpg')] bg-cover bg-no-repeat"
      >
        <div
          class="p-6 space-y-4 md:space-y-6 sm:p-8 transition-all 1s ease-in-out backdrop-blur-[3px]"
        >
          <h1
            class="text-4xl text-center font-gentium font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
          >
            İçeriye adım atın.
          </h1>
          <hr />
          <div class="flex flex-col gap-5 justify-center items-center">
            <GoogleAuth @on-sign-in="handleGoogle"></GoogleAuth>
          </div>
          <div
            class="bg-slate-50 bg-opacity-90 backdrop-blur-[10px] hover:bg-opacity-75 transition-all duration-200 ease-in-out cursor-pointer select-none border rounded-full inline-flex items-center px-5 py-2"
          >
            <img
              class="w-[20px] h-[20px] mr-2"
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            />
            <h2 class="text-sm font-medium">Github ile kayıt olun.</h2>
          </div>
        </div>
        <form class="space-y-4 md:space-y-6" action="#" autocomplete="off">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >E-Posta Adresiniz</label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="isim@eposta.com"
              required=""
              v-model="email"
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Şifreniz</label
            >
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required="true"
            />
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Şifrenizi tekrar girmeye ne dersiniz</label
            >

            <input
              v-model="repassword"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required="true"
            />
            <p
              v-if="!filters.passwordMatches.value"
              class="bg-red-50 bg-opacity-60 text-sm text-red-700 font-semibold rounded-md mt-2"
            >
              {{ filters.passwordMatches.message }}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-start">
              {{ responseText && responseText }}
            </div>
          </div>
          <button
            type="submit"
            class="w-full text-gray-50 bg-gray-900 shadow-md bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            @click="handleSubmit"
          >
            Kayıt ol!
          </button>
          <p class="text-sm font-light text-gray-200 dark:text-gray-400"></p>
          <p class="font-semibold">Zaten üye misiniz?</p>
          <a
            href="#"
            class="font-bold underline hover:underline dark:text-primary-500"
            >Giriş yap!</a
          >
        </form>
      </div>
    </div>
    <p>{{ email }}</p>
    <p>{{ password }}</p>
  </section>
</template>
<script setup>
import GoogleAuth from "../components/GoogleAuth.vue";
import axios from "../utils/axios.js";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const email = ref("");
const password = ref("");
const repassword = ref("");
const responseText = ref("");

const sent = ref(false);

const filters = ref({
  passwordMatches: {
    value: true,
    message: "",
  },
});

watch([password, repassword], ([newPassword, newRepassword]) => {
  if (newPassword !== newRepassword) {
    filters.value.passwordMatches.message = "Şifreler birbiri ile uyuşmuyor.";
    filters.value.passwordMatches.value = false;
  } else {
    filters.value.passwordMatches.message = "";
    filters.value.passwordMatches = true;
  }
});
let userToSend = {};
const handleGoogle = (code) => {
  axios
    .post(
      "/user/getgoogleuser",
      {
        token: code,
      },
      { timeout: 15000 }
    )
    .then((response) => {
      const googleData = response.data;
      userToSend.email = googleData.email;
      userToSend.registred_via = "Google";
      userToSend.avatar = googleData.picture;
      userToSend.name = googleData.given_name;
    })
    .catch((error) => {
      console.error(error);
    });
  console.log("handle google");
};
const handleSubmit = async (e) => {
  if (userToSend.registred_via != "Google") {
    console.log("signup with email");
    userToSend.registred_via = "Email";
    userToSend.email = email.value;
    userToSend.password = password.value;
  }
  sent.value = true;
  console.log(userToSend);
  axios
    .post("/user/create", userToSend)
    .then((response) => {
      if (response.status == 200) {
        responseText.value == "Başarılı, Edebiyati.org'a hoşgeldiniz!";
      }
      console.log(response);
      router.push({ path: "/signin" });
    })
    .catch((error) => {
      console.log(error.message);
    });
  e.preventDefault();
};
</script>
