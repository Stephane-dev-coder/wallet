<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">La Forge</h2>
      <span class="text-sm dark:text-gray-400"
        >Recuperer vos outils et aller miner !
      </span>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <div
        class="w-full rounded-2xl overflow-hidden bg-white dark:bg-dark-1 p-4"
      >
        <div class="flex justify-between">
          <h3 class="text-xl font-semibold dark:text-white">Cree outils</h3>
          <img
            src="/wood_pickaxe.png"
            class="h-14 w-14 bg-gray-100 dark:bg-dark-2 rounded-lg"
          />
        </div>
        <div class="grid grid-cols-1 gap-3 mt-6">
          <div class="flex flex-col">
            <span class="text-sm text-gray-500">BNB </span>
            <div class="relative mt-2 w-full">
              <input
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
      <div
        class="w-full rounded-2xl overflow-hidden bg-white dark:bg-dark-1 p-4"
      >
        <div class="flex justify-between">
          <h3 class="text-xl font-semibold dark:text-white">#1</h3>
          <img
            src="/wood_pickaxe.png"
            class="h-8 w-8 bg-gray-100 dark:bg-dark-2 rounded"
          />
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
            <p class="text-xs text-red-500 mt-2" :class="{ invisible: true }">
              {{ 'Error' }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-3 mt-1">
          <div class="flex flex-col">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Bloquer Claim ? </span>
              <vs-switch v-model="lockClaim" />
            </div>

            <p class="text-xs text-red-500 mt-2" :class="{ invisible: true }">
              {{ 'Error' }}
            </p>
          </div>
        </div>
        <div class="text-sm grid gap-2">
          <div
            class="
              flex
              justify-between
              items-center
              font-semibold
              dark:text-white
            "
          >
            <vs-tooltip>
              Multiplicateur
              <template #tooltip> Multiplie vos gains de vos LPs </template>
            </vs-tooltip>
            <span class="text-blue-500 font-bold">x{{ 5 }}</span>
          </div>
          <div
            class="
              flex
              justify-between
              items-center
              font-semibold
              dark:text-white
            "
          >
            <vs-tooltip>
              Claim bloquer
              <template #tooltip>
                Est ce que vous pourrez retirer vos gains avant que votre temps
                bloquer soit achever
              </template>
            </vs-tooltip>
            <span class="text-blue-500 font-bold">Non</span>
          </div>
          <div
            class="
              flex
              justify-between
              items-center
              font-semibold
              dark:text-white
            "
          >
            <vs-tooltip
              >Temps bloquer
              <template #tooltip>
                Le temps qu'il vous faudra attendre avant de recuperer vos LPs
              </template>
            </vs-tooltip>
            <span class="text-blue-500 font-bold">5 ans</span>
          </div>
        </div>
        <div class="flex justify-end mt-3">
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
            <span v-else>Miner <i class="bx bxs-send ml-2"></i></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      select: '',
      lockClaim: false,
    }
  },
})
</script>

<style lang="scss">
.vs-select-content {
  max-width: none;
}

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

.dark {
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
