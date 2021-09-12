<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">La Forge</h2>
      <span class="text-sm dark:text-gray-400"
        >Recupérez vos outils et allez miner !
      </span>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <div
        class="w-full rounded-2xl overflow-hidden bg-white dark:bg-dark-1 p-4"
      >
        <div class="flex justify-between">
          <h3 class="text-xl font-semibold dark:text-white">Cree outils</h3>
          <img
            src="/pickaxe/wood.png"
            class="h-14 w-14 bg-gray-100 dark:bg-dark-2 rounded-lg"
          />
        </div>
        <div class="grid grid-cols-1 gap-3 mt-6">
          <div class="flex flex-col">
            <span class="text-sm text-gray-500">BNB </span>
            <div class="relative mt-2 w-full">
              <input
                v-model.number="amount"
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
                :class="{ 'ring-2': false, 'ring-red-400': false }"
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
                  @click="clickMax()"
                >
                  MAX
                </button>
              </div>
            </div>
            <p class="text-xs text-red-500 mt-2" :class="{ invisible: true }">
              {{ 'Error' }}
            </p>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            v-if="factory.show"
            class="
              bg-white
              dark:bg-nice-dark
              text-black
              dark:text-white
              border-2 border-black
              dark:border-white
              px-5
              py-2
              mr-2
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
            :disabled="factory.isDisable"
            :class="{
              'hover:text-white': !factory.isDisable,
              'dark:hover:text-black': !factory.isDisable,
              'hover:border-black': !factory.isDisable,
              'dark:hover:border-white': !factory.isDisable,
              'hover:bg-black': !factory.isDisable,
              'dark:hover:bg-white': !factory.isDisable,
              'cursor-default': factory.isDisable,
            }"
            @click="clickCreateProxy()"
          >
            <i
              v-if="factory.isWaiting"
              class="bx bx-loader-alt animate-spin mr-1"
            ></i>
            <span v-else>Activer Forge <i class="bx bxs-send ml-2"></i></span>
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
            :disabled="create.isDisable"
            :class="{
              'hover:text-white': !create.isDisable,
              'dark:hover:text-black': !create.isDisable,
              'hover:border-black': !create.isDisable,
              'dark:hover:border-white': !create.isDisable,
              'hover:bg-black': !create.isDisable,
              'dark:hover:bg-white': !create.isDisable,
              'cursor-default': create.isDisable,
            }"
            @click="clickAddETH()"
          >
            <i
              v-if="create.isWaiting"
              class="bx bx-loader-alt animate-spin mr-1"
            ></i>
            <span v-else>Cree <i class="bx bxs-send ml-2"></i></span>
          </button>
        </div>
      </div>
      <div
        class="w-full rounded-2xl overflow-hidden bg-white dark:bg-dark-1 p-4"
      >
        <div class="flex justify-between">
          <h3 class="text-xl font-semibold dark:text-white">
            Comment ca marche ?
          </h3>
          <div
            class="
              h-10
              w-10
              bg-blue-200
              text-blue-700 text-xl
              rounded-lg
              flex
              justify-center
              items-center
            "
          >
            <i class="bx bx-question-mark"></i>
          </div>
        </div>
        <p class="mt-2 text-sm dark:text-white">
          <span class="font-bold">1. Cree des LPs</span>, pour cela vous devez
          fournir des STI + BNB dans la liquidity pool ici representer comme une
          pioche en bois. Grace a la forge il ne vous faut que du
          <span class="font-bold">BNB</span>, la forge cree pour vous les STI.
        </p>
        <p
          class="
            p-2
            bg-blue-100
            text-blue-600 text-xs
            mt-2
            flex
            items-center
            rounded
          "
        >
          <i class="bx bxs-info-circle mr-2"></i> Les pioche en bois ne mine pas
          !
        </p>
        <p class="mt-2 text-sm dark:text-white">
          <span class="font-bold">2. Miner</span> une fois que vous avez cree
          une pioche en bois vous pouvez la convertir en une pioche plus
          puissante. Les pioche puissante une fois cree mine du
          <span class="font-bold">STI</span>. Plus la pioche est puissante plus
          vous en miner !
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <WidgetForgeMiner
        v-for="(tool, index) in getTools"
        :key="index"
        :tool="index"
      />
      <WidgetForgeCreate v-if="getRelativeLp > 0" :max="getRelativeLp" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
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

