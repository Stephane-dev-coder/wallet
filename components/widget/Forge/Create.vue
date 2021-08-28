<template>
  <div
    class="
      w-full
      rounded-2xl
      overflow-hidden
      bg-white
      dark:bg-dark-1
      p-4
      flex flex-col
    "
  >
    <div class="flex justify-between">
      <h3 class="text-xl font-semibold dark:text-white">Rajouter outils</h3>
    </div>
    <div class="flex justify-center items-center w-full mt-1 flex-grow">
      <div class="flex flex-col w-full">
        <span class="text-sm text-gray-500">Montant </span>
        <vue-slider
          v-model="amount"
          :min="0"
          :max="max"
          :interval="getInterval"
          class="mt-2"
        />
      </div>
    </div>

    <div class="flex mt-5 justify-end">
      <button
        class="
          bg-white
          dark:bg-nice-dark
          text-black
          dark:text-white
          border-2 border-black
          dark:border-white
          px-5
          py-2
          text-sm
          rounded-lg
          transition
          duration-300
          ring-offset-2
          focus:text-white
          dark:focus:text-black
          focus:bg-black
          dark:focus:bg-white
          focus:border-black
          dark:focus:border-white
          focus:ring focus:ring-black
          dark:focus:ring-white
          focus:outline-none
          dark:ring-offset-black
        "
      >
        <span>Ajouter <i class="bx bxs-send ml-2"></i></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default Vue.extend<any, any, any, any>({
  components: {
    VueSlider,
  },
  props: {
    max: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      amount: 0,
    }
  },
  computed: {
    getInterval() {
      const maxString = `${this.max}`
      const afterDot = maxString.substr(maxString.indexOf('.'))
      const num = afterDot.length > 2 ? afterDot.length - 1 : 2
      return 1 / 10 ** num
    },
  },
})
</script>
