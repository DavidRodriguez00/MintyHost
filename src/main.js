import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import "tailwindcss/tailwind.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Componente principal
import App from "./MainPage.vue";

// Componentes secundarios
import NavbarResponsive from "./components/NavbarResponsive.vue";
import ApartmentFilter from "./components/ApartmentFilter.vue";

// Rutas
const routes = [
  { path: "/", component: App },
  // ... más rutas aquí
];

// Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Crea la instancia de la aplicación
const app = createApp(App);

// Agrega Axios como una propiedad global de Vue
app.config.globalProperties.$http = axios;

// Enrutador que registra los componentes globales
app.use(router);
app.component("NavbarResponsive", NavbarResponsive);
app.component("ApartmentFilter", ApartmentFilter);

// Monta la aplicación en el elemento con ID 'app' en el HTML
app.mount("#app");
