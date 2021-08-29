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
            {{ totalLP }} <span class="text-green-500">LP</span>
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
            {{ userLP }} <span class="text-green-500">LP</span>
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="populated"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
    >
      <WidgetFillonVault
        v-for="(vault, index) in getVaults"
        :key="index"
        :vault="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { BigNumber, ethers } from 'ethers'

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

export default Vue.extend<any, any, any, any>({
  data() {
    return {
      populated: false,
    }
  },
  computed: {
    totalLP() {
      return fees(this.totalStaked)
    },
    userLP() {
      return fees(this.userStaked)
    },
    ...mapState('wallet', ['address']),
    ...mapState('lockers', ['totalStaked', 'userStaked']),
    ...mapGetters('lockers', ['getVaults']),
  },
  async mounted() {
    await this.createVaults(this.address)
    await this.createTotalStaked()
    await this.createUserStaked(this.address)
    this.populated = true
  },
  methods: {
    ...mapActions('lockers', [
      'createVaults',
      'createTotalStaked',
      'createUserStaked',
    ]),
  },
})
</script>
