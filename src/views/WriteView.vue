<template>
  <div>
    <div
      class="w-full grid grid-cols-12 height transition duration-500"
      :class="{ opacitylow: showTag }"
    >
      <div class="col-span-2 sidenav mr-1">
        <button class="text-white" @click="aaa">Add Tag</button>
      </div>
      <div
        class="col-span-12 lg:col-span-8 transition-all duration-200"
        ref="opacity1"
      >
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
            <QuillEditor
              content-type="html"
              v-model="editorHtml"
              theme="snow"
              :options="editorOptions"
            />
          </div>
        </div>
      </div>
      <!--Sidenav-->
      <div class="hidden lg:grid lg:col-span-2 sidenav ml-1">
        <div class="tags-section mt-1">
          <div class="flex flex-wrap">
            <div
              v-for="(tag, index) in tags"
              class="mr-2 mt-1"
              style="height: fit-content; width: fit-content"
            >
              <div class="tag-box p-1 h-fit flex items-center">{{ tag }}</div>
            </div>
          </div>
          <button
            class="upload-button mt-1 ml-1 mb-2 text-xs col-span-2 md:col-span-1"
            @click="addtag"
          >
            Tags
            <font-awesome-icon :icon="['fas', 'tags']" size="lg" />
          </button>
        </div>
        <div class="w-full h-full flex justify-end items-end">
          <div class="w-full grid grid-cols-2">
            <div class="flex justify-center">
              <button
                class="upload-button mt-1 ml-1 mb-2 text-xs col-span-2 md:col-span-1"
                @click="he"
              >
                Modal
              </button>
            </div>
            <div class="flex justify-center">
              <button
                class="upload-button ml-1 mt-1 mb-2 text-xs col-span-2 md:col-span-1"
                @click="qlUpload"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Transition name="transition">
    <AddTag
      v-if="showTag"
      @tag-close="tagclose"
      @tag-data="tagdata"
      :proptags="tags"
    ></AddTag>
  </Transition>
</template>
<script setup>
import Modal from "./Modals/MyModal.vue";
import AddTag from "./Modals/AddTag.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "../assets/VueQuill.css";
import "../assets/input.css";
import turndown from "turndown";
import axiosUtil from "../utils/axios.js";

const showTag = ref(false);
const tags = ref([]);
const selectedFile = ref(null);
const image = ref(null);
const title = ref("");
const img = ref(null);
const wrapper = ref(null);
const fileInput = ref(null);
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
const resizeHandler = () => {
  img.value.style.width = wrapper.value.offsetWidth + "px";
};
onMounted(async () => {
  window.addEventListener("resize", resizeHandler);
  setTimeout(() => {
    img.value.style.width = wrapper.value.offsetWidth + "px";
    img.value.style.marginTop = 0 - wrapper.value.offsetHeight + "px";
  }, 10);
});

const handleFileInput = (event) => {
  selectedFile.value = event.target.files[0];
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const base64Data = reader.result.split(",")[1];
    const dataUrl = `data:${file.type};base64,${base64Data}`;
    image.value = dataUrl;
  };
  reader.readAsDataURL(file);
};

const handleClick = () => {
  fileInput.value.click();
};
const opacitylow = () => {
  wrapper.value.classList.add("opacitylow");
};

const opacityhigh = () => {
  wrapper.value.classList.remove("opacitylow");
};
const addtag = () => {
  showTag.value = true;
};
const tagclose = () => {
  showTag.value = false;
};

const modalopen = () => {
  // handle modal open here
};
const he = () => {
  console.log(document.querySelector(".ql-editor").innerHTML);
};

const qlUpload = () => {
  //upload image
  let imageForm = new FormData();
  imageForm.append("image", selectedFile.value);

  axiosUtil
    .post("/post/upload_image", imageForm, { timeout: 5000000 })
    .then((response) => {
      let image_url = response.data.url;
      //post body
      //html to markdown
      var turndownService = new turndown();
      let content = {};
      content.html = editorHtml.value;
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

      axiosUtil
        .post("/post/create", postData)
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
