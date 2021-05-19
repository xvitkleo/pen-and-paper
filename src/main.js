import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from './firebase';

import './styles.scss';

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }

  if (user) {
    console.log('app');
    console.log(user);
    console.log('app');
    if (user.providerData[0].providerId === 'google.com') store.dispatch('fetchGoogleProfile', user);
    else store.dispatch('fetchUserProfile', user);
    store.dispatch('fetchRooms');
  }
});
