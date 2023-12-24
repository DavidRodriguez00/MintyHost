<template>
  <footer class="bg-teal-600 text-white py-4 text-center">
    <div class="container mx-auto px-4">
      <p>&copy; {{ currentYear }} David Rodríguez Marbán.</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>
