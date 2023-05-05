<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="w-full h-full fixed top-0 left-0 sub-layer" style="z-index: 4" @click="$emit('ModalClose')"></div>
    <div class="modal">
      <div class="w-full flex flex-wrap">
        <div class="w-full text-2xl text-center py-5 font-bold">Göndermek İstediğinize Emin Misiniz?</div>
        <div class="w-full flex justify-center items-end gap-3 mt-5 mb-10">
          <button v-wave class="cancel button flex items-center justify-center" @click="$emit('ModalClose')">İptal</button>
          <button
            v-wave="{
              initialOpacity: 0.8
            }"
            class="accept button flex items-center justify-center"
            @click="$emit('SavePost')"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
  height: auto;
  background-color: aliceblue;
  z-index: 5;
  border-radius: 15px;
}
.sub-layer {
  background-color: rgba(24, 24, 24, 0.7);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
}
</style>
