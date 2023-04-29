<script setup>
import { googleAuthCodeLogin } from "vue3-google-login";
import { defineEmits } from "vue";
const emit = defineEmits(["onSignIn", "onJustCode"]);

const login = () => {
  googleAuthCodeLogin().then((response) => {
    console.log("Handle the response", response);
    const code = response?.code;
    emit("onSignIn", code);
  });
};
</script>

<template>
  <button @click="login">
    <div
      class="bg-slate-50 bg-opacity-90 backdrop-blur-[10px] hover:bg-opacity-75 transition-all duration-200 ease-in-out cursor-pointer select-none border rounded-full inline-flex items-center px-5 py-2"
    >
      <img
        class="w-[18px] h-[18px] mr-2"
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
      />
      <h2 class="text-sm font-medium">Google ile giriş yap.</h2>
    </div>
  </button>
</template>
