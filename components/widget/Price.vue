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
      Prix
      <!-- <span class="text-sm text-gray-400 dark:text-gray-600">24H</span> -->
    </h3>
    <div
      class="
        font-bold
        text-lg
        flex
        items-center
        justify-between
        flex-wrap
        dark:text-white
      "
    >
      <div>{{ price.value.toFixed(10) }} $</div>
      <!--
      <span
        class="text-xs ml-1"
        :class="{
          'text-green-500': price.change >= 0,
          'text-red-500': price.change < 0,
        }"
        >({{ price.change >= 0 ? '+' : ''
        }}{{ price.change.toFixed(1) }}%)</span
      >
      -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

/**
 * TODO: Cree une animation quand le prix change ! (Commme coinmarketcap)
 */

export default Vue.extend({
  computed: {
    ...mapState('wallet', ['price']),
  },
})
</script>
