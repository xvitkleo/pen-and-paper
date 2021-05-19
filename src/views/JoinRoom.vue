<template>
  <div class='room__container'>
    <top-bar v-if="userProfile.name" tittle='Unirse a Sala'
    :name='userProfile.name' :lastname="userProfile.isGoogle ? '' : userProfile.lastname">
    </top-bar>

    <div class='room__body'>
      <h3>Únete a una sala!</h3>
      <form class='room__form' @submit.prevent>
        <custom-input placeholder='Nombre de la sala' v-model='searchField' />
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
import CustomInput from '../components/CustomInput.vue';
import RoomCard from '../components/RoomCard.vue';
import TopBar from '../components/TopBar.vue';

export default {
  name: 'JoinRoom',
  components: {
    CustomInput,
    TopBar,
    RoomCard,
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
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-height: 60vh;
    overflow-y: scroll;
    border-radius: var(--radiusBase);
    & > div {
      margin: 0 1em 1em 0;
    }
  }
}
</style>
