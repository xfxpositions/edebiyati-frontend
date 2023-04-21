<template>
  <div>
    <div
      class="w-full grid grid-cols-12 height transition duration-500"
      :class="{ opacitylow: showTag }"
    >
      <div class="col-span-12 transition-all duration-200" ref="opacity1">
        <div class="text-area-box p-2">
          <div class="field field_v2">
            <input
              id="last-name"
              class="field__input text-white"
              v-model="title"
              placeholder="Title"
              autocomplete="off"
            />
            <span class="field__label-wrap" aria-hidden="true">
              <span class="field__label text-white">Enter Title</span>
            </span>
          </div>
          <div
            class="wrapper"
            ref="wrapper"
            :style="`background-image: url(${image})`"
          >
            <input
              class="input"
              type="file"
              accept="image/*"
              ref="fileInput"
              @change="handleFileInput"
            />
          </div>
          <div
            class="image flex justify-center items-center"
            :class="{ opacityhigh: image == null, opacitynone: image != null }"
            @click="handleClick"
            @mouseover="opacitylow"
            @mouseleave="opacityhigh"
            ref="img"
          >
            <div>Select İmage</div>
          </div>
          <div class="mt-5 ql-custom">
            <QuillEditor theme="snow" :options="editorOptions" />
          </div>
        </div>
      </div>
      <!--Sidenav-->
    </div>
  </div>
</template>
<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "../assets/VueQuill.css";
import "../assets/input.css";

const issidenavopen = ref(false);
const deneme = "deneme";
const tags = ref([]);
const showTag = ref(false);
const showModal = ref(false);
const selectedFile = ref(null);
const image = ref(null);
const title = ref(null);

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

const handleFileInput = (event) => {
  // handle file input change here
};

const handleClick = () => {
  // handle image click here
};

const opacitylow = () => {
  // handle opacity low here
};

const opacityhigh = () => {
  // handle opacity high here
};

const addtag = () => {
  // handle adding tags here
};

const modalopen = () => {
  // handle modal open here
};

const qlUpload = () => {
  // handle Quill editor upload here
};

const sidenavopen = () => {
  // handle sidenav open here
};
</script>

<style scoped>
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
  border-radius: 10px;
  font-weight: bold;
  color: rgb(24, 24, 24);
  background-color: aliceblue;
}
.sidenav {
  color: aliceblue;
  background-color: rgb(24, 24, 24);
  position: sticky;
  max-height: calc(100vh - 50px);
  top: 50px;
  right: 0;
  margin-left: 5px;
  overflow-y: scroll;
}
.text-area-box {
  background-color: rgb(24, 24, 24);
}
</style>
