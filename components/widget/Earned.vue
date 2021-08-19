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
      Gains
      <span class="text-sm text-gray-400 dark:text-gray-600">24H</span>
    </h3>
    <p
      v-if="isConnected && earned != null"
      class="font-bold text-lg"
      :class="{
        'text-green-500': !earned.isNegative(),
        'text-red-500': earned.isNegative(),
      }"
    >
      {{ earned.isNegative() ? '-' : '+' }}{{ displayEarned }}
      <span class="text-blue-500">STI</span>
    </p>

    <div v-else class="flex items-center font-bold">
      <div
        class="h-4 w-32 bg-gray-200 dark:bg-dark-8 rounded-sm"
        :class="{ 'animate-pulse': isConnected && earned == null }"
      ></div>
      <span class="ml-2 text-blue-500">STI</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { ethers, BigNumber } from 'ethers'

const fees = (value: BigNumber, fixedTo = 6) => {
  const puissance = 18 - fixedTo < 0 ? 18 : 18 - fixedTo
  let price = value
    .div(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(puissance)))
    .toString()
  if (price.length < fixedTo || price.length === fixedTo) {
    const diff = fixedTo - price.length
    for (let i = 0; i < diff; i++) {
      price = `0${price}`
    }
    return `0.${price}`
  } else {
    const diff = price.length - fixedTo
    return `${price.substring(0, diff)}.${price.substring(diff)}`
  }
}

export default Vue.extend({
  computed: {
    displayEarned() {
      return fees(this.earned)
    },
    ...mapState('wallet', ['isConnected', 'earned']),
  },
})
</script>
