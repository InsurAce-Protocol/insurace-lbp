import Vue from 'vue';
import ViewUI from 'view-design';
import App from './App.vue';
import i18n from './lang/i18n';
import router from './router';
import store from './store';

import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.use(ViewUI);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
