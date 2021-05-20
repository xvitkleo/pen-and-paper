<template>
  <div class='container'>
    <div class='rightView'>
      <div>
        <h1>Pen & Paper</h1>
        <h5>Unete a una sala, comparte documentos y envia mensajes a tu equipo de trabajo.</h5>
        <img src='../assets/landing.svg' alt='' />
      </div>
    </div>

    <div class='leftView'>
      <form @submit.prevent>
        <h2>Crear Cuenta.</h2>
        <div class="namesData">
          <custom-input placeholder="Nombre" v-model="signupForm.name"/>
          <custom-input placeholder="Apellido" v-model="signupForm.lastname"/>
        </div>

        <custom-input placeholder="Email" type="email" v-model="signupForm.email"/>
        <custom-input placeholder="Contraseña" type="password" v-model="signupForm.password"/>
        <custom-button v-on:click="signUp">Crear Cuenta.</custom-button>

        <div class="login">
          <h4>¿Tienes una cuenta?</h4>
          <router-link to='/login'>
            <h4 class="btn login">Iniciar Sesion</h4>
          </router-link>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import CustomButton from '../components/CustomButton.vue';
import CustomInput from '../components/CustomInput.vue';

export default {
  name: 'Login',

  components: {
    CustomButton,
    CustomInput,
  },
  data() {
    return {
      signupForm: {
        name: '',
        lastname: '',
        email: '',
        password: '',
      },
    };
  },

  methods: {
    signUp() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        lastname: this.signupForm.lastname,
        photoURL: '',
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  & > div {
    width: 50%;
    height: 100%;
  }
}

.rightView {
  background-color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    flex-flow: column;
    margin: auto;
    width: 60%;

    * {
      color: var(--secondary-color);
      margin-bottom: 1.3rem;
    }
  }
}

.leftView {
  background-color: var(--secondary-color);
  position: relative;

  * {
      text-align: center;
  }

  form {
    position: relative;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
    right: -100%;
    animation: move .5s ease-in-out;
    animation-fill-mode: forwards;
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 34%;

    & > div, .btn {
      margin-bottom: .9rem;
      width: 100%;
    }

    .namesData {
      display: flex;
      justify-content: space-between;
      .input {
        width: 48%;
      }
    }

    h2 {
      padding-bottom: 1.2em;
    }

    img {
      height: var(--lengthMd2);
    }

    .login {
      display: flex;
      justify-content: space-around;

      & > h4 {
        font-weight: var(--regular);
        color: var(--gray);
      }

      .btn.login {
        user-select: none;
      }
    }
  }
}

@keyframes move {
  from {
    right: -100%;
  }
  to {
    right: 0;
  }
}
</style>
