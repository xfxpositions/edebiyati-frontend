<template>
  <div class="flex justify-center">
    <div class="top-16 w-72">
      <p class="text-lg font-gentium">Etiketler</p>
      <p v-if="errorMessage" class="font-gentium text-red-500 text-sm">
        Hata: {{ errorMessage }}
      </p>
      <Combobox v-model="selected" class="focus:outline-none focus:shadow-xl">
        <div class="relative mt-1">
          <div
            class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
          >
            <ComboboxInput
              class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
              :displayValue="(person) => person.name"
              @change="query = $event.target.value"
              @keyup.enter="selectTag"
              v-model="selected"
            />
            <ComboboxButton
              class="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <font-awesome-icon :icon="['fas', 'angle-down']" class="mr-1" />
            </ComboboxButton>
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <div
                v-if="filteredTags.length === 0 && query !== ''"
                class="relative cursor-default select-none py-2 px-4 text-gray-700"
              >
                Bulunamadı
              </div>

              <ComboboxOption
                class="z-10"
                v-for="person in filteredTags"
                as="template"
                :key="person.id"
                :value="person"
                v-slot="{ selected, active }"
              >
                <li
                  @click="selectFromList(person)"
                  class="relative cursor-default select-none py-2 md:pl-10 pl-1 pr-4 z-10"
                  :class="{
                    'bg-green-700 text-white': active,
                    'text-gray-900 bg-white': !active,
                  }"
                >
                  <span
                    class="block truncate z-10"
                    :class="{
                      'font-medium': selected,
                      'font-normal': !selected,
                    }"
                  >
                    {{ person.name }}
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{ 'text-white': active, 'text-green-700': !active }"
                  >
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </Combobox>
      <ul class="font-md font-gentium flex flex-col gap-1" v-auto-animate>
        <li class="bg-slate-50 p-2 mt-2 rounded-lg" v-for="tag in selectedTags">
          <div class="flex justify-between">
            <p>{{ tag.name }}</p>
            <button class="mr-0" @click="removeTag(tag)">
              <font-awesome-icon :icon="['fas', 'close']" class="mr-1" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import AddTag from "../views/Modals/AddTag.vue";

let tags = ref([
  { id: 1, name: "Edebiyat" },
  { id: 2, name: "Dilbilimi" },
  { id: 3, name: "Felsefe" },
  { id: 4, name: "Sosyoloji" },
  { id: 5, name: "Sanat" },
  { id: 6, name: "Bilgisayar" },
]);

let selected = ref("");
let query = ref("");
let selectedTags = ref([]);
let errorMessage = ref("");
let input = ref(null);
const maxTag = 5;

const emit = defineEmits(["onTagSelect"]);

const selectFromList = (tag) => {
  selected.value = tag;
  selectTag();
};

const selectTag = () => {
  if (selectedTags.value.indexOf(selected.value) == -1 && tags.value != "") {
    if (selectedTags.value.length >= maxTag) {
      errorMessage.value = "Gönderi en fazla 5 etiket alabilir.";
    } else {
      selectedTags.value.push(selected.value);
      tags.value = tags.value.filter((item) => {
        return item.name != selected.value.name;
      });
      selected.value = "";
      let valueToSend = [];
      for (const tag of selectedTags.value) {
        valueToSend.push(tag.name);
      }
      emit("onTagSelect", valueToSend);
    }
  }
};

const removeTag = (tag) => {
  tags.value.push(tag);

  selectedTags.value = selectedTags.value.filter((item) => {
    return item.name != tag.name;
  });
};

let filteredTags = computed(() =>
  query.value === ""
    ? tags.value
    : tags.value.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);
</script>
