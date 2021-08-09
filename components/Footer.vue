<template>
  <div
    class="
      bg-white
      dark:bg-dark-1 dark:text-white dark:border-t dark:border-gray-200
      py-10
      px-14
      grid grid-cols-5
      gap-4
    "
  >
    <ul>
      <li class="text-blue-500 text-lg font-bold">Reseaux Sociaux</li>
      <li
        v-for="(social, index) in socials"
        :key="index"
        class="dark:text-gray-500 text-gray-600 text-sm mt-4"
      >
        <a
          v-if="!social.internal"
          :href="social.url"
          target="_blank"
          class="hover:text-blue-500 transition duration-150"
        >
          <i class="mr-1" :class="social.icon"></i> {{ social.title }}</a
        >
        <NuxtLink
          v-else
          :to="social.url"
          class="hover:text-blue-500 transition duration-150"
        >
          <i class="mr-1" :class="social.icon"></i> {{ social.title }}
        </NuxtLink>
      </li>
    </ul>
    <ul>
      <li class="text-blue-500 text-lg font-bold">Liens utiles</li>
      <li
        v-for="(info, index) in infos"
        :key="index"
        class="dark:text-gray-500 text-gray-600 text-sm mt-4"
      >
        <a
          v-if="!info.internal"
          :href="info.url"
          target="_blank"
          class="hover:text-blue-500 transition duration-150"
        >
          <i class="mr-1" :class="info.icon"></i> {{ info.title }}</a
        >
        <NuxtLink
          v-else
          :to="info.url"
          class="hover:text-blue-500 transition duration-150"
        >
          <i class="mr-1" :class="info.icon"></i> {{ info.title }}
        </NuxtLink>
      </li>
    </ul>
    <ul>
      <li class="text-blue-500 text-lg font-bold">About Us</li>
      <li
        v-for="(about, index) in abouts"
        :key="index"
        class="dark:text-gray-500 text-gray-600 text-sm mt-4"
      >
        <a
          v-if="!about.internal"
          :href="about.url"
          target="_blank"
          class="hover:text-blue-500 transition duration-150"
        >
          <i class="mr-1" :class="about.icon"></i> {{ about.title }}</a
        >
        <NuxtLink
          v-else
          :to="about.url"
          class="hover:text-blue-500 transition duration-150"
        >
          <i class="mr-1" :class="about.icon"></i> {{ about.title }}
        </NuxtLink>
      </li>
    </ul>
    <div class="col-span-2">
      <h3 class="text-blue-500 text-lg font-bold">Newsletter</h3>
      <div class="flex mt-4">
        <input
          v-model="newsletter"
          placeholder="tkt rajoute ton email"
          type="text"
          class="
            flex-grow
            dark:bg-dark-4
            p-2
            rounded-lg
            border
            dark:border-dark-4
            focus:outline-none focus:ring-2
            dark:text-gray-200
          "
        />
        <button
          class="
            ml-4
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
        >
          S'abonner
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socials: [
        {
          title: 'Twitter',
          icon: 'bx bxl-twitter',
          url: 'https://twitter.com/home',
          internal: false,
        },
        {
          title: 'Discord',
          icon: 'bx bxl-discord-alt',
          url: 'https://discord.com/',
          internal: false,
        },
        {
          title: 'TikTok',
          icon: 'bx bxl-tiktok',
          url: 'https://www.tiktok.com/fr/',
          internal: false,
        },
        {
          title: 'SnapChat',
          icon: 'bx bxl-snapchat',
          url: 'https://www.snapchat.com/',
          internal: false,
        },
        {
          title: 'Instagram',
          icon: 'bx bxl-instagram-alt',
          url: 'https://www.instagram.com/',
          internal: false,
        },
      ],
      infos: [
        {
          title: 'Whitepaper V1',
          icon: 'bx bx-file',
          url: '/whitepaper/v1.pdf',
          internal: false,
        },
        {
          title: 'Tutoriels',
          icon: 'bx bxs-videos',
          url: '/tutoriels',
          internal: true,
        },
        {
          title: 'F.A.Q',
          icon: 'bx bx-question-mark',
          url: '/faq',
          internal: true,
        },
      ],
      abouts: [
        {
          title: 'Communauté',
          icon: 'bx bxs-group',
          url: '/community',
          internal: true,
        },
        {
          title: 'Team',
          icon: 'bx bx-laptop',
          url: '/devs',
          internal: true,
        },
        {
          title: 'Token Information',
          icon: 'bx bxs-coin',
          url: '/token',
          internal: true,
        },
      ],
      newsletter: 'tkt rajoute ton email',
    }
  },
}
</script>
