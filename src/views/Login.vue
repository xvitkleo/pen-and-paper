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
      <form @submit="login">
        <h2>Iniciar Sesion.</h2>
        <custom-button type="button" :variant="'text'" v-on:click="loginWithGoogle">
          <div>
            <img src='../assets/googleLogo.svg' alt='' />
            <div>Continuar con Google</div>
          </div>
        </custom-button>
        <div><h4>o</h4></div>

        <custom-input placeholder="Email" type="email" v-model="loginForm.email"/>
        <custom-input placeholder="Password" type="password" v-model="loginForm.password"/>
        <custom-button type="submit" >Iniciar Sesión.</custom-button>

        <div class="createAccount">
          <h4>¿No tienes una cuenta?</h4>
          <router-link to='/createaccount'>
            <h4 class="btn createAccount">Crear Cuenta</h4>
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
      loginForm: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    loginWithGoogle() {
      this.$store.dispatch('loginWithGoogle');
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
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
  * {
    color: var(--secondary-color);
  }

  div {
    display: flex;
    flex-flow: column;
    margin: auto;
    width: 60%;

    * {
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
    width: 17em;

    & > div, .btn {
      margin-bottom: .9rem;
      width: 100%;
    }

    h2 {
      padding-bottom: 1.2em;
    }

    img {
      height: var(--lengthMd2);
    }

    .createAccount {
      display: flex;
      justify-content: space-around;

      & > h4 {
        font-weight: var(--regular);
        color: var(--gray);
      }

      .btn.createAccount {
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
