<template>
  <div class="w-full grid grid-cols-12">
    <div class="col-span-8 col-start-3">
      <section>
        <div class="background rounded-lg w-full" style="height: calc(100vh - 40px)">
          <!-- Info Top section -->
          <div class="-200 p-4">
            <span class="text-black">Posted on April 1st, 2023 by John Doe</span>
          </div>
          <!-- Author section -->
          <div class="flex p-4 w-full">
            <div class="flex items-center w-6/12">
              <img class="w-12 h-12 rounded-full mr-4" src="../../src/assets/profile.png" alt="Author Photo" />
              <div>
                <h2 class="text-lg font-semibold text-gray-900">John Doe</h2>
                <p class="text-gray-600 justify-self-end">Author of this article</p>
              </div>
            </div>
            <div class="h-full text-slate-100 w-6/12 text-xs">
              <div class="flex flex-wrap justify-end">
                <div class="mr-2 mt-1" style="height: fit-content; width: fit-content">
                  <a href="#" target="_blank"><div class="tag-box p-1 h-fit flex items-center">Tag</div></a>
                </div>
              </div>
            </div>
          </div>
          <!-- Image section -->
          <div class="">
            <img class="h-full w-full object-cover object-center rounded-lg" src="../../src/assets/image.jpg" alt="Main Image" />
          </div>
          <!-- Title section -->
          <div class="pl-4 pr-4">
            <h3 class="text-2xl font-semibold text-black">Title</h3>
          </div>

          <!-- Preview section -->
          <div class="px-4 text-black-900 overflow-hidden transition-all duration-200 ease-in-out" ref="container">
            <!--<div ref="longabbr" :hidden="data.showmore != true" v-html="'<p>' + data.longabbr + '</p>'"></div>-->
            <!--<div ref="abbr" :hidden="data.showmore == true" v-html="data.abbr + '...'"></div>-->
            <div ref="abbr">Abbrevation</div>
          </div>
          <!-- <div v-if="data.showmore == true" class="font-bold pl-4 show-more" @click="showless(index)">Show Less</div>-->
          <div class="font-bold pl-4 show-more text-black" @click="showmore(index)">Show More</div>
          <div id="container" class="mt-2">
            <button class="learn-more">
              <span class="circle flex items-center" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text flex items-center ml-8">
                <!--<router-link
                  :to="{
                    name: 'blogDetail',
                    params: {
                      title: data.title.replace(/ /g, '-')
                    },
                    query: {
                      id: data._id
                    }
                  }"
                >
                  Learn More
                </router-link>-->
                Learn More
              </span>
            </button>
          </div>

          <!-- Footer section -->
          <div class="pr-4 pl-4 py-2">
            <div class="flex justify-between items-center">
              <div>
                <button class="mr-2 button">
                  <i class="fa-solid fa-thumbs-up fa-lg ease duration-300 text-gray-400 hover:text-white"></i>
                </button>
                <button class="mr-2 button">
                  <i class="fa-solid fa-thumbs-down fa-lg ease duration-300 text-gray-400 hover:text-white"></i>
                </button>
                <button class="button">
                  <i class="fa-solid fa-comments fa-lg ease duration-300 text-gray-400 hover:text-white"></i>
                </button>
              </div>
              <div>
                <button>
                  <i class="fa-sharp fa-light fa-share fa-lg ease duration-300 text-gray-400 hover:text-white"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import '../../src/assets/learnmore.scss'
</script>
<style scoped>
.button {
  width: 40px;
}
.tag-box {
  border-radius: 5px;
  height: fit-content;
  background-color: crimson;
  cursor: pointer;
}
.show-more {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.show-more:hover {
  color: rgb(19, 106, 205);
}
.background {
  background-color: rgb(212, 212, 212);
}
.page-footer {
  height: 50px;
}
</style>
