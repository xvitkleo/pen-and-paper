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
        <form @submit.prevent="handleSubmit(signUp)">
          <h2>Crear Cuenta.</h2>
          <div class="namesData">
            <custom-input placeholder="Nombre" v-model="signupForm.name" rules="required"/>
            <custom-input placeholder="Apellido" v-model="signupForm.lastname" rules="required"/>
          </div>

          <custom-input :vid="'email'" placeholder="Email"
            type="email" v-model="signupForm.email" rules="required"
          />
          <custom-input :vid="'password'" placeholder="Contraseña" type="password"
            v-model="signupForm.password" rules="required"/>
          <custom-button type="submit">Crear Cuenta.</custom-button>

          <div class="login">
            <h4>¿Tienes una cuenta?</h4>
            <router-link to='/login'>
              <h4 class="btn login">Iniciar Sesion</h4>
            </router-link>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import { mapMutations } from 'vuex';
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
      signupForm: {
        name: '',
        lastname: '',
        email: '',
        password: '',
      },
    };
  },

  methods: {
    ...mapMutations(['setAlert']),
    async signUp() {
      try {
        await this.$store.dispatch('signup', {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name,
          lastname: this.signupForm.lastname,
          photoURL: '',
        });
        this.setAlert({
          state: 'success',
          message: 'Ha creado su cuenta',
        });
      } catch (e) {
        this.setErrorMessage(e);
      }
    },

    setErrorMessage(error) {
      switch (error.code) {
        case 'auth/weak-password':
          this.$refs.form.setErrors({
            password: ['La contraseña debe tener al menos 6 caracteres.'],
          });
          break;
        case 'auth/invalid-email':
          this.$refs.form.setErrors({
            email: ['El correo ingresado es invalido.'],
          });
          break;
        case 'auth/email-already-in-use':
          this.$refs.form.setErrors({
            email: ['El correo ya ha sido utilizado.'],
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
