<template>
  <Transition name="transition">
    <div class="fixed-container flex justify-center items-center">
      <div class="sub-layer flex justify-center items-center" @click="modal"></div>

      <div class="modal flex p-10 flex-wrap">
        <div class="w-full text-2xl flex justify-between">
          <div>User Name</div>
          <div class="cursor-pointer" @click="modal"><font-awesome-icon :icon="['fas', 'xmark']" /></div>
        </div>
        <div class="w-full">
          <div class="field field_v2">
            <input id="last-name" class="field__input text-black" v-model="modelname" placeholder="Title" autocomplete="off" />
            <span class="field__label-wrap text-black" aria-hidden="true"></span>
          </div>
        </div>
        <div class="w-full flex justify-end items-end gap-3">
          <button v-wave class="cancel button flex items-center justify-center" @click="modal">İptal</button>
          <button
            v-wave="{
              initialOpacity: 0.8
            }"
            class="accept button flex items-center justify-center"
            @click="save"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { ref } from 'vue'
import '../../../../src/assets/input.css'
const emit = defineEmits(['eventA', 'saveInput'])
const modal = () => {
  console.log('a')
  emit('eventA')
}
const props = defineProps({
  username: String
})
const modelname = ref(props.username)
const save = () => {
  emit('saveInput', modelname.value)
  modal()
}
</script>
<style scoped>
.cancel {
  color: rgb(35, 151, 0);
}
.accept {
  background-color: greenyellow;
  color: aliceblue;
}
.button {
  cursor: pointer;
  font-weight: bold;
  width: 100px;
  height: 40px;
  border: 1px solid greenyellow;
  border-radius: 20px;
}
.modal {
  width: 500px;
  height: 300px;
  background-color: rgb(238, 238, 238);
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
