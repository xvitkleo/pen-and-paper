<template>
  <div class="roomCard__container">
    <div v-if="!selected" class="room__info">
      <div class="roomCard__button-enter" @click="handleSelect">
        <img src="../assets/enter.svg" alt="">
      </div>
      <div class="roomCard__name">
        <h3>{{room.name}}</h3>
      </div>
      <div class="roomCard__content">
        <div class="roomCard__data">
          <h4>{{room.theme}}</h4>
          <h4>{{room.hostName}}</h4>
        </div>
      </div>
      <div class="roomCard__members">
          <template v-for="index in (room.members.length ? (room.members.length > 1 ? 2 : 1) : 0)">
            <img :key="index" class="roomCar__member"
              :src="room.members[index-1].photoURL || require('@/assets/profilePicture.svg')" alt=""
            >
          </template>
          <div v-if="room.members.length > 2" class="roomCar__member roomCard__extraMembers">
            <div>
              <img :src="require('@/assets/profilePicture.svg')" alt="">
              <h5>+{{ room.members.length-2 }}</h5>
            </div>
          </div>
        </div>
    </div>
    <ValidationObserver ref='form' v-else tag='div' v-slot="{ handleSubmit, invalid }">
      <form class="join__form" @submit.prevent="handleSubmit(joinRoom)">
        <div class="roomCard__button-enter return" @click="handleSelect">
          <img src="../assets/enter.svg" alt="">
        </div>
        <custom-input id="password" placeholder='Contraseña' type='password'
          v-model='password' :borderReverse="true"
          :rules="`required|correct_password:${room.password}`"
        />
        <custom-button type="submit" :disabled="invalid">Unirse</custom-button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { ValidationObserver } from 'vee-validate';
import CustomInput from './CustomInput.vue';
import CustomButton from './CustomButton.vue';

export default {
  name: 'RoomCard',

  components: {
    CustomInput,
    CustomButton,
    ValidationObserver,
  },

  data() {
    return {
      selected: false,
      password: '',
    };
  },

  props: {
    room: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapMutations(['setAlert']),
    handleSelect() {
      this.selected = !this.selected;
    },

    async joinRoom() {
      if (!this.userProfile.roomId) {
        if (this.room.password === this.password) {
          if (this.room.members.length < this.room.length) {
            try {
              await this.$store.dispatch('joinRoom', this.room.id);
              this.setAlert({
                state: 'success',
                message: 'Se ha unido a una sala',
              });
            } catch (err) {
              this.setAlert({
                state: 'error',
                message: 'No se ha podido unir a la sala, intentelo de nuevo',
              });
            }
          } else {
            this.setAlert({
              state: 'error',
              message: 'La sala esta llena',
            });
          }
        } else {
          this.setAlert({
            state: 'error',
            message: 'Contraseña incorrecta',
          });
        }
      } else {
        this.setAlert({
          state: 'error',
          message: 'Ya pertenece a una sala',
        });
      }
    },
  },

  computed: {
    ...mapState(['userProfile', 'rooms']),
  },
};
</script>

<style lang='scss' scoped>
.roomCard__container {
  border-radius: var(--radiusSm);
  background-color: var(--light-secondary-color);
  height: 9.1em;
  min-width: 17em;
  max-width: 17em;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  position: relative;
  .roomCard__button-enter.return {
    transform: scaleX(-1);
  }

  &:hover {
    background-color: #242433;
    h2 {
      color: white;
    }
  }

  .roomCard__button-enter {
    border-radius: 100%;
    height: 1.2em;
    width: 1.2em;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 2.1em;
    right: 1.4em;

    img {
      height: 1.2em;
      width: 1.2em;
    }
  }
}

.roomCard__container > div {
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

.room__info {
  margin: 1.8em;
}

.roomCard__name {
  margin-bottom: 1em;
  display: flex;
  max-width: 90%;
  * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.roomCard__data {
  margin-right: 1em;
  width: 6em;
  * {
    margin-bottom: .2em;
  }
}

.roomCard__content {
  display: flex;
}

.roomCard__members {
  display: flex;
  position: relative;
  .roomCard__extraMembers {
    div {
      height: 100%;
      width: 100%;
      position: relative;
      img {
        height: 100%;
        width: 100%;
        filter: brightness(0.4);
        border-radius: 50%;
      }
      h5 {
        top: 50%;
        left: 21%;
        transform: translateY(-50%);
        position: absolute;
      }
    }
  }
  .roomCar__member, .roomCard__extraMembers {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    bottom: -5px;
    position: absolute;
    border: solid 3.5px var(--light-secondary-color);
  }
  .roomCar__member:first-child {
    left: 160px;
  }
  .roomCar__member:nth-child(2) {
    left: 140px;
  }
  .roomCar__member:nth-child(3) {
    left: 120px;
  }
}

.roomCard__content * {
  color: var(--gray);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.join__form {
  height: 100%;
  display: flex;
  flex-flow: column;
  margin: .8em 1.2em;
  justify-content: space-around;
  & > *:not(first-child) {
    width: 85%;
    margin-bottom: .5em;
  }
}
</style>
