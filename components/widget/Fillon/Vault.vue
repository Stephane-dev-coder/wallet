<template>
  <div class="w-full rounded-2xl overflow-hidden bg-white dark:bg-dark-1 p-4">
    <div class="flex justify-between">
      <h3 class="text-xl font-semibold dark:text-white">
        {{ amount }}
      </h3>
      <img :src="pickaxe" class="h-8 w-8 bg-gray-100 dark:bg-dark-2 rounded" />
    </div>
    <div class="text-sm grid gap-2 mt-4">
      <div
        class="flex justify-between items-center font-semibold dark:text-white"
      >
        Temps restant
        <span class="text-blue-500 font-bold">{{ displayTime }}</span>
      </div>
      <!-- <div
        class="flex justify-between items-center font-semibold dark:text-white"
      >
        Gains
        <span class="text-blue-500 font-bold">2492749 STI</span>
      </div>
      -->
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
        :disabled="claimDisable"
        :class="{
          'hover:text-white': !claimDisable,
          'dark:hover:text-black': !claimDisable,
          'hover:border-black': !claimDisable,
          'dark:hover:border-white': !claimDisable,
          'hover:bg-black': !claimDisable,
          'dark:hover:bg-white': !claimDisable,
          'cursor-default': claimDisable,
        }"
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
        :disabled="unstakeDisable"
        :class="{
          'hover:text-white': !unstakeDisable,
          'dark:hover:text-black': !unstakeDisable,
          'hover:border-black': !unstakeDisable,
          'dark:hover:border-white': !unstakeDisable,
          'hover:bg-black': !unstakeDisable,
          'dark:hover:bg-white': !unstakeDisable,
          'cursor-default': unstakeDisable,
        }"
        @click="clickUnstake()"
      >
        <i v-if="false" class="bx bx-loader-alt animate-spin mr-1"></i>
        <span v-else>Vendre <i class="bx bxs-send ml-2"></i></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
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
      claimDisable: false,
      unstakeDisable: false,
      intervals: [],
      time: 0,
      intervalId: 0,
    }
  },
  computed: {
    displayTime() {
      if (this.time <= 0) {
        return '0s'
      } else {
        let string = ''
        const years = parseInt(`${this.time / (3600 * 24 * 365)}`)
        if (years > 0) {
          string = years + ' y'
        }

        let time = this.time - years * 3600 * 24 * 365
        const days = parseInt(`${time / (3600 * 24)}`)
        if (days > 0) {
          string = string + ' ' + days + ' d'
        }

        time = time - days * 3600 * 24
        const hours = parseInt(`${time / 3600}`)
        if (hours > 0) {
          string = string + ' ' + hours + ' h'
        }

        time = time - hours * 3600
        const minutes = parseInt(`${time / 60}`)
        if (minutes > 0) {
          string = string + ' ' + minutes + ' m'
        }

        time = time - minutes * 60
        const seconds = parseInt(`${time}`)
        if (seconds > 0) {
          string = string + ' ' + seconds + ' s'
        }

        return string
      }
    },
    ...mapGetters('lockers', ['getVault']),
  },
  destroyed() {
    clearInterval(this.intervalId)
  },
  mounted() {
    const vault = this.getVault(this.vault)
    this.amount = parseFloat(fees(ethers.BigNumber.from(vault.amount)))
    const multiplier = ethers.BigNumber.from(vault.multiplier).toNumber()

    const rightnow = parseInt(`${Date.now() / 1000}`)
    if (rightnow < ethers.BigNumber.from(vault.unlock).toNumber()) {
      this.unstakeDisable = true
    }

    const isEnchant = vault.claimLocked
    this.claimDisable = vault.claimLocked

    this.intervalId = setInterval(() => {
      const rightnow = parseInt(`${Date.now() / 1000}`)
      this.time = ethers.BigNumber.from(vault.unlock).toNumber() - rightnow
    }, 1000)

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
  methods: {
    async clickUnstake() {
      const previousBalance: BigNumber = await this.getPowerBalance()
      const result = await this.lockerUnstake(this.vault)
      if (result === -1) {
        this.$vs.notification({
          position: 'top-right',
          color: 'danger',
          icon: `<i class='bx bxs-error-circle'></i>`,
          duration: 10000,
          title: 'Erreur',
          text: "Desoler j'ai pas le temps de programmer l'erreur mais juste contacter l'admin et on trouvera la solution !",
        })
      } else if (result === -2) {
        this.$vs.notification({
          position: 'top-right',
          color: 'danger',
          icon: `<i class='bx bxs-error-circle'></i>`,
          duration: 10000,
          title: 'Erreur',
          text: "Vous ne pouvez pas deverouiller vos fond temps que le temps n'est pas ecouler !",
        })
      } else {
        const idArray = this.intervals.length
        const idInterval = setInterval(async () => {
          const actualBalance: BigNumber = await this.getPowerBalance()
          if (actualBalance.lt(previousBalance)) {
            this.$vs.notification({
              position: 'top-right',
              color: 'success',
              icon: `<i class='bx bxs-check-circle'></i>`,
              duration: 4000,
              title: 'Niquel',
              text: 'Votre argent est de retour !',
            })
            this.destroyVault(this.vault)
            clearInterval(this.intervals[idArray].id)
            this.intervals[idArray] = this.intervals[this.intervals.length - 1]
            this.intervals.pop()
          } else if (this.intervals[idArray].itteration > 5) {
            this.$vs.notification({
              position: 'top-right',
              color: 'danger',
              icon: `<i class='bx bxs-check-circle'></i>`,
              duration: 4000,
              title: 'Oops !',
              text: "Soit la transaction n'est pas passer soit nous avons fait une erreur pour en etre sur regarder votre portefeuille",
            })
            clearInterval(this.intervals[idArray].id)
            this.intervals[idArray] = this.intervals[this.intervals.length - 1]
            this.intervals.pop()
          } else {
            this.intervals[idArray].itteration =
              this.intervals[idArray].itteration + 1
          }
        }, 3000)
        this.intervals.push({
          id: idInterval,
          itteration: 0,
        })
        this.$vs.notification({
          position: 'top-right',
          color: 'success',
          icon: `<i class='bx bxs-check-circle'></i>`,
          duration: 4000,
          title: 'Niquel',
          text: 'Transaction envoyer au reseaux !',
        })
      }
    },
    ...mapActions('lockers', [
      'lockerUnstake',
      'getPowerBalance',
      'destroyVault',
    ]),
  },
})
</script>
