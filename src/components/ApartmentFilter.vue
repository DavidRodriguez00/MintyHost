<template>
  <div class="flex justify-center items-center mt-5">
    <div class="bg-white p-4 rounded shadow-lg w-full md:flex md:items-center">
      <h2 class="text-xl font-semibold mb-4 md:w-3/5 lg:w-1/2 text-center">
        Selecciona tus filtros:
      </h2>
      <div class="md:w-full md:flex md:justify-between items-center">
        <div class="mb-4 md:w-1/3">
          <label for="Barrio" class="block text-sm font-medium text-gray-700"
            >Barrio:</label
          >
          <select
            v-model="selectedBarrio"
            class="mt-1 p-2 w-full md:w-5/6 border rounded"
            v-if="barrios.length"
          >
            <option
              v-for="barrio in barrios"
              :key="barrio.id"
              :value="barrio.id"
            >
              {{ barrio.name }}
            </option>
          </select>
          <p v-else class="block text-sm font-medium text-gray-700">
            Cargando...
          </p>
        </div>
        <!-- <div class="mb-4 md:w-1/3">
          <label for="numeroHuesped" class="block text-sm font-medium text-gray-700"
            >Huéspedes:</label
          >
          <input
            type="number"
            id="numHuesped"
            v-model="numHuesped"
            class="mt-1 p-2 w-full md:w-5/6 border rounded"
            min="1"
            max="6"
          />
        </div> -->
        <div class="mb-4 md:w-1/3">
          <label for="minPrice" class="block text-sm font-medium text-gray-700"
            >Precio Mínimo:</label
          >
          <input
            type="number"
            id="minPrice"
            v-model="minPrice"
            class="mt-1 p-2 w-full md:w-5/6 border rounded"
            min="2000"
            max="4000"
            step="100"
          />
        </div>
        <div class="mb-4 md:w-1/3">
          <label for="maxPrice" class="block text-sm font-medium text-gray-700"
            >Precio Máximo:</label
          >
          <input
            type="number"
            id="maxPrice"
            v-model="maxPrice"
            class="mt-1 p-2 w-full md:w-5/6 border rounded"
            min="2000"
            max="4000"
            step="100"
          />
        </div>
      </div>
      <button
        @click="applyFilters"
        class="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 w-full md:w-1/6 md:ml-5"
      >
        Buscar
      </button>
    </div>
  </div>

  <!-- Apartamentos mostrados según la paginación -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
    <div
      v-for="apartment in paginatedApartments"
      :key="apartment.id"
      class="col-span-1 mb-4 grid-container"
    >
      <ApartmentCard :data="apartment" />
    </div>
  </div>

  <!-- Paginación -->
  <div class="my-5 flex justify-center items-center">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 mr-2"
    >
      Anterior
    </button>
    <span class="mr-2">Página {{ currentPage }}</span>
    <button
      @click="nextPage"
      :disabled="currentPage >= totalPages"
      class="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 ml-2"
    >
      Siguiente
    </button>
  </div>
</template>

<script>
import ApartmentCard from "./ApartmentCard.vue";
import axios from "axios";

export default {
  components: {
    ApartmentCard,
  },
  data() {
    return {
      barrios: [],
      apartments: [],
      paginatedApartments: [],
      selectedBarrio: null,
      // numHuesped: null,
      minPrice: null,
      maxPrice: null,
      currentPage: 1,
      perPage: 9,
      totalPages: 0,
    };
  },
  mounted() {
    this.fetchBarrios();
    this.applyFilters();
  },
  watch: {
    minPrice: function (newMinPrice, oldMinPrice) {
      if (newMinPrice !== null) {
        if (newMinPrice < 2000) {
          this.minPrice = 2000
        } else if (newMinPrice > 4999) {
          this.minPrice = oldMinPrice; // Revertir al valor anterior
          alert("El precio mínimo no puede ser mayor que 4999.");
        } else if (this.maxPrice !== null && newMinPrice > this.maxPrice) {
          this.minPrice = oldMinPrice; // Revertir al valor anterior
          alert("El precio mínimo no puede ser mayor que el precio máximo.");
        }
      }
    },
    maxPrice: function (newMaxPrice) {
      if (newMaxPrice !== null) {
        if (newMaxPrice < 2000) {
          this.maxPrice = 2000;
        } else if (newMaxPrice > 5000) {
          alert("El precio máximo debe ser como máximo 5000.");
        } else if (this.minPrice !== null && newMaxPrice < this.minPrice) {
          this.maxPrice = this.minPrice+100; // Revertir al valor anterior
          alert("El precio máximo no puede ser menor que el precio mínimo.");
        }
      }
    },
  },
  methods: {
    async fetchBarrios() {
      try {
        const response = await axios.get(
          "https://api.dev.myplazze.com/api/v1/practice/barrios"
        );
        this.barrios = response.data;
      } catch (error) {
        console.error("Error fetching barrios:", error);
      }
    },
    async applyFilters() {
      console.log("applyFilters llamado"); // Para verificar que la función se está llamando

      let params = {};

      if (this.selectedBarrio !== null) {
        params.barrio_id = this.selectedBarrio;
      }
      // if (this.numHuesped !== null) {
      //   params.accommodates_max = this.numHuesped;
      // }
      if (this.minPrice !== null) {
        params.min_price = this.minPrice;
      }
      if (this.maxPrice !== null) {
        params.max_price = this.maxPrice;
      }
      // console.log("Número de Huéspedes:", this.numHuesped);


      console.log("Parámetros pasados al Filtro:", params); // Para verificar qué parámetros se están pasando

      if (Object.keys(params).length > 0) {
        try {
          const response = await axios.post(
            "https://api.dev.myplazze.com/api/v1/practice/search",
            params
          );
          console.log("La funcion applyFilters con filtro: ", response.data);
          this.apartments = response.data; // Asigna primero los apartamentos
          this.totalPages = Math.ceil(this.apartments.length / this.perPage);
          this.updatePaginatedApartments();
        } catch (error) {
          console.error(
            "Error al realizar la búsqueda de apartamentos:",
            error
          );
        }
      } else {
        try {
          const response = await axios.post(
            "https://api.dev.myplazze.com/api/v1/practice/search"
          );
          this.apartments = response.data; // Asigna primero los apartamentos
          this.totalPages = Math.ceil(this.apartments.length / this.perPage);
          this.updatePaginatedApartments();
        } catch (error) {
          console.error("Error al obtener los apartamentos:", error);
        }
      }
    },
    updatePaginatedApartments() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      this.paginatedApartments = this.apartments.slice(start, end);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedApartments();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedApartments();
      }
    },
  },
};
</script>

<style scoped>
/* Estilos si los necesitas */
</style>
