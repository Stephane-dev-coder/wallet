<template>
  <div
    class="flex flex-col relative"
    :class="{ dark: isDark }"
    style="min-height: 100vh"
  >
    <Navbar :click-connect="clickConnect" :click-user="clickUser" />
    <div class="bg-nice-white dark:bg-nice-dark flex-grow">
      <Nuxt />
    </div>
    <div
      v-if="connectModal && !isConnected"
      class="absolute inset-0 bg-black bg-opacity-40 z-20"
    >
      <div
        class="h-screen flex justify-center items-center sticky"
        @click.self="connectModal = false"
      >
        <div
          class="
            mx-4
            bg-white
            text-lg
            dark:bg-dark-24 dark:text-gray-200
            w-full
            md:w-4/5
            lg:w-2/3
            xl:w-3/5
            p-6
            rounded-xl
            flex flex-col
          "
        >
          <div class="flex justify-between">
            Selectionner un provider
            <button
              class="
                flex
                items-center
                px-3
                py-2
                hover:bg-gray-100
                dark:hover:bg-dark-8
                rounded-lg
                text-sm
                focus:text-white
                dark:focus:text-black
                focus:bg-black
                dark:focus:bg-white
                focus:ring
                focus:ring-black
                focus:ring-white
                focus:ring-offset-2
                focus:outline-none
                transition
                duration-300
                dark:ring-offset-black
              "
              @click="connectModal = false"
            >
              Sortir <i class="bx bx-right-arrow-alt ml-2"></i>
            </button>
          </div>
          <div
            class="
              mt-6
              grid grid-cols-5
              sm:grid-cols-6
              md:grid-cols-7
              lg:grid-cols-8
              xl:grid-cols-8
              gap-4
            "
          >
            <ProviderMetamask />
            <ProviderTrustwallet />
            <ProviderTokenpocket />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="userModal && isConnected"
      class="absolute inset-0 bg-black bg-opacity-40 z-20"
    >
      <div
        class="h-screen flex justify-center items-center sticky"
        @click.self="userModal = false"
      >
        <div
          class="
            m-6
            bg-white
            text-lg
            dark:bg-dark-24 dark:text-gray-200
            w-full
            lg:w-1/3
            p-6
            rounded-xl
            flex flex-col
          "
        >
          <div class="flex justify-between">
            Preferences
            <!-- Bon ouai on rajoutera des trucs plus tard -->
            <button
              class="
                flex
                items-center
                px-3
                py-2
                hover:bg-gray-100
                dark:hover:bg-dark-8
                rounded-lg
                text-sm
                focus:text-white
                dark:focus:text-black
                focus:bg-black
                dark:focus:bg-white
                focus:ring
                focus:ring-black
                focus:ring-white
                focus:ring-offset-2
                focus:outline-none
                transition
                duration-300
                dark:ring-offset-black
              "
              @click="userModal = false"
            >
              Sortir <i class="bx bx-right-arrow-alt ml-2"></i>
            </button>
          </div>
          <div class="flex justify-center">
            <button
              class="
                mt-4
                bg-white
                dark:bg-dark-24
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
              @click="clickDisconnect()"
            >
              se deconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { ethers } from 'ethers'

export default Vue.extend<any, any, any, any>({
  data() {
    return {
      connectModal: false,
      userModal: false,
    }
  },
  computed: {
    ...mapState('app', ['isDark', 'darkPreference']),
    ...mapState('wallet', ['isConnected']),
  },
  async mounted() {
    if (process.browser) {
      const result: {
        ok: boolean
        provider?: ethers.providers.Web3Provider | undefined
        error?: { code: number; message: string } | undefined
      } = await this.connectWallet()

      if (!result.ok) {
        const title = 'Erreur Connexion !'
        let text = "Nous n'avons pas reussi a vous connecter !"

        switch (result.error?.code) {
          case 4001:
            text = 'Vous avez refuser de vous connecter avec metamask !'
            break
          case 1:
            text =
              'Nous avons trouver aucun provider (window.ethereum) veuiller verifier que vous avez bien MetaMask installer !'
            break
          case 2:
            text =
              'Desoler la blockchain est incorrecte. Veuiller selectionner Polygon !'
            break

          default:
            break
        }

        this.$vs.notification({
          position: 'top-right',
          color: 'danger',
          icon: `<i class='bx bxs-error-circle'></i>`,
          duration: 6000,
          title,
          text,
        })
      }

      this.getGlobalInfos()
      switch (this.darkPreference) {
        case 'system':
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setDark()
          } else {
            this.setLight()
          }
          break
        case 'light':
          this.setLight()
          break

        case 'dark':
          this.setDark()
          break

        default:
          this.setLight()
          break
      }
    }
  },
  methods: {
    clickConnect() {
      this.connectModal = true
    },
    clickDisconnect() {
      this.disconnectWallet()
      this.userModal = false
    },
    clickUser() {
      this.userModal = true
    },
    ...mapMutations('app', ['setDark', 'setLight']),
    ...mapActions('wallet', [
      'connectWallet',
      'getGlobalInfos',
      'disconnectWallet',
    ]),
  },
})
</script>
