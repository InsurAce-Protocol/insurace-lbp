import Vue from 'vue';
import VueRouter from 'vue-router';
import telemetry from '@/util/Telemetry';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/lbp.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

telemetry.init();

router.beforeEach((to, from, next) => {
  telemetry.trackPageView({ name: to.fullPath });
  next();
});

export default router;
