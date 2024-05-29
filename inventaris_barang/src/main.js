import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/aura-light-teal/theme.css";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

// component PrimeVue
app.component("InputText", InputText);
app.component("DialogVue", Dialog);
app.component("ButtonVue", Button);
app.mount("#app");
