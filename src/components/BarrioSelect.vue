<template>
  <select class="p-2 border rounded" v-if="barrios.length">
    <label for="Barrio" class="block text-sm font-medium text-gray-700"
      >Barrio:</label
    >
    <option v-for="barrio in barrios" :key="barrio.id" :value="barrio.id">
      {{ barrio.name }}
    </option>
  </select>
  <p v-else class="p-2 border rounded text-gray-500">Cargando barrios...</p>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      barrios: [],
    };
  },

  mounted() {
    this.fetchBarrios();
  },

  methods: {
    async fetchBarrios() {
      try {
        // Realiza la llamada al API para obtener el listado de barrios
        const response = await axios.get(
          "https://api.dev.myplazze.com/api/v1/practice/barrios",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        // Asigna los barrios obtenidos a la variable barrios
        this.barrios = response.data;
      } catch (error) {
        console.error("Error al obtener los barrios:", error);
      }
    },
  },
};
</script>
