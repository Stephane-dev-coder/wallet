<template>
  <div class="w-full h-full relative">
    <button
      class="
        absolute
        left-0
        top-0
        ml-4
        mt-4
        z-10
        flex
        items-center
        bg-white
        hover:bg-gray-200
        dark:bg-nice-dark dark:hover:bg-dark-16
        text-black
        dark:text-white
        px-5
        py-2
        text-sm
        rounded-lg
      "
      @click="leave"
    >
      <i class="bx bx-left-arrow-alt mr-2"></i> Retour
    </button>
    <div
      v-if="error"
      class="
        w-full
        h-full
        flex
        items-center
        justify-center
        bg-white
        dark:bg-nice-dark dark:text-white
      "
    >
      Adresse incorrecte !
    </div>
    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { QrcodeStream } from 'vue-qrcode-reader'
import { ethers } from 'ethers'

export default Vue.extend<any, any, any>({
  components: {
    QrcodeStream,
  },
  layout: 'fullscreen',
  data() {
    return {
      camera: 'auto',
      error: false,
    }
  },
  methods: {
    timeout(ms: number) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },
    leave() {
      this.$router.push('/')
    },
    async onDecode(result: string) {
      this.camera = 'off'
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
        await this.timeout(2000)
        this.$router.push('/')
      } catch (error) {
        this.error = true
        await this.timeout(2000)
        this.camera = 'auto'
      }
    },
    async onInit(promise: Promise<void>) {
      const loading = this.$vs.loading()

      try {
        await promise
        loading.close()
      } catch (error) {
        let text = ''

        switch (error.name) {
          case 'NotAllowedError':
            text = 'Vous devez donner accès à la caméra !'
            break
          case 'NotFoundError':
            text = 'Aucune caméra n`à été trouvée !'
            break
          case 'InsecureContextError':
          case 'NotSupportedError':
            text =
              'Vous devez avoir une connexion securisée HTTPS pour accéder à la caméra'
            break

          case 'NotReadableError':
            text = 'Caméra déjà utilisée'
            break

          case 'OverconstrainedError':
            text = "La caméra n'est pas exploitable par notre logiciel"
            break

          case 'StreamApiNotSupportedError':
            text = "Le navigateur ne permet pas d'accéder à la caméra"
            break

          default:
            text = 'Erreur: ' + error.name
            break
        }
        this.$vs.notification({
          color: 'danger',
          position: 'top-right',
          title: 'Erreur !',
          text,
          duration: 10000,
        })
        setTimeout(() => {
          window.location.reload()
        }, 10000)
      }
    },
    ...mapMutations('sender', ['setTo']),
  },
})
</script>
