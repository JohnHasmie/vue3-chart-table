import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import PrimeVue from "primevue/config";

//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
//core
import "primevue/resources/primevue.min.css";
//icons
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(router);

app.mount('#app')
