<template>
  <div class='room__container'>
    <top-bar v-if="userProfile.name" tittle='Sala'
    :name='userProfile.name' :lastname="userProfile.isGoogle ? '' : userProfile.lastname">
    </top-bar>

    <div class='room__body'>
      <h3>Bienvenido a la sala!</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TopBar from '../components/TopBar.vue';

export default {
  name: 'Room',
  components: {
    TopBar,
  },

  data() {
    return {
      searchField: '',
    };
  },

  methods: {
  },

  mounted() {
  },

  computed: {
    ...mapState(['userProfile', 'rooms']),
  },
};
</script>

<style lang='scss' scoped>
.room__container {
  display: flex;
  flex-flow: column;
  height: 100vh;
  flex-grow: 1;
  background-color: var(--secondary-color);
  * {
    color: white;
  }

  .room__body {
    margin: 4.5%;
    h3 {
      padding-bottom: 1.2em;
    }
  }
}
</style>
