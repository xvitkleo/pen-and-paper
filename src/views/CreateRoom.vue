<template>
  <div class='room__container'>
    <div class="room__content">
      <div class='room__body'>
        <h3>Crea tu propia sala</h3>
        <form class='room__form' @submit.prevent>
          <custom-input label='Nombre de la sala' v-model='name'
            :borderReverse="true" :required="true"/>
          <custom-input label='Tema de la sala' v-model='theme'
            :borderReverse="true" :required="true"/>
          <custom-input label='Tamaño de la sala' type='number'
            v-model='length' class="room__length" :borderReverse="true" :required="true" :min="0"/>
          <custom-input label='Contraseña' type='password'
            v-model='password' :borderReverse="true" :required="true"/>
          <custom-button v-on:click='createRoom'>Crear sala</custom-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CustomInput from '../components/CustomInput.vue';
import CustomButton from '../components/CustomButton.vue';

export default {
  name: 'CreateRoom',
  components: {
    CustomButton,
    CustomInput,
  },

  data() {
    return {
      name: '',
      theme: '',
      password: '',
      length: '',
    };
  },

  methods: {
    createRoom() {
      if (!this.userProfile.roomId) {
        this.$store.dispatch('createRoom', {
          name: this.name,
          theme: this.theme,
          length: this.length,
          password: this.password,
        });
      } else alert('Ya pertenece a una sala');
    },
  },

  mounted() {
  },

  computed: {
    ...mapState(['userProfile']),
  },
};
</script>

<style lang='scss' scoped>
.room__container {
  display: flex;
  flex-flow: column;
  background-color: var(--secondary-color);

  .room__content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .room__body {
    margin: auto;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    border-radius: var(--radiusBase);
    padding: 2.5em 4.5em;
    min-height: 50%;
    width: 30em;
    text-align: center;
    background-color: var(--light-secondary-color);
    margin: 5%;
    h3 {
      padding-bottom: 1.2em;
    }
  }

  .room__form {
    width: 100%;
    & > * {
      width: 100%;
      margin-bottom: 1.2em;
      margin-left: 0;
    }

    & > div {
      display: flex;

      & > *:first-child {
        margin-right: 1.2em;
      }
    }
  }
}
</style>
