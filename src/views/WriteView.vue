<template>
  <div class="md:mx-32 md:my-24 my-14 mx-2">
    <div class="p-12 flex flex-col gap-5">
      <input
        placeholder="Başlık"
        type="text"
        class="font-gentium text-4xl focus:outline-none"
        v-model="title"
      />
      <QuillEditor
        theme="bubble"
        :contentType="'html'"
        :options="editorOptions"
        placeholder="Muhteşem şeyler yazın"
        style="
          font-family: Gentium Book Plus, times new roman, serif;
          font-size: large;
        "
      />
    </div>
    <hr />
    <div class="grid sm:grid-cols-2 grid-cols-1 md:p-12 min-h-[400px]">
      <div class="p-12">
        <ImageUpload @image-upload="onImageUpload"></ImageUpload>
      </div>
      <div class="p-12">
        <TagSearch @on-tag-select="onTagSelect"></TagSearch>
      </div>
    </div>
    <button
      class="bg-green-600 text-white rounded-full p-2 border-black inline-flex justify-end float-right fixed-button"
      @click="qlUpload"
    >
      Gönder
    </button>
    <!--Sidenav-->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

import "../assets/VueQuill.css";
import "../assets/input.css";
import turndown from "turndown";
import axiosUtil from "../utils/axios.js";
import TagSearch from "../components/TagSearch.vue";
import ImageUpload from "../components/ImageUpload.vue";

const tags = ref([]);
const selectedFile = ref(null);
const title = ref("");
const editorHtml = ref("");

const editorOptions = {
  modules: {
    toolbar: [
      ["bold", "italic", "underline"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["link", "image"],
      ["clean"], // remove formatting button
    ],
  },
};

const onTagSelect = (e) => {
  tags.value = e;
};

const onImageUpload = (e) => {
  console.log(e);
  selectedFile.value = e;
};

const qlUpload = () => {
  //upload image
  let imageForm = new FormData();
  imageForm.append("image", selectedFile.value);
  const config = {
    onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
    timeout: 5000000,
  };
  axiosUtil
    .post("/post/upload_image", imageForm, config)
    .then((response) => {
      let image_url = response.data.url;
      //post body
      //html to markdown
      var turndownService = new turndown();
      let content = {};
      let html = document.querySelector(".ql-editor").innerHTML;
      console.log("html=?>" + html);
      content.html = html;
      content.markdown = turndownService.turndown(editorHtml.value);

      let postData = {
        author: localStorage.getItem("currentUser"),
        date: Date.now(),
        tags: tags.value,
        content: content,
        status: "Public",
        image: image_url,
        title: title.value,
      };
      console.log(postData);
      axiosUtil
        .post("/post/create", postData, { timeout: 10000 })
        .then((response) => {
          console.log("Post was successful:", response);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
};
</script>

<style scoped>
.fixed-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
}
.sidenav-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.side-button {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  transform: translateX(50%);
  position: fixed;
  top: calc(50% - (35px / 2));
  right: 0;
  z-index: 4;
  background-color: aliceblue;
  cursor: pointer;
}
.tag-section {
  display: inline-block;
  max-width: 150px;
}
.tag-box {
  border-radius: 5px;
  font-size: 13px;
  height: fit-content;
  background-color: crimson;
  cursor: pointer;
}
.transition-enter-active,
.transition-leave-active {
  transition: 0.5s ease;
}
.transition-enter-from,
.transition-leave-to {
  opacity: 0;
  transform: translatey(100px);
}
.opacitynone {
  opacity: 0;
}
.opacitylow {
  opacity: 0.4;
}
.opacityhigh {
  opacity: 1;
}
.image {
  position: absolute;
  height: 500px;
  transition: 0.2s ease-in-out;
  color: aliceblue;
  cursor: pointer;
}
.image:hover {
  opacity: 1;
}
.wrapper {
  margin-top: 10px;
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
  transition: 0.2s ease-in-out;
  border-radius: 10px;
}
.input {
  display: none;
}
.upload-button {
  width: 82px;
  height: 36px;
  border-radius: 10px;
  font-weight: bold;
  color: rgb(24, 24, 24);
  background-color: aliceblue;
}
.sidenav {
  color: aliceblue;
  background-color: rgb(24, 24, 24);
  position: sticky;
  max-height: 100vh;
  top: 0px;
  right: 0;
  overflow-y: scroll;
}
.text-area-box {
  background-color: rgb(24, 24, 24);
}
</style>
