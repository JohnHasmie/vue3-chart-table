import { createRouter, createWebHistory } from 'vue-router';
import DauChart from '../components/DauChart.vue';
import DauTable from '../components/DauTable.vue';

const routes = [
  { path: '/chart', component: DauChart },
  { path: '/table', component: DauTable },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
