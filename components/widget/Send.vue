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
          v-model="to"
          class="
            dark:bg-dark-4
            p-2
            rounded-lg
            border
            dark:border-dark-4
            mt-2
            focus:outline-none focus:ring-2
            dark:text-gray-200
          "
          placeholder="0x..."
          type="text"
          :class="{ 'ring-2': !isToGood, 'ring-red-400': !isToGood }"
          @blur="leaveToInput()"
        />
        <p class="text-xs text-red-500 mt-2" :class="{ invisible: isToGood }">
          L'adresse est incorrect
        </p>
      </div>
      <div class="flex flex-col">
        <span class="text-sm text-gray-500">Montant </span>
        <input
          v-model.number="amount"
          class="
            dark:bg-dark-4
            p-2
            rounded-lg
            border
            dark:border-dark-4
            mt-2
            focus:outline-none focus:ring-2
            dark:text-gray-200
          "
          placeholder="10000"
          type="number"
          :class="{ 'ring-2': amountError, 'ring-red-400': amountError }"
          @blur="leaveAmountInput()"
        />
        <p
          class="text-xs text-red-500 mt-2"
          :class="{ invisible: !amountError }"
        >
          {{ amountErrorMessage }}
        </p>
      </div>
      <div class="flex flex-col col-span-2">
        <span class="text-sm text-gray-500">Message </span>
        <CustomTextarea v-model="message" />
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
        Frais STI2D
        <span class="text-blue-500 font-bold">{{ stiFees }} STI</span>
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
        @click="onClick"
      >
        Envoyer <i class="bx bxs-send ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

import { ethers } from 'ethers'

interface Data {
  to: string
  amount: string
  message: string
}

export default Vue.extend<Data, any, any>({
  data() {
    return {
      to: '',
      amount: '',
      message: '',
      amountError: false,
      amountErrorMessage: '',
    }
  },
  computed: {
    isToGood() {
      if (this.to === '') {
        return true
      }
      try {
        ethers.utils.getAddress(this.to)
        return true
      } catch (e) {
        return false
      }
    },
    stiFees() {
      if (this.amount === '') {
        return '--'
      } else {
        return parseFloat(this.amount) * 0.1
      }
    },
    ...mapState('wallet', ['balance']),
  },
  methods: {
    leaveAmountInput() {
      if (this.amount !== '') {
        if (this.amount < 0) {
          this.amountError = true
          this.amountErrorMessage = 'Le montant doit etre positif !'
        } else if (this.amount === 0) {
          this.amountError = true
          this.amountErrorMessage = "Putain mais comment j'envoie 0 moi ?"
        } else {
          const amountBN = this.getBNAmount()
          if (amountBN.gt(this.balance)) {
            this.amountError = true
            this.amountErrorMessage =
              'Vous ne pouvez pas envoyer plus que ce que vous posseder !'
          } else {
            this.amountError = false
          }
        }
      }
    },
    leaveToInput() {
      if (this.isToGood) {
        try {
          const address = ethers.utils.getAddress(this.to)
          this.to = address
        } catch (error) {
          this.to = ''
        }
      }
    },
    getBNAmount() {
      const amountSplit = this.amount.toString().split('.')
      const intPart = parseInt(amountSplit[0].substring(0, 8))
      let floatPart = 0
      if (amountSplit[1]) {
        floatPart = parseInt(amountSplit[1].substring(0, 10))
      }

      const intPartBN = ethers.BigNumber.from(intPart)
      const floatPartBN = ethers.BigNumber.from(floatPart)

      let amountBN = intPartBN.mul(
        ethers.BigNumber.from(10).pow(ethers.BigNumber.from(18))
      )

      if (amountSplit[1]) {
        amountBN = amountBN.add(
          floatPartBN.mul(
            ethers.BigNumber.from(10).pow(
              ethers.BigNumber.from(18 - amountSplit[1].substring(0, 10).length)
            )
          )
        )
      }
      return amountBN
    },
    async onClick() {
      const result: { ok: boolean; error?: { code: number; message: string } } =
        await this.sendTokens({
          to: this.to,
          amount: this.getBNAmount(),
        })

      if (!result.ok) {
        let title = "Une erreur c'est produite"
        let text =
          "Desoler une erreur c'est produite. Veuiller de l'aide au support et ne rafraichisser pas la page"
        switch (result.error?.code) {
          case -32603:
            title = 'Nonce incorrect !'
            text =
              "Si vous avez cette erreur est vous n'etes pas un dev alors la... Ben c'est bizzare"
            break
          case 4001:
            title = 'Rejection'
            text = 'Vous avez rejeter la transaction !'
            break
          case -32604:
            title = 'oopsie woopsie! '
            text =
              'oopsie woopsie! uwu we made a f**ky wucky!! a wittle f**ko boingo'
            break
        }

        this.$vs.notification({
          position: 'top-right',
          color: 'danger',
          icon: `<i class='bx bxs-error-circle'></i>`,
          duration: 5000,
          title,
          text,
        })
      } else {
        this.$vs.notification({
          position: 'top-right',
          color: 'rgb(59,222,200)',
          icon: `<i class='bx bxs-info-circle' ></i>`,
          duration: 5000,
          title: 'Transaction envoyer',
          text: `La transaction a etait envoyer ! En attente de confirmation`,
        })
      }
    },
    ...mapActions('wallet', ['sendTokens']),
  },
})
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