export default Vue.extend<any, any, any, any>({
  data() {
    return {
      factory: {
        isDisable: false,
        isWaiting: false,
        show: true,
      },
      create: {
        isDisable: true,
        isWaiting: false,
      },
      maxETH: 0,
      amount: 0,
      intervals: [],
    }
  },
  computed: {
    ...mapGetters('lockers', ['getTools', 'getRelativeLp']),
    ...mapState('lockers', ['proxyAddress']),
    ...mapState('wallet', ['address']),
  },
  async mounted() {
    if (this.address !== '') {
      this.maxETH = parseFloat(fees(await this.getETHBalance()))
      await this.syncProxy()
      await this.getLpBalance()
    } else {
      this.$router.push('/caverne')
    }
  },
  methods: {
    async clickAddETH() {
      this.create.isWaiting = true
      this.create.isDisable = true
      const previousBalance: BigNumber = await this.getLpBalance()
      const result = await this.createLp(this.amount)
      if (result === -1) {
        this.$vs.notification({
          position: 'top-right',
          color: 'danger',
          icon: `<i class='bx bxs-error-circle'></i>`,
          duration: 10000,
          title: 'Erreur',
          text: "Desoler j'ai pas le temps de programmer l'erreur mais juste contacter l'admin et on trouvera la solution !",
        })

        this.create.isWaiting = false
        this.create.isDisable = false
      } else {
        const idArray = this.intervals.length
        const idInterval = setInterval(async () => {
          const actualBalance: BigNumber = await this.getLpBalance()
          if (actualBalance.gt(previousBalance)) {
            this.$vs.notification({
              position: 'top-right',
              color: 'success',
              icon: `<i class='bx bxs-check-circle'></i>`,
              duration: 4000,
              title: 'Niquel',
              text: 'Votre forge a etait cree !',
            })
            this.create.isWaiting = false
            this.create.isDisable = false
            this.addTool({
              amount: actualBalance.sub(previousBalance)._hex,
              time: '0x00',
              claimLocked: true,
            })
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
            this.create.isWaiting = false
            this.create.isDisable = false
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
    async syncProxy() {
      if (this.factory.show) {
        if (
          this.proxyAddress === '' ||
          this.proxyAddress === '0x0000000000000000000000000000000000000000'
        ) {
          const address = await this.getProxy(this.address)
          if (address !== -1) {
            this.factory.show =
              address === '0x0000000000000000000000000000000000000000'
            this.create.isDisable = this.factory.show
          }
        } else {
          if (
            this.proxyAddress === '0x0000000000000000000000000000000000000000'
          ) {
            await this.getProxy(this.address)
          }
          this.factory.show =
            this.proxyAddress === '0x0000000000000000000000000000000000000000'
          this.create.isDisable = this.factory.show
        }
      }
    },
    async clickMax() {
      this.syncProxy()
      if (this.maxETH > 0.01) {
        this.amount = this.maxETH - 0.01
      } else {
        this.amount = 0
      }
      this.maxETH = parseFloat(fees(await this.getETHBalance()))
    },
    async clickCreateProxy() {
      const result = await this.createProxy()
      if (result === -1) {
        this.$vs.notification({
          position: 'top-right',
          color: 'danger',
          icon: `<i class='bx bxs-error-circle'></i>`,
          duration: 10000,
          title: 'Erreur',
          text: "Desoler j'ai pas le temps de programmer l'erreur mais juste contacter l'admin et on trouvera la solution !",
        })
      } else {
        const idArray = this.intervals.length
        const idInterval = setInterval(async () => {
          await this.syncProxy()
          if (!this.factory.show) {
            this.$vs.notification({
              position: 'top-right',
              color: 'success',
              icon: `<i class='bx bxs-check-circle'></i>`,
              duration: 4000,
              title: 'Niquel',
              text: 'Votre argent a etait crediter !',
            })
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
    ...mapActions('wallet', ['getETHBalance']),
    ...mapActions('lockers', [
      'createProxy',
      'getProxy',
      'createLp',
      'getLpBalance',
    ]),
    ...mapMutations('lockers', ['addTool']),
  },
})
</script>
