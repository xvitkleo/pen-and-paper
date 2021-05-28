<template>
  <div class='account__container'>
    <div class="account__content">
      <div class='account__body'>
        <h3>Mi Cuenta</h3>
        <div class="account__profilePicture__container">
          <div class="account__profilePicture">
            <img :src="photoURL || userProfile.photoURL ||
              require('@/assets/profilePicture.png')" alt="">
            <label for="upload-photo">
              <img v-if="!userProfile.isGoogle" class="editProfilePicture__btn"
                src="../assets/edit.svg" alt="">
            </label>
            <input class="hidden" type="file" name="photo" id="upload-photo"
            @change="handleFileChange"/>
          </div>
        </div>
        <form :class="userProfile.isGoogle ? 'account__form' : 'account__form mail'"
        @submit.prevent>
          <custom-input
            id="email"
            label="Email"
            placeholder='Email'
            :value='userProfile.email'
            type='email'
            :border="false"
            :disabled='true'
          />
          <div class="mailAccount" v-if="!userProfile.isGoogle && userProfile.name">
            <custom-input id="name" label="Nombre" :border="false"
              placeholder='Nombre' v-model='name' :value="name" :initialValue="userProfile.name"/>
            <custom-input id="lastname" label="Apellido" :border="false"
              placeholder='Apellido' v-model='lastname' :value="lastname"
              :initialValue="userProfile.lastname"/>
          </div>

          <div v-else class="googleAccount">
            <custom-input class="googleAccount" :value="userProfile.name"
              :disabled='true' id="name" label="Nombre" :border="false"/>
            <custom-input class="googleAccount" :value="userProfile.lastname"
              :disabled='true' id="lastname" label="Apellido" :border="false"/>
          </div>
          <custom-button class="save__btn" v-if="!userProfile.isGoogle"
          v-on:click='updateProfile'>Guardar Cambios</custom-button>
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
  name: 'MyAccount',
  components: {
    CustomButton,
    CustomInput,
  },

  data() {
    return {
      name: '',
      lastname: '',
      photoURL: '',
    };
  },

  methods: {
    handleFileChange(e) {
      const index = 0;
      this.selectedFile = e.target.files[index];
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        this.photoURL = event.target.result;
      };
    },

    updateProfile() {
      this.$store.dispatch('updateProfile', {
        id: this.userProfile.id,
        name: this.name !== '' ? this.name : this.userProfile.name,
        lastname: this.lastname !== '' ? this.lastname : this.userProfile.lastname,
        photoURL: this.photoURL !== '' ? this.photoURL : this.userProfile.photoURL,
        roomId: this.userProfile.roomId,
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
.account__container {
  display: flex;
  flex-flow: column;
  background-color: var(--secondary-color);

  .account__content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .account__body {
    margin: auto;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    border-radius: var(--radiusBase);
    padding: 2.5em 3.5em;
    min-height: 50%;
    width: 25em;
    text-align: center;
    background-color: var(--gray-light);
  }

  .account__img {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }
  .account__form {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-content: center;
    & > * {
      width: 100%;
      margin-bottom: 2em;
      margin-left: 0;
    }
    .mailAccount {
      margin-bottom: 0;
      div {
        width: 100%;
        margin-bottom: 2em;
      }
    }

    .googleAccount {
      margin-bottom: 0;
      div {
        width: 100%;
        margin-bottom: 1em;
      }
      div:first-child {
        margin-bottom: 2em;
      }
    }

    .save__btn {
      margin: auto;
      width: 14em;
    }
  }

  .account__profilePicture__container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .account__profilePicture {
    height: 100px;
    width: 100px;
    margin: 1.5em;
    border-radius: 100%;
    position: relative;
    img {
      height: 100%;
      width: 100%;
      border-radius: 100%;
    }

    .editProfilePicture__btn {
      height: 1.7em;
      width: 1.7em;
      bottom: 1px;
      right: 0;
      position: absolute;
    }
  }
}
</style>
