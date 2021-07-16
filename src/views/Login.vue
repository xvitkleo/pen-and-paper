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
      <ValidationObserver
        ref="form"
        v-slot="{ handleSubmit }"
      >
        <form @submit.prevent='handleSubmit(login)'>
          <h2>Iniciar Sesion.</h2>
          <custom-button type='button' variant='text' v-on:click='loginWithGoogle'>
            <div>
              <img src='../assets/googleLogo.svg' alt='' />
              <div>Continuar con Google</div>
            </div>
          </custom-button>
          <div><h4>o</h4></div>

          <custom-input vid="email" placeholder='Email' type='email'
            v-model='loginForm.email' rules="required"/>
          <custom-input vid="password" placeholder='Password' type='password'
            v-model='loginForm.password' rules="required"/>
          <custom-button type='submit' >Iniciar Sesión.</custom-button>
          <div class='createAccount'>
            <h4>¿No tienes una cuenta?</h4>
            <router-link to='/createaccount'>
              <h4 class='btn createAccount'>Crear Cuenta</h4>
            </router-link>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { ValidationObserver } from 'vee-validate';
import CustomButton from '../components/CustomButton.vue';
import CustomInput from '../components/CustomInput.vue';

export default {
  name: 'Login',

  components: {
    CustomButton,
    CustomInput,
    ValidationObserver,
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
    ...mapMutations(['setAlert']),
    loginWithGoogle() {
      this.$store.dispatch('loginWithGoogle');
    },
    async login() {
      try {
        await this.$store.dispatch('login', {
          email: this.loginForm.email,
          password: this.loginForm.password,
        });
        this.setAlert({
          state: 'success',
          message: 'Ha iniciado sesion',
        });
      } catch (e) {
        this.setErrorMessage(e);
      }
    },

    setErrorMessage(error) {
      switch (error.code) {
        case 'auth/wrong-password':
          this.$refs.form.setErrors({
            password: ['La contraseña ingresada es incorrecta.'],
          });
          break;
        case 'auth/user-not-found':
          this.$refs.form.setErrors({
            email: ['El usuario ingresado no fue encontrado.'],
          });
          break;
        default:
          this.$refs.form.setErrors({
            password: ['Ocurrio un error, por favor inténtalo de nuevo.'],
          });
          break;
      }
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
