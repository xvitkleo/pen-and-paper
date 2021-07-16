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
            <router-link
              to="/home/room/repository"
              class="nav__link"
              exact-active-class="nav__link--active"
              ><div class="nav__item">Recursos</div>
            </router-link>
          </div>
        </div>
        <div class="body__content">
          <router-view class="view"></router-view>
        </div>
      </div>
      <chat/>
    </div>
    <div v-else class="room__empty-state">
      <h3>No pertenece a ninguna sala</h3>
      <div></div>
    </div>

    <modal v-if="isModalOpen" :isOpen="isModalOpen" @close="isModalOpen = false">
      <template slot="title">Ajustes de sala</template>
      <validation-observer tag='div' v-slot="{ handleSubmit, invalid }">
        <form class='room__form' @submit.prevent='handleSubmit(editRoom)'>
          <custom-input label='Nombre de la sala'
            v-model='name'
            :borderReverse="true"
            rules='required'
          />
          <custom-input label='Tema de la sala'
            v-model='theme'
            :borderReverse="true"
            rules='required'
          />
          <custom-input label='Tamaño de la sala' class="room__length"
            type='number'
            v-model='length'
            :borderReverse="true"
            :rules="`required|positive|min_value:${room.members.length}`"
          />
          <div>
            <custom-button type="button" v-on:click='isModalOpen = false' :variant="'text2'">
              Cancelar
            </custom-button>
            <custom-button type="submit" :disabled="invalid">Editar sala</custom-button>
          </div>
        </form>
      </validation-observer>
    </modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { ValidationObserver } from 'vee-validate';
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
    ValidationObserver,
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
    ...mapMutations(['setAlert', 'setLoadingState']),
    async leaveRoom() {
      try {
        await this.$store.dispatch('leaveRoom');
        this.setAlert({
          state: 'success',
          message: 'Ha dejado la sala',
        });
      } catch (err) {
        this.setAlert({
          state: 'error',
          message: 'No ha podido dejar la sala, intentelo de nuevo',
        });
      }
    },

    async editRoom() {
      this.setLoadingState(true);
      try {
        await this.$store.dispatch('updateRooms', {
          ...this.room,
          id: this.room.id,
          name: this.name !== '' ? this.name : this.room.name,
          theme: this.theme !== '' ? this.theme : this.room.theme,
          length: this.length !== '' ? this.length : this.room.length,
        });
        this.setAlert({
          state: 'success',
          message: 'Sala actualizada',
        });
      } catch (err) {
        this.setAlert({
          state: 'error',
          message: 'No se ha podido editar la sala, intentelo de nuevo',
        });
        this.setLoadingState(false);
      }

      this.name = '';
      this.theme = '';
      this.length = '';
      this.setLoadingState(false);
      this.isModalOpen = false;
    },
  },

  mounted() {
    this.name = this.room.name;
    this.theme = this.room.name;
    this.length = this.room.length;
  },

  beforeUpdate() {
    this.name = this.room.name;
    this.theme = this.room.name;
    this.length = this.room.length;
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

  .room__empty-state {
    padding: 4.5%;
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
