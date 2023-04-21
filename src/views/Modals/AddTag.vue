<template>
  <div class="fixed-container flex justify-center items-center">
    <div class="sub-layer flex justify-center items-center" @click="$emit('TagClose')"></div>

    <div class="modal">
      <div class="pt-1 px-3">
        <h2 class="text-lg font-semibold text-gray-100 border-b-2 border-zinc-50">Tags</h2>
      </div>

      <div class="tags-container px-3">
        <div class="tags-section h-3/6 mt-1 border-b-2 text-gray-100">
          <div class="flex flex-wrap">
            <div v-for="(tag, index) in selectedTags" class="mr-2 mt-1" style="height: fit-content; width: fit-content">
              <div class="tag-box p-1 h-fit flex items-center" @click="removeTag(index)">
                {{ tag }}
                <div class="tag-add-remove text-black px-1 ml-1">
                  <i class="fa-solid fa-xmark fa-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tags-section h-3/6 mt-1 text-gray-100">
          <div class="flex flex-wrap">
            <div v-for="(tag, index) in tags" class="mr-2 mt-1" style="height: fit-content; width: fit-content">
              <div class="tag-box p-1 h-fit flex items-center" @click="addTag(index)">
                {{ tag }}
                <div class="tag-add-remove text-black px-1 ml-1">
                  <i class="fa-solid fa-plus fa-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tags from './tagroutes.js'
export default {
  name: 'AddTag',
  data() {
    return {
      selectedTags: [],
      tags: []
    }
  },
  props: {
    proptags: []
  },
  mounted() {
    tags.forEach(tag => {
      this.tags.push(tag.name)
    })
    this.selectedTags = this.proptags
    this.tags = this.tags.filter(item => !this.selectedTags.includes(item))
  },
  beforeUnmount() {
    this.$emit('tag-data', this.selectedTags)
  },
  methods: {
    removeTag(index) {
      this.tags.push(this.selectedTags[index])
      this.tags.sort()
      this.selectedTags.splice(index, 1)
    },
    addTag(index) {
      if (!this.selectedTags.includes(this.tags[index])) {
        this.selectedTags.push(this.tags[index])
        this.selectedTags.sort()
        this.tags.splice(index, 1)
        this.tags.sort()
      }
    }
  }
}
</script>

<style scoped>
.tag-enter-active,
.tag-leave-active {
  transition: 0.5s ease;
}
.tag-enter-from,
.tag-leave-to {
  opacity: 0;
  transform: translatey(100px);
}
.tag-add-remove {
  border-radius: 50%;
  height: fit-content;
  background-color: aliceblue;
}
.tag-box {
  border-radius: 5px;
  font-size: 13px;
  height: fit-content;
  background-color: crimson;
  cursor: pointer;
}
.tags-container {
  height: 100%;
  max-height: 270px;
}
.modal {
  width: 500px;
  height: 300px;
  background-color: rgb(48, 48, 48);
  z-index: 4;
  border-radius: 15px;
}
.fixed-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
.sub-layer {
  background-color: rgba(24, 24, 24, 0);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>
