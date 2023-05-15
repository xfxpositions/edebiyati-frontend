<template>
  <div v-if="!loaded">yukleniyor</div>
  <WriteView
    :html-data="htmlData"
    :title-data="titleData"
    :tags-data="tagsData"
    :image-data="imageData"
    :post-id="id"
    is-update="true"
    v-else
  ></WriteView>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axiosUtil from "../utils/axios.js";
import WriteView from "./WriteView.vue";
const route = useRoute();
const loaded = ref(false);
const id = route.query.id;
const htmlData = ref("");
const titleData = ref("");
const imageData = ref("");
const postId = ref("");

const tagsData = ref([]);
onMounted(() => {
  axiosUtil.get(`/post/fetch/${id}`).then((response) => {
    htmlData.value = response.data.content.html;
    titleData.value = response.data.title;
    tagsData.value = response.data.tags;
    imageData.value = response.data.image;
    loaded.value = true;
    console.log(htmlData.value);
  });
});
</script>
