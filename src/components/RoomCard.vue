<template>
  <div class="roomCard__container">
    <div v-if="!selected">
      <div class="roomCard__button-enter" @click="handleSelect">
        <img src="../assets/enter.svg" alt="">
      </div>
      <div class="roomCard__name">
        <h2>{{room.name}}</h2>
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
              :src="room.members[index-1].photoURL || require('@/assets/profilePicture.png')" alt=""
            >
          </template>
          <div v-if="room.members.length > 2" class="roomCar__member roomCard__extraMembers">
            <div>
              <img :src="require('@/assets/profilePicture.png')" alt="">
              <h5>+{{ room.members.length-2 }}</h5>
            </div>
          </div>
        </div>
    </div>
    <div v-else class="join__form">
      <div class="roomCard__button-enter return" @click="handleSelect">
        <img src="../assets/enter.svg" alt="">
      </div>
      <custom-input placeholder='Contraseña' type='password'
        v-model='password' :borderReverse="true"
      />
      <custom-button v-on:click='joinRoom'>Unirse</custom-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CustomInput from './CustomInput.vue';
import CustomButton from './CustomButton.vue';

export default {
  name: 'RoomCard',

  components: {
    CustomInput,
    CustomButton,
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
    handleSelect() {
      this.selected = !this.selected;
    },

    joinRoom() {
      if (!this.userProfile.roomId) {
        if (this.room.password === this.password) {
          if (this.room.members.length < this.room.length) this.$store.dispatch('joinRoom', this.room.id);
          else alert('Sala llena');
        } else alert('Contraseña incorrecta');
      } else alert('Ya pertenece a una sala');
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
  background-color: var(--black-color);
  height: 11em;
  min-width: 19em;
  max-width: 19em;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  position: relative;

  .roomCard__button-enter.return {
    transform: scaleX(-1);
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
      height: 1.3em;
      width: 1.3em;
    }
  }
}

.roomCard__container > div {
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  margin: 2em 2em;
}

.roomCard__name {
  margin-bottom: 1.5em;
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
        opacity: .8;
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
    border: solid 3.5px var(--black-color);
  }
  .roomCar__member:first-child {
    left: 190px;
  }
  .roomCar__member:nth-child(2) {
    left: 170px;
  }
  .roomCar__member:nth-child(3) {
    left: 150px;
  }
}

.roomCard__content * {
  color: var(--light-gray);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.join__form {
  padding: 1.5em 0 1em 0;
  & > * {
    margin-bottom: .5em;
    width: 85%;
  }
}
</style>
