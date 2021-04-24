import { createApp } from 'vue';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';

import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';

import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import 'primevue/resources/themes/saga-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PokemonList },
    { path: '/pokemon/:id', name: 'pokemon', component: PokemonDetail },
  ],
});

app.component('InputText', InputText);
app.component('Button', Button);
app.use(router);
app.use(PrimeVue);

app.mount('#app');
