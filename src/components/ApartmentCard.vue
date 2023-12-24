<template>
  <div
    class="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg flex flex-col h-full cursor-pointer"
    @click="showModal = true"
  >
    <div v-if="hasImages" class="mb-6 overflow-hidden rounded-lg">
      <div ref="slickContainer" class="slick-slider">
        <div v-for="image in imageData" :key="image" class="slick-slide">
          <img
            :src="image"
            alt="Imagen del apartamento"
            class="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>
      <div class="slick-dots"></div>
    </div>
    <div class="flex-grow">
      <h2 class="text-xl font-semibold mb-4">{{ data.apartment_title }}</h2>
      <p class="text-gray-600 mb-2">{{ data.address }}</p>
      <p class="text-gray-600 mb-2">{{ data.description }}</p>
      <p class="text-blue-500 font-semibold text-lg">
        {{ data.monthly_price }} €/mes
      </p>
    </div>
  </div>

  <!-- Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50 bg-transparent text-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-md w-1/2">
      <div v-if="hasImages" class="mb-6 overflow-hidden rounded-lg">
        <div ref="slickContainer" class="slick-slider">
          <div v-for="image in imageData" :key="image" class="slick-slide">
            <img
              :src="image"
              alt="Imagen del apartamento"
              class="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
        <div class="slick-dots"></div>
      </div>
      <div class="flex-grow">
        <h2 class="text-xl font-semibold mb-4">{{ data.apartment_title }}</h2>
        <p class="text-gray-600 mb-2">{{ data.address }}</p>
        <p class="text-gray-600 mb-2">{{ data.description }}</p>
        <p class="text-gray-600 mb-2">
          Acomodantes max: {{ data.accommodates_max }}
        </p>
        <p class="text-gray-600 mb-2">Barrio: {{ data.barrio.name }}</p>
        <p class="text-gray-600 mb-2">
          Metros cuadrados: {{ data.square_meter }}
        </p>
        <p class="text-gray-600 mb-2">
          Numero de habitaciones: {{ data.bedrooms }}
        </p>
        <p class="text-gray-600 mb-2">Numero de baños: {{ data.bathrooms }}</p>
        <!-- <p class="text-gray-600 mb-2">Servicios: {{ data.amenities }}</p> -->
        <p class="text-blue-500 font-semibold text-lg">
          {{ data.monthly_price }} €/mes
        </p>

        <!-- Botón para cerrar la modal -->
        <button
          @click="closeModal"
          class="mt-4 bg-teal-600 text-white py-2 px-4 rounded"
        >
          Cerrar
        </button>
        <div @click="closeModal" class="fixed inset-0"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
import "slick-carousel";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const hasImages = ref(
      Array.isArray(props.data.pic) && props.data.pic.length > 0
    );
    const slickContainer = ref(null);
    const imageData = ref(props.data.pic || []);
    const showModal = ref(false);

    const closeModal = () => {
      showModal.value = false;
    };

    onMounted(() => {
      if (hasImages.value && slickContainer.value) {
        $(slickContainer.value).slick({
          dots: true,
          autoplay: true,
          autoplaySpeed: 3000,
        });
      }
    });

    return {
      hasImages,
      slickContainer,
      imageData,
      showModal,
      closeModal,
    };
  },
};
</script>
