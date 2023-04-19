<template>
  <TransitionRoot appear :show="modalstate" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10 bg-dark">
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <div
            class="fixed w-screen h-screen z-0"
            @click="modalstate = !modalstate"
          ></div>
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md shadow-xl transition-all">
              <SignIn></SignIn>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import SignUp from "../views/SignUp.vue";
import { modalstate } from "../modalState.js";
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
</script>
