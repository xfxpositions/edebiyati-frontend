<template>
  <Transition name="transition">
    <div class="sub-layer flex justify-center items-center" @click="modal">
      <div class="modal"></div>
    </div>
  </Transition>
</template>
<script setup>
const emit = defineEmits(['eventA'])
const modal = () => {
  console.log('a')
  emit('eventA')
}
</script>
<style scoped>
.modal {
  width: 500px;
  height: 300px;
  background-color: aliceblue;
  z-index: 4;
  border-radius: 15px;
}
.sub-layer {
  background-color: rgba(24, 24, 24, 0.7);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>
