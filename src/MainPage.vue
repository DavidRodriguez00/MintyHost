<template>
  <div class="bg-gray-100 min-h-screen">
    <NavbarResponsive />

    <div class="container mx-auto p-4">
      <ApartmentFilter />
    </div>
  </div>
  <FooterResponsive />
</template>

<script>
import NavbarResponsive from "./components/NavbarResponsive.vue";
import ApartmentFilter from "./components/ApartmentFilter.vue";
import FooterResponsive from "./components/FooterResponsive.vue";

export default {
  components: {
    NavbarResponsive,
    ApartmentFilter,
    FooterResponsive,
  },
};
</script>

<style scoped></style>
