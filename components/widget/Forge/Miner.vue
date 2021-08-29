<template>
  <div class="w-full rounded-2xl overflow-hidden bg-white dark:bg-dark-1 p-4">
    <div class="flex justify-between">
      <h3 class="text-xl font-semibold dark:text-white">
        {{ displayBigNumber }}
      </h3>
      <img :src="pickaxe" class="h-8 w-8 bg-gray-100 dark:bg-dark-2 rounded" />
    </div>
    <div class="grid grid-cols-1 gap-3 mt-1">
      <div class="flex flex-col">
        <span class="text-sm text-gray-500">Niveau </span>
        <vs-select
          v-model="select"
          placeholder="Select"
          class="w-full mt-2"
          state="dark"
        >
          <vs-option label="Pierre" value="1"> Pierre </vs-option>
          <vs-option label="Fer" value="2"> Fer </vs-option>
          <vs-option label="Or" value="3"> Or </vs-option>
          <vs-option label="Diamand" value="4"> Diamand </vs-option>
          <vs-option label="Netherite" value="5"> Netherite </vs-option>
        </vs-select>
        <p
          v-if="select != ''"
          class="text-xs text-red-500 mt-2"
          :class="{ invisible: true }"
        >
          {{ 'Error' }}
        </p>
      </div>
    </div>
    <div v-if="select != ''" class="grid grid-cols-1 gap-3 mt-1">
      <div class="flex flex-col">
        <div class="flex justify-between">
          <span class="text-sm text-gray-500">Bloquer Claim ? </span>
          <vs-switch v-model="lockClaim" />
        </div>

        <p
          v-if="select != ''"
          class="text-xs text-red-500 mt-2"
          :class="{ invisible: true }"
        >
          {{ 'Error' }}
        </p>
      </div>
    </div>
    <div v-if="select != ''" class="text-sm grid gap-2">
      <div
        class="flex justify-between items-center font-semibold dark:text-white"
      >
        <vs-tooltip>
          Multiplicateur
          <template #tooltip> Multiplie vos gains de vos LPs </template>
        </vs-tooltip>
        <span class="text-blue-500 font-bold">x{{ multiplier }}</span>
      </div>
      <div
        class="flex justify-between items-center font-semibold dark:text-white"
      >
        <vs-tooltip>
          Claim bloquer
          <template #tooltip>
            Est ce que vous pourrez retirer vos gains avant que votre temps
            bloquer soit achever
          </template>
        </vs-tooltip>
        <span class="text-blue-500 font-bold">{{
          lockClaim ? 'Oui' : 'Non'
        }}</span>
      </div>
      <div
        class="flex justify-between items-center font-semibold dark:text-white"
      >
        <vs-tooltip
          >Temps bloquer
          <template #tooltip>
            Le temps qu'il vous faudra attendre avant de recuperer vos LPs
          </template>
        </vs-tooltip>
        <span class="text-blue-500 font-bold">{{ select }} ans</span>
      </div>
    </div>
    <div
      class="flex mt-5"
      :class="{ 'justify-between': select != '', 'justify-end': select == '' }"
    >
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
        <i v-if="sell.isWaiting" class="bx bx-loader-alt animate-spin mr-1"></i>
        <span v-else>Vendre <i class="bx bxs-send ml-2"></i></span>
      </button>
      <button
        v-if="select != ''"
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
        <i
          v-if="miner.isWaiting"
          class="bx bx-loader-alt animate-spin mr-1"
        ></i>
        <span v-else>Miner <i class="bx bxs-send ml-2"></i></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
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
  props: {
    tool: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      select: '',
      lockClaim: false,
      miner: {
        isWaiting: false,
      },
      sell: {
        isWaiting: false,
      },
      amount: '0x00',
    }
  },
  computed: {
    displayBigNumber() {
      return fees(ethers.BigNumber.from(this.amount))
    },
    pickaxe() {
      switch (this.select) {
        case '2':
          this.setToolTime({ id: this.tool, time: '0x3C26700' })
          return '/pickaxe/iron.png'

        case '3':
          this.setToolTime({ id: this.tool, time: '0x5A39A80' })
          return '/pickaxe/gold.png'

        case '4':
          this.setToolTime({ id: this.tool, time: '0x784CE00' })
          return '/pickaxe/diamond.png'

        case '5':
          this.setToolTime({ id: this.tool, time: '0x9660180' })
          return '/pickaxe/netherite.png'

        case '1':
          this.setToolTime({ id: this.tool, time: '0x1E13380' })
          return '/pickaxe/stone.png'

        default:
          this.setToolTime({ id: this.tool, time: '0x00' })
          return '/pickaxe/wood.png'
      }
    },
    multiplier() {
      const multiplier = this.lockClaim ? 2 : 1
      return multiplier * (parseInt(this.select) + 1)
    },
    ...mapGetters('lockers', ['getTool']),
  },
  watch: {
    lockClaim(newValue) {
      this.setToolClaim({ id: this.tool, status: newValue })
    },
  },
  async mounted() {
    const tool = await this.getTool(this.tool)
    this.amount = tool.amount
    console.log(tool)
    this.lockClaim = tool.claimLocked
    switch (tool.time) {
      case '0x1E13380':
        this.select = '1'
        break
      case '0x3C26700':
        this.select = '2'
        break
      case '0x5A39A80':
        this.select = '3'
        break
      case '0x784CE00':
        this.select = '4'
        break

      case '0x9660180':
        this.select = '5'
        break
      case '0x00':
      default:
        this.select = ''
        break
    }
  },
  methods: {
    ...mapMutations('lockers', ['setToolTime', 'setToolClaim']),
  },
})
</script>

<style lang="scss">
.vs-select-content {
  max-width: none;
}

.dark {
  .vs-select--state-dark {
    .vs-select__input {
      background-color: rgba(39, 39, 39, 1);
      color: white;
    }

    .vs-select__label {
      color: white;
    }
  }

  .vs-select--state-dark.activeOptions {
    .vs-select__label {
      color: rgba(var(--vs-text), 1);
    }
  }

  .vs-switch {
    color: #fff;
    padding: 5px;
    border-radius: 20px;
    min-width: 48px;
    height: 28px;
    border: 0px;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    background: rgba(39, 39, 39, 1);
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    overflow: hidden;
  }
}
</style>
