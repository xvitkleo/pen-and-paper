<template>
  <div class='room__container'>
    <div v-if="userProfile.roomId" class='room__content'>
      <div class="room__body">
        <div class="room__menu">
          <div class="room__tittle">
            <h3> Bienvenido a la sala: {{ room.name }} </h3>
            <img v-if="!isMenuOpen" @click="isMenuOpen = !isMenuOpen" class="menu__arrow"
              src="@/assets/downArrow.svg" alt="">
            <img v-if="isMenuOpen" @click="isMenuOpen = !isMenuOpen" class="menu__close"
              src="@/assets/close.svg" alt="">
              <div v-if="isMenuOpen" class="menu__box">
                <div v-if="room.hostId === userProfile.id">
                  <custom-button v-on:click='isModalOpen = true; isMenuOpen = false'
                    :variant="'text2'">
                    Ajustes de sala
                  </custom-button>
                </div>
                <div>
                  <custom-button v-on:click='leaveRoom' :variant="'text2-danger'">
                    Dejar sala
                  </custom-button>
                </div>
              </div>
          </div>
          <div class="room__nav">
            <router-link
              to="/home/room/share"
              class="nav__link"
              exact-active-class="nav__link--active"
              ><div class="sidebar__item">Pantalla</div>
            </router-link>
            <router-link
              to="/home/room/files"
              class="nav__link"
              exact-active-class="nav__link--active"
              ><div class="nav__item">Archivos</div>
            </router-link>
          </div>
        </div>
        <div class="body__content">
          <router-view class="view"></router-view>
        </div>
      </div>
      <chat/>
    </div>
    <h3 v-else>No pertenece a ninguna sala</h3>

    <modal v-if="isModalOpen" :isOpen="isModalOpen" @close="isModalOpen = false">
      <template slot="title">Ajustes de sala</template>
      <form class='room__form' @submit.prevent>
        <custom-input label='Nombre de la sala' v-model='name'
          :borderReverse="true" :required="true" :initialValue="room.name"/>
        <custom-input label='Tema de la sala' v-model='theme'
          :borderReverse="true" :required="true" :initialValue="room.theme"/>
        <custom-input label='Tamaño de la sala' type='number'
          v-model='length' class="room__length" :borderReverse="true" :required="true"
          :min="parseInt(room.members.length, 10)" :initialValue="room.length"/>
        <div>
          <custom-button v-on:click='isModalOpen = false' :variant="'text2'">
            Cancelar
          </custom-button>
          <custom-button v-on:click='editRoom'>Editar sala</custom-button>
        </div>
      </form>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import chat from '../components/Chat.vue';
import CustomButton from '../components/CustomButton.vue';
import CustomInput from '../components/CustomInput.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'Room',
  components: {
    chat,
    CustomButton,
    Modal,
    CustomInput,
  },

  data() {
    return {
      searchField: '',
      isMenuOpen: false,
      isModalOpen: false,
      name: '',
      theme: '',
      length: '',

    };
  },

  methods: {
    handleFileChange(e) {
      const index = 0;
      this.selectedFile = e.target.files[index];
      this.$store.dispatch('uploadFile', this.selectedFile);
    },

    leaveRoom() {
      this.$store.dispatch('leaveRoom');
    },

    editRoom() {
      this.$store.dispatch('updateRooms', {
        ...this.room,
        id: this.room.id,
        name: this.name !== '' ? this.name : this.room.name,
        theme: this.theme !== '' ? this.theme : this.room.theme,
        length: this.length !== '' ? this.length : this.room.length,
      });
      this.name = '';
      this.theme = '';
      this.length = '';
      this.isModalOpen = false;
    },
  },

  mounted() {
  },

  computed: {
    ...mapState(['userProfile', 'rooms', 'room', 'files']),
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
    display: flex;
    .room__body {
      padding: 4.5%;
      height: 100%;
      width: 76%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;

      .body__content {
        height: calc(100% - 1.5rem);
        display: flex;
        flex-flow: column;
      }
    }
  }

  .room__menu {
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 2;
    height: fit-content;
  }

  .room__tittle {
    display: flex;
    align-items: center;
    margin-right: 10%;
    position: relative;
    .menu__arrow, .menu__close {
      cursor: pointer;
      height: .8em;
      margin-left: 1em;
      user-select: none;
    }
  }

  .room__nav {
    display: flex;
    background-color: var(--light-gray);
    border: solid 3px var(--light-gray);
    border-radius: var(--radiusSm);
    a {
      border-radius: var(--radiusSm);
      padding: .5em .7em;
      font-weight: var(--bold);
      font-size: var(--lengthSm3);
    }
  }
  .nav__link {
    text-decoration: none;
    * {
      color: var(--secondary-color);
    }
  }

  .nav__link--active {
    background-color: var(--secondary-color);
    * {
      fill: var(--primary-color);
      color: var(--white-color);
    }
  }

  .nav__item {
    display: flex;
    align-items: center;
    &:hover * {
      transition: all 0.2s ease-out;
      color: var(--white-color);
    }
  }

  .menu__box {
    background-color: var(--light-secondary-color);
    border: solid 2px var(--secondary-color);
    border-radius: var(--radiusSm);
    position: absolute;
    right: 0;
    top: calc(100% + 1em);
    width: 100%;
    & > div {
      padding: var(--lengthSm2);
    }
    & > div:not(:last-child) {
      border-bottom: solid 1px var(--secondary-color);
    }
    button {
      width: 100%;
    }
  }

  .room__form {
    margin: auto;
    & > * {
      width: 100%;
      margin-bottom: 1.2em;
      margin-left: 0;
    }

    & > div:last-child {
      margin-bottom: 0;
      margin-top: var(--lengthLg1);
    }

    & > div {
      display: flex;
      justify-content: flex-end;

      & > *:first-child {
        margin-right: 1.2em;
      }
    }
  }
}
</style>
