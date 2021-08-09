<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">Tutoriels</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="
          w-full
          rounded-lg
          overflow-hidden
          bg-white
          dark:bg-dark-1
          shadow-lg
          transition
          duration-500
          transform
          cursor-pointer
          hover:-translate-y-2 hover:shadow-2xl
        "
        @click="watch(video.url)"
      >
        <img class="w-full object-cover" :src="video.tumbnail" alt="" />
        <div class="flex flex-col p-3">
          <div class="flex justify-between items-center">
            <h3 class="text-sm dark:text-gray-200">{{ video.title }}</h3>
            <div
              class="
                flex
                items-center
                rounded-full
                bg-blue-100
                text-blue-500 text-xs
                font-bold
                px-2
                py-1
              "
            >
              {{ video.time }} min
              <i class="ml-2 bx bxs-time-five"></i>
            </div>
          </div>
          <p class="text-xs text-gray-600 mt-4 dark:text-gray-400">
            {{ video.description }}
          </p>
        </div>
      </div>
      <div
        class="cursor-pointer"
        @click="watch('https://www.youtube.com/watch?v=dQw4w9WgXcQ')"
      >
        <img
          class="w-full object-cover invisible"
          src="/tutoriels/rick.jpeg"
          alt=""
        />
        <div class="flex flex-col p-2 invisible">
          <div class="flex justify-between items-center">
            <h3 class="text-sm">You just got rick rolled</h3>
            <div
              class="
                flex
                items-center
                rounded-full
                bg-green-100
                text-green-500 text-xs
                font-bold
                px-2
                py-1
              "
            >
              69 min
              <i class="ml-2 bx bxs-time-five"></i>
            </div>
          </div>
          <p class="text-xs text-gray-600 mt-4">Issou</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      videos: [
        {
          title: 'Comment acheter du STI ?',
          description:
            'Comment acheter de la cryptomonnaie et la convertir en STI sur SushiSwap',
          time: '3',
          tumbnail: '/tutoriels/placeholder.jpeg',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    }
  },
  methods: {
    watch(url: string) {
      window.open(url, '_blank')
    },
  },
})
</script>
