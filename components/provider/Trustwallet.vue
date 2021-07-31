<template>
  <div
    class="
      flex flex-col
      items-center
      px-3
      py-1
      dark:hover:bg-dark-8
      rounded
      cursor-pointer
    "
    @click="handleClick"
  >
    <img src="/providers/trustwallet.png" alt="TrustWallet logo" />
    <span class="text-xs dark:text-gray-400 mt-2">TrutWallet</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { ethers } from 'ethers'

export default Vue.extend<any, any, any, any>({
  methods: {
    async handleClick() {
      const result: {
        ok: boolean
        provider?: ethers.providers.Web3Provider | undefined
        error?: { code: number; message: string } | undefined
      } = await this.useWallet('metamask')
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
      } else {
        this.$vs.notification({
          position: 'top-right',
          color: 'success',
          icon: `<i class='bx bxs-check-circle' ></i>`,
          duration: 2000,
          title: 'Connexion avec success !',
          text: 'Vous pouvez maintenant utiliser tout le potentielle STI',
        })
      }
    },
    ...mapActions('wallet', ['useWallet']),
  },
})
</script>
