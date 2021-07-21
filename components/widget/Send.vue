<template>
  <div
    class="
      bg-white
      dark:bg-dark-1
      shadow-lg
      rounded-lg
      col-span-1
      md:col-span-1
      lg:col-span-3
      p-4
      flex flex-col
    "
  >
    <h3
      class="
        text-lg
        flex
        justify-between
        items-center
        text-gray-500
        dark:text-gray-400
      "
    >
      Envoyer
    </h3>
    <div class="grid grid-cols-2 gap-3 mt-6">
      <div class="flex flex-col">
        <span class="text-sm text-gray-500">Destinataire </span>
        <input
          class="
            dark:bg-dark-4
            p-2
            rounded-lg
            border
            dark:border-dark-4
            mt-2
            focus:outline-none focus:ring-1 focus:border-blue-400
            dark:focus:border-blue-600 dark:text-gray-200
          "
          placeholder="0x..."
          type="text"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-sm text-gray-500">Montant </span>
        <input
          class="
            dark:bg-dark-4
            p-2
            rounded-lg
            border
            dark:border-dark-4
            mt-2
            focus:outline-none focus:ring-1 focus:border-blue-400
            dark:focus:border-blue-600 dark:text-gray-200
          "
          placeholder="10000"
          type="text"
        />
      </div>
      <div class="flex flex-col col-span-2">
        <span class="text-sm text-gray-500">Message </span>
        <CustomTextarea v-model="textarea" />
      </div>
    </div>
    <div class="mt-10 text-sm grid gap-2">
      <div
        class="flex justify-between items-center font-semibold dark:text-white"
      >
        Frais Reseau <span class="text-blue-500 font-bold">0.0002 BNB</span>
      </div>
      <div
        class="flex justify-between items-center font-semibold dark:text-white"
      >
        Frais STI2D <span class="text-blue-500 font-bold">10 STI</span>
      </div>
    </div>
    <div class="flex justify-end mt-6">
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
          hover:text-white
          dark:hover:text-black
          hover:border-black
          dark:hover:border-white
          hover:bg-black
          dark:hover:bg-white
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
        Envoyer <i class="bx bxs-send ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      textarea: '',
    }
  },
})
</script>
