<template>
  <div class='room__container'>
    <div class='room__body'>
      <h3 v-if="userProfile.roomId">
        Bienvenido a la sala: {{ getRoomById(userProfile.roomId).name }}
      </h3>
      <h3 v-else>No pertenece a ninguna sala</h3>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Room',
  components: {
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
    ...mapGetters(['getRoomById']),
  },
};
</script>

<style lang='scss' scoped>
.room__container {
  display: flex;
  flex-flow: column;
  background-color: var(--secondary-color);

  .room__body {
    margin: 4.5%;
    h3 {
      padding-bottom: 1.2em;
    }
  }
}
</style>
