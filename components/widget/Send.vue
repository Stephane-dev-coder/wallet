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
      <div class="flex flex-col col-span-2 lg:col-span-1">
        <span class="text-sm text-gray-500">Destinataire </span>
        <div class="relative mt-2 w-full">
          <input
            v-model="fakeTo"
            class="
              w-full
              dark:bg-dark-4
              p-2
              rounded-lg
              border
              dark:border-dark-4
              focus:outline-none focus:ring-2
              dark:text-gray-200
            "
            placeholder="0x..."
            type="text"
            :class="{ 'ring-2': !isToGood, 'ring-red-400': !isToGood }"
            @blur="leaveToInput()"
          />
          <div
            class="
              inset-y-0
              right-0
              absolute
              mx-4
              flex
              justify-center
              items-center
            "
          >
            <qrcode-capture
              ref="input"
              class="invisible absolute"
              @detect="onDecode"
            />
            <vs-tooltip
              v-model="isAsking"
              shadow
              interactivity
              not-hover
              color="#FFF"
            >
              <button
                class="
                  text-blue-500
                  hover:text-blue-300
                  focus:text-blue-700
                  text-lg
                "
                @click="isAsking = true"
              >
                <i class="bx bx-qr-scan"></i>
              </button>
              <template #tooltip>
                <div class="grid grid-cols-2 gap-2 bg-white p-1">
                  <button
                    class="
                      h-8
                      w-8
                      rounded
                      bg-blue-400
                      flex
                      justify-center
                      items-center
                      text-lg
                      relative
                    "
                    @click="trigger"
                  >
                    <i class="bx bx-image-alt"></i>
                  </button>
                  <button
                    class="
                      h-8
                      w-8
                      rounded
                      bg-blue-400
                      flex
                      justify-center
                      items-center
                      text-lg
                    "
                    @click="goScanner()"
                  >
                    <i class="bx bx-camera"></i>
                  </button>
                </div> </template
            ></vs-tooltip>
          </div>
        </div>
        <p class="text-xs text-red-500 mt-2" :class="{ invisible: isToGood }">
          L'adresse est incorrect
        </p>
      </div>
      <div class="flex flex-col col-span-2 lg:col-span-1">
        <span class="text-sm text-gray-500">Montant </span>
        <div class="relative mt-2 w-full">
          <input
            v-model.number="fakeAmount"
            class="
              dark:bg-dark-4
              w-full
              p-2
              rounded-lg
              border
              dark:border-dark-4
              focus:outline-none focus:ring-2
              dark:text-gray-200
            "
            placeholder="10000"
            type="number"
            :class="{ 'ring-2': amountError, 'ring-red-400': amountError }"
            @blur="leaveAmountInput()"
            @input="userTyping()"
          />
          <div
            class="
              inset-y-0
              right-0
              absolute
              mx-4
              flex
              justify-center
              items-center
            "
          >
            <button
              class="
                text-blue-500
                hover:text-blue-300
                focus:text-blue-700
                text-sm
              "
              @click="setMaxAmount()"
            >
              MAX
            </button>
          </div>
        </div>
        <p
          class="text-xs text-red-500 mt-2"
          :class="{ invisible: !amountError }"
        >
          {{ amountErrorMessage }}
        </p>
      </div>
      <div class="flex flex-col col-span-2">
        <span class="text-sm text-gray-500">Message </span>
        <CustomTextarea v-model="fakeMessage" />
      </div>
    </div>
    <div class="mt-10 text-sm grid gap-2">
      <div
        class="flex justify-between items-center font-semibold dark:text-white"
      >
        Frais Reseau
        <span class="text-blue-500 font-bold">{{ displayFees }} MATIC</span>
      </div>
      <div
        class="flex justify-between items-center font-semibold dark:text-white"
      >
        Frais STI2D
        <span
          v-if="typingTimeout === null || amount === ''"
          class="text-blue-500 font-bold"
          >{{ stiFees }} STI</span
        >
        <span v-else class="text-blue-500 font-bold">
          <i class="bx bx-loader-alt animate-spin mr-1"></i>
          <span>STI</span></span
        >
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
        :disabled="isButtonDisabled"
        :class="{
          'hover:text-white': !isButtonDisabled,
          'dark:hover:text-black': !isButtonDisabled,
          'hover:border-black': !isButtonDisabled,
          'dark:hover:border-white': !isButtonDisabled,
          'hover:bg-black': !isButtonDisabled,
          'dark:hover:bg-white': !isButtonDisabled,
          'cursor-default': isButtonDisabled,
        }"
        @click="onClick"
      >
        <i v-if="isWaiting" class="bx bx-loader-alt animate-spin mr-1"></i>
        <span v-else>Envoyer <i class="bx bxs-send ml-2"></i></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import { QrcodeCapture } from 'vue-qrcode-reader'
import { BigNumber, ethers, Event } from 'ethers'

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

