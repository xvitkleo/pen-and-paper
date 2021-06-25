<template>
  <div class='room__container'>
    <div class='room__body'>
      <h3>Únete a una sala</h3>
      <form class='room__form' @submit.prevent>
        <search-input v-model='searchField'/>
      </form>
      <div class="roomCards__container">
        <room-card
          v-for="room in rooms.filter(room =>
          room.name.toLowerCase().includes(searchField.toLowerCase()))"
          :room="room" :key="room.id"/>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SearchInput from '../components/SearchInput.vue';
import RoomCard from '../components/RoomCard.vue';

export default {
  name: 'JoinRoom',
  components: {
    RoomCard,
    SearchInput,
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
  background-color: var(--secondary-color);

  .room__body {
    margin: 4.5%;
    h3 {
      padding-bottom: 1.2em;
    }
  }

  .room__form {
    display: flex;
    width: 40%;
    & > * {
      margin-bottom: 1.5em;
    }

    & > div {
      display: flex;
      &:first-child {
        margin-right: 1.2em;
      }
    }
  }

  .roomCards__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 17em);
    gap: 1em;
    width: 100%;
    max-height: 60vh;
    overflow-y: scroll;
    border-radius: var(--radiusBase);
  }
}
</style>
