<template>
  <div class="bg-white dark:bg-dark-1 shadow-lg rounded-lg p-4 flex flex-col">
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
      Volume
      <!-- <span class="text-sm text-gray-400 dark:text-gray-600">24H</span> -->
    </h3>
    <p
      class="
        font-bold
        text-lg
        flex
        items-center
        justify-between
        dark:text-white
      "
    >
      {{ calculatedVolume.toFixed(2) }} $
      <!--
        <span
        class="text-xs ml-1"
        :class="{
          'text-green-500': volume.change >= 0,
          'text-red-500': volume.change < 0,
        }"
        >({{ volume.change >= 0 ? '+' : ''
        }}{{ volume.change.toFixed(1) }}%)</span
      >
      -->
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

/**
 * TODO: Faire en sorte d'afficher le Volume en STI ou $. Changement animer et declencher par un click sur le widget
 */

export default Vue.extend({
  computed: {
    calculatedVolume() {
      return parseInt(this.volume) * parseFloat(this.price)
    },
    ...mapState('statistiques', ['volume', 'price']),
  },
})
</script>
