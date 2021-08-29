<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      <div
        class="bg-white dark:bg-dark-1 shadow-lg rounded-lg p-4 flex flex-col"
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
          Gains Block
        </h3>
        <div class="flex justify-between items-center">
          <p class="font-bold text-lg dark:text-white">
            {{ 0.134 }} <span class="text-blue-500">STI</span>
          </p>
          <p class="font-bold text-xs dark:text-white">
            ~ {{ 0.134 * 20 }} <span class="text-blue-500">STI</span> / min
          </p>
        </div>
      </div>
      <div
        class="bg-white dark:bg-dark-1 shadow-lg rounded-lg p-4 flex flex-col"
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
          Vos Gains / Minutes
        </h3>
        <div class="flex justify-between items-center">
          <p class="font-bold text-lg dark:text-white">
            ~ {{ 0.134 * 20 * 0.01 }} <span class="text-blue-500">STI</span>
          </p>
        </div>
      </div>
      <div
        class="bg-white dark:bg-dark-1 shadow-lg rounded-lg p-4 flex flex-col"
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
          Total staked
        </h3>
        <div class="flex justify-between items-center">
          <p class="font-bold text-lg dark:text-white">
            {{ 98274.630562 }} <span class="text-green-500">LP</span>
          </p>
        </div>
      </div>
      <div
        class="bg-white dark:bg-dark-1 shadow-lg rounded-lg p-4 flex flex-col"
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
          You staked
        </h3>
        <div class="flex justify-between items-center">
          <p class="font-bold text-lg dark:text-white">
            {{ 98274.630562 * 0.01 }} <span class="text-green-500">LP</span>
          </p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <WidgetFillonVault :tool="0" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend<any, any, any, any>({})
</script>
