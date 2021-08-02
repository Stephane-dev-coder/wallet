<template>
  <div
    class="
      bg-white
      dark:bg-dark-1
      shadow-lg
      rounded-lg
      p-4
      col-span-1
      md:col-span-2
      lg:col-span-4
      flex flex-col
    "
  >
    <h3 class="text-lg flex justify-between items-center dark:text-gray-400">
      <div><span class="line-through">App</span> STI Store</div>
      <!--
        Le jours ou y'aura plus de 2 app enfaite
        <NuxtLink
        to="/store"
        class="
          flex
          items-center
          px-3
          py-2
          hover:bg-gray-100
          dark:hover:bg-dark-16
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
      >
        Decouvrir <i class="bx bx-right-arrow-alt ml-2"></i>
      </NuxtLink>
      -->
    </h3>
    <div class="flex flex-row mt-6 overflow-x-auto">
      <WidgetAppstoreItemWebsite
        to="https://www.cbetwallet.tk/"
        image="/tracker.png"
        name="Wallet Tracker"
        class="mr-4"
      />
      <WidgetAppstoreItemLink
        to="/stats"
        image="/stats.png"
        name="Statistiques"
        class="mr-4"
      />
      <!--
        Le jour ou on aura vraimnent beaucoup d'app !
        <div class="flex flex-col items-center w-32">
        <div
          class="
            flex
            justify-center
            items-center
            h-32
            w-32
            bg-green-400
            rounded-2xl
            shadow-lg
            cursor-pointer
            transform
            duration-100
            hover:scale-105 hover:shadow-xl
            overflow-hidden
          "
        >
          <i class="bx bx-plus text-white text-6xl"></i>
        </div>
        <span class="text-xs mt-4 dark:text-white">et plus encore</span>
      </div>
      -->
    </div>
  </div>
</template>
