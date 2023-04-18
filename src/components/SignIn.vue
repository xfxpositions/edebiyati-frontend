<template>
  <TransitionRoot appear :show="modalstate" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10 bg-dark">
        <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md  shadow-xl transition-all"
            >
              
    <section class="bg-gray-50 dark:bg-gray-900 z-20">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px "
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-4xl text-center font-gentium font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
          >
            Tekrardan Hoşgeldiniz!
          </h1>
          <hr />
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >E-Posta Adresiniz</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                v-model="email"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Şifreniz</label
              >

              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="true"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm select-none">
                  <label for="remember" class="text-gray-500 select-none dark:text-gray-300"
                    >Beni Hatırla</label
                  >
                </div>
              </div>
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Şifreniz mi kayıp?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-gray-50 bg-gray-900 shadow-md bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click="handleSubmit"
            >
              Giriş Yap!
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              <p class="font-semibold">Ya da...</p>
              <a
                href="#"
                class="font-bold underline  hover:underline dark:text-primary-500"
                >Hesap Oluştur!</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
    <p>{{ email }}</p>
    <p>{{ password }}</p>
            </section>

             
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { modalstate } from "../modalState.js";
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const isOpen = ref(true);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>
