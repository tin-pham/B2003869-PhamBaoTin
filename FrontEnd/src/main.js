import router from './router';

import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';

const store = createStore({
  state() {
    return {
      check_token: '',
    };
  },
  mutations: {
    getToken(state, token) {
      state.token = token;
    },
  },
});
const token = localStorage.getItem('firsLogin');
router.beforeEach((to, from, next) => {
  store.commit('getToken', token);
  next();
});

createApp(App).use(store).use(router).mount('#app');
