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
            src="/pickaxe/wood.png"
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
      <WidgetForgeMiner :identifier="1" amount="0xfffffffffffffff" />
      <WidgetForgeMiner :identifier="2" amount="0xfffffffffffffff" />
      <WidgetForgeMiner :identifier="3" amount="0xfffffffffffffff" />
      <WidgetForgeMiner :identifier="4" amount="0xfffffffffffffff" />
      <WidgetForgeMiner :identifier="5" amount="0xfffffffffffffff" />
      <WidgetForgeMiner :identifier="6" amount="0xfffffffffffffff" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
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
    }
  },
})
</script>
