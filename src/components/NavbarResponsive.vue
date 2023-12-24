<template>
  <nav class="bg-teal-600 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo del Sitio -->
      <router-link to="/" class="text-white text-xl font-semibold">
        <img
          width="228"
          height="37"
          src="https://www.mintyhost.com/wp-content/uploads/2023/06/mintyhost-logotipo.svg"
          class="attachment-full size-full wp-image-962"
          alt=""
        />
      </router-link>

      <!-- Menú de Navegación para pantallas grandes -->
      <div class="hidden md:block">
        <ul class="space-x-4">
          <li class="inline-block">
            <router-link to="/" class="text-white hover:text-gray-200"
              >Acerca</router-link
            >
          </li>
          <li class="inline-block">
            <router-link to="/" class="text-white hover:text-gray-200"
              >Servicios</router-link
            >
          </li>
          <li class="inline-block">
            <router-link to="/" class="text-white hover:text-gray-200"
              >Contacto</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Menú Hamburguesa (Para dispositivos móviles) -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Menú desplegable para dispositivos móviles -->
    <ul v-if="isMenuOpen" class="xs:hidden mt-2">
      <li class="block">
        <router-link to="/" class="text-white block py-2">Acerca</router-link>
      </li>
      <li class="block">
        <router-link to="/" class="text-white block py-2"
          >Servicios</router-link
        >
      </li>
      <li class="block">
        <router-link to="/" class="text-white block py-2">Contacto</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>