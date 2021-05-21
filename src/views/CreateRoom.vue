<template>
  <div class='room__container'>
    <div class='room__body'>
      <h3>Crea tu propia sala</h3>
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

  .room__body {
    margin: 5%;
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