export default Vue.extend<any, any, any>({
  components: {
    QrcodeCapture,
  },
  data() {
    return {
      amountError: false,
      amountErrorMessage: 'x',
      stiFees: 0,
      typingTimeout: null,
      isWaiting: false,
      isAsking: false,
    }
  },
  computed: {
    fakeTo: {
      get() {
        return this.to
      },
      set(newValue) {
        this.setTo(newValue)
      },
    },
    fakeAmount: {
      get() {
        return this.amount
      },
      set(newValue) {
        this.setAmount(newValue)
      },
    },
    fakeMessage: {
      get() {
        return this.message
      },
      set(newValue) {
        this.setMessage(newValue)
      },
    },
    isButtonDisabled() {
      return !this.isToGood || this.amountError || this.amount === ''
    },
    displayFees() {
      return fees(this.gasPrice.mul(ethers.BigNumber.from(97000)))
    },
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
    getBNAmount() {
      if (this.amount > 0) {
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
                ethers.BigNumber.from(
                  18 - amountSplit[1].substring(0, 10).length
                )
              )
            )
          )
        }
        return amountBN
      } else {
        return ethers.BigNumber.from(0)
      }
    },
    ...mapState('wallet', ['balance', 'gasPrice']),
    ...mapState('sender', ['to', 'amount', 'message', 'isMax']),
  },
  methods: {
    async onDecode(promise: Promise<{ content: string | null }>) {
      const { content } = await promise
      const result = content
      if (result === null) {
        this.$vs.notification({
          color: 'danger',
          position: 'top-right',
          title: 'Success !',
          text: 'Address Introuvable !',
          duration: 2000,
        })
      } else {
        try {
          const address = ethers.utils.getAddress(result)
          this.setTo(address)
          this.$vs.notification({
            color: 'success',
            position: 'top-right',
            title: 'Success !',
            text: 'Address trouver !',
            duration: 2000,
          })
        } catch (error) {
          this.$vs.notification({
            color: 'danger',
            position: 'top-right',
            title: 'Erreur !',
            text: 'Address Introuvable !',
            duration: 2000,
          })
        }
      }
    },
    trigger() {
      const input = this.$refs.input as any
      input.$el.click()
    },
    goScanner() {
      this.$router.push('/scanner')
    },
    setMaxAmount() {
      this.setAmount(parseFloat(fees(this.balance)))
      this.setIsMax(true)
    },
    userTyping() {
      this.setIsMax(false)
      if (this.typingTimeout === null) {
        this.typingTimeout = setTimeout(async () => {
          this.typingTimeout = null
          const result = await this.getTokenFees(this.getBNAmount)
          if (result._hex === '-0x01') {
            this.$vs.notification({
              position: 'top-right',
              color: 'danger',
              icon: `<i class='bx bxs-error-circle'></i>`,
              duration: 10000,
              title: 'Frais Invalide',
              text: "Le serveur RPC a eu une erreur et n'a pas retourner la bonnne valeur veuiller attendre une petite minute et relance le site",
            })
          }
          this.stiFees = fees(result)
        }, 1000)
      } else {
        clearTimeout(this.typingTimeout)
        this.typingTimeout = setTimeout(async () => {
          this.typingTimeout = null
          const result = await this.getTokenFees(this.getBNAmount)
          if (result._hex === '-0x01') {
            this.$vs.notification({
              position: 'top-right',
              color: 'danger',
              icon: `<i class='bx bxs-error-circle'></i>`,
              duration: 10000,
              title: 'Frais Invalide',
              text: "Le serveur RPC a eu une erreur et n'a pas retourner la bonnne valeur veuiller attendre une petite minute et relance le site",
            })
          }
          this.stiFees = fees(result)
        }, 1000)
      }
    },
    leaveAmountInput() {
      if (this.amount > 99999999) {
        this.setAmount(99999999)
      }
      if (this.amount !== '') {
        if (this.amount < 0) {
          this.amountError = true
          this.amountErrorMessage = 'Le montant doit etre positif !'
        } else if (this.amount === 0) {
          this.amountError = true
          this.amountErrorMessage = "Putain mais comment j'envoie 0 moi ?"
        } else {
          const amountBN = this.getBNAmount
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
          this.setTo(address)
        } catch (error) {
          this.setTo('')
        }
      }
    },
    async onClick() {
      this.isWaiting = true
      const result: { ok: boolean; error?: { code: number; message: string } } =
        await this.sendTokens({
          to: this.to,
          message: this.message,
          amount: this.isMax ? this.balance : this.getBNAmount,
          callback:
            (tx: string) =>
            async (
              _: string,
              __: string,
              ___: BigNumber,
              event: Event,
              isNotTransaction = false,
              provider:
                | ethers.providers.JsonRpcProvider
                | ethers.providers.Web3Provider
                | undefined
            ) => {
              let transaction: ethers.providers.TransactionReceipt
              if (isNotTransaction && provider) {
                transaction = await provider.getTransactionReceipt(tx)
              } else if (tx === event.transactionHash) {
                transaction = await event.getTransactionReceipt()
              } else {
                return false
              }

              if (transaction.status === 1) {
                this.$vs.notification({
                  position: 'top-right',
                  color: 'success',
                  icon: `<i class='bx bxs-check-circle' ></i>`,
                  duration: 5000,
                  title: 'Transaction effectuer !',
                  text: 'Votre est argent a etait envoyer !',
                })
              } else {
                this.$vs.notification({
                  position: 'top-right',
                  color: 'danger',
                  icon: `<i class='bx bxs-error-circle'></i>`,
                  duration: 5000,
                  title: 'Transaction Fail !',
                  text: `La transaction n'a pas fonctionner vous pouvez avoir plus de details sur https://polygonscan.com/tx/${tx}`,
                })
              }
            },
        })

      this.setTo('')
      this.setAmount(0)
      this.setMessage('')

      this.isWaiting = false

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

          case -32605:
            title = 'Limite atteinte'
            text =
              'La limite de votre serveur RPC a etait atteinte veuiller soit attendre ou changer de serveur RPC'
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
          color: 'rgb(59,130,246)',
          icon: `<i class='bx bxs-info-circle' ></i>`,
          duration: 5000,
          title: 'Transaction envoyer',
          text: `La transaction a etait envoyer ! En attente de confirmation`,
        })
      }
    },
    ...mapActions('wallet', ['sendTokens', 'getTokenFees', 'getProvider']),
    ...mapMutations('sender', ['setTo', 'setAmount', 'setMessage', 'setIsMax']),
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
