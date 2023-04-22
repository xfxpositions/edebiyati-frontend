<template></template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  localStorage.setItem("currentUser", "");
  localStorage.setItem("token", "");
  localStorage.setItem("isAuth", false);
});
</script>
