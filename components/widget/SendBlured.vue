<template>
  <div
    class="
      bg-white
      shadow-lg
      rounded-lg
      col-span-1
      md:col-span-1
      lg:col-span-3
      p-4
      flex flex-col
      relative
    "
  >
    <div class="absolute inset-0 z-10 bg-transparent">
      <div
        class="
          flex
          justify-center
          items-center
          h-full
          text-lg
          font-bold
          text-center
          mx-4
        "
      >
        Connetez vous pour envoyer des STI
      </div>
    </div>
    <h3
      class="
        text-lg
        flex
        justify-between
        items-center
        text-gray-500
        filter
        blur-sm
      "
    >
      Envoyer
    </h3>
    <div class="grid grid-cols-2 gap-3 mt-6 filter blur-sm">
      <div class="flex flex-col">
        <span class="text-sm text-gray-500">Destinataire </span>
        <input
          class="
            p-2
            rounded-lg
            border
            focus:outline-none focus:ring focus:border-blue-400
          "
          placeholder="0x..."
          type="text"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-sm text-gray-500">Montant </span>
        <input
          class="
            p-2
            rounded-lg
            border
            focus:outline-none focus:ring focus:border-blue-400
          "
          placeholder="10000"
          type="text"
        />
      </div>
      <div class="flex flex-col col-span-2">
        <span class="text-sm text-gray-500">Message </span>
        <div class="h-20 w-full relative">
          <textarea
            class="
              resize-none
              h-full
              w-full
              p-2
              rounded-lg
              border
              focus:outline-none focus:ring focus:border-blue-400
              relative
            "
            maxlength="240"
            placeholder="Merci pour l'extincteur !"
            type="text"
          />
          <div class="absolute bottom-0 right-0 text-xs mr-3 mb-2">230/240</div>
        </div>
      </div>
    </div>
    <div class="mt-10 text-sm grid gap-2 filter blur-sm">
      <div class="flex justify-between items-center">
        Frais Reseau <span class="font-bold text-blue-500">0.0002 BNB</span>
      </div>
      <div class="flex justify-between items-center">
        Frais STI2D <span class="font-bold text-blue-500">10 STI</span>
      </div>
    </div>
    <div class="flex justify-end mt-6 filter blur-sm">
      <button
        class="
          flex
          items-center
          bg-white
          border-2 border-black
          px-5
          py-2
          text-sm
          rounded-lg
          transition
          duration-300
          hover:text-white hover:border-transparent hover:bg-black
          focus:outline-none
          focus:text-white
          focus:bg-black
          focus:border-transparent
          focus:ring
          focus:ring-black
          focus:ring-offset-2
        "
      >
        Envoyer <i class="bx bxs-send ml-2"></i>
      </button>
    </div>
  </div>
</template>
