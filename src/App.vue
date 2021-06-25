<template>
  <div id="app">
    <router-view/>
    <loading-screen v-if="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoadingScreen from './components/LoadingScreen.vue';

export default {
  components: { LoadingScreen },

  computed: {
    ...mapState(['loading']),
  },
};
</script>
