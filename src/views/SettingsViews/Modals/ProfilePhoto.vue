<template>
  <Transition name="transition">
    <div class="fixed-container flex justify-center items-center">
      <div class="sub-layer flex justify-center items-center" @click="modal"></div>

      <div class="modal flex p-10 flex-wrap">
        <div class="w-full text-2xl flex justify-between">
          <div>Profil Fotoğrafı</div>
          <div class="cursor-pointer" @click="modal"><font-awesome-icon :icon="['fas', 'xmark']" /></div>
        </div>
        <div class="w-full flex justify-center">
          <div class="avatar"><img :src="avatar" class="w-full h-full" style="border-radius: 50% 50%" /></div>
        </div>
        <div class="w-full flex justify-end items-end gap-3">
          <div class="cancel button flex items-center justify-center" @click="modal">İptal</div>
          <div class="accept button flex items-center justify-center" @click="save">Kaydet</div>
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
  avatar: String
})
const modelname = ref(props.username)
const save = () => {
  emit('saveInput', modelname.value)
  modal()
}
</script>
<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50% 50%;
}
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
