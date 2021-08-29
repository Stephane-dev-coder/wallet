<template>
  <div class="w-full rounded-2xl overflow-hidden bg-white dark:bg-dark-1 p-4">
    <div class="flex justify-between">
      <h3 class="text-xl font-semibold dark:text-white">
        {{ amount }}
      </h3>
      <img :src="pickaxe" class="h-8 w-8 bg-gray-100 dark:bg-dark-2 rounded" />
    </div>
    <div class="flex mt-5 justify-between">
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
        <i v-if="false" class="bx bx-loader-alt animate-spin mr-1"></i>
        <span v-else>Claim <i class="bx bxs-send ml-2"></i></span>
      </button>
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
        <i v-if="false" class="bx bx-loader-alt animate-spin mr-1"></i>
        <span v-else>Vendre <i class="bx bxs-send ml-2"></i></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
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
  props: {
    vault: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      amount: 0,
      pickaxe: '',
    }
  },
  computed: {
    ...mapGetters('lockers', ['getVault']),
  },
  mounted() {
    const vault = this.getVault(this.vault)
    this.amount = parseFloat(fees(ethers.BigNumber.from(vault.amount)))
    const multiplier = ethers.BigNumber.from(vault.multiplier).toNumber()

    const isEnchant = vault.claimLocked

    if (isEnchant) {
      switch (multiplier) {
        case 4:
          this.pickaxe = '/pickaxe/stone_enchant.gif'
          break

        case 6:
          this.pickaxe = '/pickaxe/iron_enchant.gif'
          break

        case 8:
          this.pickaxe = '/pickaxe/gold_enchant.gif'
          break

        case 10:
          this.pickaxe = '/pickaxe/diamond_enchant.gif'
          break

        case 12:
          this.pickaxe = '/pickaxe/netherite_enchant.gif'
          break

        case 2:
        default:
          this.pickaxe = '/pickaxe/wood.png'
          break
      }
    } else {
      switch (multiplier) {
        case 2:
          this.pickaxe = '/pickaxe/stone.png'
          break

        case 3:
          this.pickaxe = '/pickaxe/iron.png'
          break

        case 4:
          this.pickaxe = '/pickaxe/gold.png'
          break

        case 5:
          this.pickaxe = '/pickaxe/diamond.png'
          break

        case 6:
          this.pickaxe = '/pickaxe/netherite.png'
          break

        case 1:
        default:
          this.pickaxe = '/pickaxe/wood.png'
          break
      }
    }
  },
})
</script>
