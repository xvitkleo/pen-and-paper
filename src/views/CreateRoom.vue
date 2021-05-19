<template>
  <div class='room__container'>
    <top-bar v-if="userProfile.name" tittle='Unirse a Sala'
    :name='userProfile.name' :lastname="userProfile.isGoogle ? '' : userProfile.lastname">
    </top-bar>

    <div class='room__body'>
      <h3>Crea tu propia sala!</h3>
      <form class='room__form' @submit.prevent>
        <custom-input placeholder='Nombre de la sala' v-model='name'/>
        <custom-input placeholder='Tema de la sala' v-model='theme' />
        <custom-input placeholder='Tamaño de la sala' type='number' v-model='length' />
        <custom-input placeholder='Contraseña' type='password' v-model='password' />
        <custom-button v-on:click='createRoom'>Crear Sala</custom-button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CustomInput from '../components/CustomInput.vue';
import CustomButton from '../components/CustomButton.vue';
import TopBar from '../components/TopBar.vue';

export default {
  name: 'CreateRoom',
  components: {
    CustomButton,
    CustomInput,
    TopBar,
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
      this.$store.dispatch('createRoom', {
        name: this.name,
        theme: this.theme,
        length: this.length,
        password: this.password,
      });
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
    width: 28%;
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
