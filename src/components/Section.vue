<template>
  <div
    v-motion
    :initial="{
      opacity: 0,
      y: 10,
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 800,
      },
    }"
    :leave="{
      y: -100,
      opacity: 0,
    }"
  >
    <slot></slot>
  </div>
</template>
<script setup>
let { delay } = defineProps(["delay"]);
</script>
