<template>
  <div class="container mx-auto px-4 mb-20">
    <div class="mt-10">
      <h2 class="text-3xl dark:text-gray-200">Nos Ingenieurs !</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mt-10">
      <div
        class="
          flex flex-col
          items-center
          p-4
          dark:bg-dark-1
          bg-white
          rounded-lg
        "
      >
        <img
          src="/devs/bosssuricate.jpeg"
          class="rounded-full h-36 w-36"
          alt=""
        />
        <h2 class="flex items-center mt-4 flex-bold text-lg dark:text-white">
          BossSuricate
        </h2>
        <div
          class="flex mt-2 text-gray-400 dark:text-white justify-center w-full"
        >
          <vs-tooltip>
            <div class="mx-2">💻</div>
            <template #tooltip> Devellopeur </template>
          </vs-tooltip>
          <div>/</div>
          <vs-tooltip>
            <div class="mx-2">👑</div>
            <template #tooltip> Createur </template>
          </vs-tooltip>
          <div>/</div>
          <vs-tooltip>
            <div class="mx-2">🎨</div>
            <template #tooltip> Designer </template>
          </vs-tooltip>
        </div>
        <p class="text-gray-400 text-xs mt-2">
          Le meilleur devellopeur du monde !
        </p>
      </div>
      <div
        class="
          flex flex-col
          items-center
          p-4
          dark:bg-dark-1
          bg-white
          rounded-lg
        "
      >
        <img src="/devs/stebz.jpeg" class="rounded-full h-36 w-36" alt="" />
        <h2 class="flex items-center mt-4 flex-bold text-lg dark:text-white">
          Stebz
        </h2>
        <div
          class="flex mt-2 text-gray-400 dark:text-white justify-center w-full"
        >
          <vs-tooltip>
            <div class="mx-2">💻</div>
            <template #tooltip>Future Devellopeur </template>
          </vs-tooltip>
          <div>/</div>
          <vs-tooltip>
            <div class="mx-2">🎤</div>
            <template #tooltip> Community Manager </template>
          </vs-tooltip>
          <div>/</div>
          <vs-tooltip>
            <div class="mx-2">🔑</div>
            <template #tooltip> Administrateur </template>
          </vs-tooltip>
        </div>
        <p class="text-gray-400 text-xs mt-2">
          Il est la pour la mixiter de la communauter.
        </p>
      </div>
      <div
        class="
          flex flex-col
          items-center
          p-4
          dark:bg-dark-1
          bg-white
          rounded-lg
        "
      >
        <img src="/devs/wayager.jpg" class="rounded-full h-36 w-36" alt="" />
        <h2 class="flex items-center mt-4 flex-bold text-lg dark:text-white">
          Wayager⁷
        </h2>
        <div
          class="flex mt-2 text-gray-400 dark:text-white justify-center w-full"
        >
          <vs-tooltip>
            <div class="mx-2">🎨</div>
            <template #tooltip>Designer </template>
          </vs-tooltip>
        </div>
        <p class="text-gray-400 text-xs mt-2">
          Le createur du design du token STI.
        </p>
      </div>
    </div>
  </div>
</template>
