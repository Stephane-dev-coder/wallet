<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">Les STI !</h2>
    </div>
    <div
      class="
        grid grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        xl:grid-cols-6
        gap-6
        mt-10
      "
    >
      <div
        v-for="(user, index) in rank"
        :key="index"
        class="
          flex flex-col
          items-center
          p-4
          dark:bg-dark-1
          rounded-lg
          bg-white
        "
      >
        <div class="flex justify-start w-full h-8 items-center">
          <h4 v-if="index === 0" class="text-2xl font-bold text-yellow-500">
            #1
          </h4>
          <h4 v-if="index === 1" class="text-xl font-bold text-gray-500">#2</h4>
          <h4 v-if="index === 2" class="text-lg font-bold text-yellow-900">
            #3
          </h4>
          <h4
            v-if="index !== 1 && index !== 2 && index !== 0"
            class="text-base font-bold dark:text-white"
          >
            #{{ index + 1 }}
          </h4>
        </div>
        <img
          src="/devs/bosssuricate.jpeg"
          class="rounded-full h-36 w-36 mt-2"
          alt=""
        />
        <h2 class="flex items-center mt-4 flex-bold text-lg dark:text-white">
          {{ displayAddress(user.address) }}
        </h2>
        <div class="w-full mt-4">
          <div
            class="relative w-full h-1 rounded-full overflow-hidden bg-gray-600"
          >
            <div
              class="absolute inset-y-0 left-0 bg-blue-500"
              :style="`width: ${getPercentage(user.power)}%`"
            ></div>
          </div>
        </div>
        <div class="flex justify-between w-full mt-2 text-xs">
          <div class="dark:text-white">
            <span class="font-bold">{{ displayBalance(user.balance) }}</span>
            STI
          </div>
          <div class="text-blue-500">{{ getPercentage(user.power) }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ethers } from 'ethers'
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $axios }) {
    const rank = await $axios.$get('https://51.255.50.182/api/actual/rank')
    return {
      rank,
    }
  },
  data() {
    return {
      rank: [],
    }
  },
  methods: {
    displayAddress(address: string) {
      return address.slice(0, 4) + '...' + address.slice(address.length - 4)
    },
    getPercentage(power: string) {
      const realPower = ethers.BigNumber.from(power).toNumber()
      return (realPower / 10 ** 7).toFixed(2)
    },
    displayBalance(balance: number) {
      if (balance > 999_999) {
        return `${(balance / 1_000_000).toFixed(2)} M`
      } else if (balance > 999) {
        return `${(balance / 1_000).toFixed(2)} k`
      } else {
        return balance.toFixed(2)
      }
    },
  },
})
</script>
