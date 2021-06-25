<template>
  <div class='shareScreen__container'>
    <div class='shareScreen__tittle'>
      <div><h4>Pantalla Compartida</h4></div>
    </div>
    <div class='shareScreen__body'>
      <div class="shareScreen__screen">
        <div v-if="room.sharingId === userProfile.id" ref="screen__container"
          class="screen__container"></div>
        <div v-else-if="sharingScreen" ref="screen__container" class="screen__container">
          <img v-if="!watching" class="emptyState__img"
            src="@/assets/joinScreenEmptyState.svg" alt="">
        </div>
        <div v-else class="screen__emptyState">
          <img class="emptyState__img" src="@/assets/screenEmptyState.svg" alt="">
          {{ watching = false }}
        </div>
      </div>
      <div class="shareScreen__tools">
        <custom-button v-if="room.sharingId === userProfile.id"
          @click='stopSharing' :variant="'danger'">Stop</custom-button>
        <custom-button v-else-if="sharingScreen" @click='seeSharingScreen'>Join</custom-button>
        <custom-button v-else @click='shareScreen'>Share</custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CustomButton from '../components/CustomButton.vue';

export default {
  name: 'ShareScreen',
  components: {
    CustomButton,
  },

  data() {
    return {
      searchField: '',
      isMenuOpen: false,
      name: '',
      theme: '',
      length: '',
      connection: null,
      watching: false,
    };
  },

  methods: {
    connectionInit() {
      this.connection = new window.RTCMultiConnection();
      this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'; // reemplazar https://github.com/muaz-khan/RTCMultiConnection/blob/master/docs/api.md
      this.connection.session = {
        screen: true,
        oneway: true,
      };
      this.connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
      };
      this.connection.onstream = (event) => {
        console.log(this.$refs);
        this.$refs.screen__container.appendChild(event.mediaElement);
        this.$refs.screen__container.children[0].style.height = '100%';
      };
    },
    async shareScreen() {
      await this.$store.dispatch('fetchRooms');
      if (!this.sharingScreen) {
        this.$store.dispatch('shareScreen');
        this.connectionInit();
        console.log(this.room.id);
        this.connection.open(this.room.id);
      }
    },
    async seeSharingScreen() {
      if (!this.watching) {
        this.watching = true;
        this.connectionInit();
        this.connection.sdpConstraints.mandatory = {
          OfferToReceiveAudio: false,
          OfferToReceiveVideo: true,
        };
        this.connection.join(this.room.id);
      } else alert('ya estas viendo');
    },
    stopSharing() {
      this.$store.dispatch('stopSharing');
      this.connection.getAllParticipants().forEach((pid) => {
        this.connection.disconnectWith(pid);
      });
      this.connection.attachStreams.forEach((localStream) => {
        localStream.stop();
      });
      this.connection.closeSocket();
    },
  },

  mounted() {
    const recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js');
    document.head.appendChild(recaptchaScript);
    const recaptchaScript2 = document.createElement('script');
    recaptchaScript2.setAttribute('src', 'https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js');
    document.head.appendChild(recaptchaScript2);
  },

  destroyed() {
    if (this.room.sharingId === this.userProfile.id) this.stopSharing();
  },

  computed: {
    ...mapState(['userProfile', 'rooms', 'room', 'files', 'sharingScreen']),
  },
};
</script>

<style lang='scss' scoped>
.shareScreen__container {
  display: flex;
  flex-flow: column;
  height: 100%;
  .shareScreen__tittle {
    border-bottom: 1px solid #514b6531;
    margin: 1em 0;
    padding: calc(.5em + 0.4375rem) 0;
  }
  .shareScreen__body {
    height: calc(100% - 0.875rem - .5em - 0.4375rem - 1em);
    display: flex;
    flex-flow: column;
    .shareScreen__screen {
      overflow: hidden;
      height: calc(100% - 5em);
      background-color: var(--light-secondary-color);
      border-radius: var(--radiusBase);
      .screen__container {
        height: 100%;
        display: flex;
        justify-content: center;
      }
      .screen__emptyState {
        height: 100%;
        display: flex;
      }

      .screen__container {
        .emptyState__img {
          height: 18em;
        }
      }
      .emptyState__img {
        margin: auto;
        height: 12em;
        opacity: .5;
      }
    }
    .shareScreen__tools {
      height: 5em;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
  }
}
</style>
