<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">F.A.Q</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <div
        v-for="(question, index) in questions"
        :key="index"
        class="w-full rounded-lg overflow-hidden bg-white dark:bg-dark-1 p-4"
      >
        <h3 class="font-bold text-blue-500">
          {{ question.q }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">
          {{ question.a }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
           questions: [
        {
          q: "Où est-ce que je pourrais avoir plus d'information sur le token STI ?",
          a: 'Vous trouverez toutes les informations que vous recherchez dans le token metrics trouvable dans le bas de page',
        },
        {
          q: 'A quoi sert le STI ?',
          a: "Le STI est un token communautaire. Il réunie toutes les personnes qui veulent créer des petit projet et se marrer. Un seul mot d'ordre créer et partager !",
        },
        {
          q: 'Est ce que je peux devenir riche grâce au STI ?',
          a: "Oui... Mais cela ne dépendra uniquement de l'investissement de la communauté au projet",
        },
        {
          q: 'Comment marche le wallet ?',
          a: 'Vous avez à votre disposition une suite de tutoriel vidéos qui devrait vous aider à performer les actions les plus courantes autour du STI',
        },
        {
          q: 'Comment puis-je contribuer ?',
          a: "Vous pouvez contribuer de 1000 façons différentes, en parler, créer des meme, aider au développement, proposer des idées, etc. Soyez sûr d'une chose cette communauté ne connait pas de limite alors si vous avez du temps : CONTRIBUEZ !",
        },
        {
          q: 'Comment puis-je acheter du STI ?',
          a: 'Vous pouvez acheter des STI sur SushiSwap. Si vous ne connaissez pas bien cette plateforme laisser nous vous guider grâce a nos tutoriels que vous trouverez en bas de la page !',
        },
        {
          q: "J'ai une autre question où est-ce que je peux la poser ?",
          a: 'Discord est votre meilleur ami pour poser toute question sur le projet !',
        },
      ],
    }
  },
})
</script>
