<template>
  <div class='chat__container'>
    <div class="chat__nav">
      <h4 :class="{ active: tab==='chat' }" v-on:click="tab='chat'" >Chat</h4>
      <h4 :class="{ active: tab==='members' }" v-on:click="tab='members'" >Miembros</h4>
    </div>
    <div v-if="tab==='chat'" class="chat__box">
      <div v-if="messages.length" class="chat__messages" ref="chat">
        <template v-for="message in messages">
          <div v-if="message.authorId !== userProfile.id"  :key="message.id" class="chat__message">
            <div class="chat__username">
              <p>
                {{ message.createdOn.seconds ?
                  (new Date(message.createdOn.seconds * 1000)).toLocaleTimeString() :
                  message.createdOn.toLocaleTimeString() }}
                &#92;{{ message.authorName + '>' }}
              </p>
            </div>
            <div v-if="message.type==='text'" class="chat__text">
              <p>{{message.content }}</p>
            </div>
            <div v-else class="chat__image">
              <img :src="message.content" alt="">
            </div>
          </div>

          <div v-else :key="message.id" class="chat__message sender">
            <div class="chat__username">
              <p>
                &lt;{{ message.authorName }}&#92;
                {{ message.createdOn.seconds ?
                  (new Date(message.createdOn.seconds * 1000)).toLocaleTimeString() :
                  message.createdOn.toLocaleTimeString() }}
              </p>
            </div>
            <div v-if="message.type==='text'" class="chat__text">
              <p> {{message.content }}</p>
            </div>
            <div v-else class="chat__image">
              <img :src="message.content" alt="">
            </div>
          </div>
        </template>
      </div>

      <div v-else class="chat__emptyState">
        <img src="@/assets/chatEmptyState.svg" alt="">
      </div>

      <form class="chat__input-box" @submit="(e) => { e.preventDefault(); sendMessage();}">
        <div class="chat__inputs">
          <div class="chat__upload-img">
            <label for="upload-img">
              <img class="selectPicture__btn" src="../assets/sendPicture.svg" alt="">
            </label>
            <input class="hidden" type="file" name="photo" id="upload-img"
            @change="handleFileChange"/>
          </div>
          <input class="chat__input" type="text"
            placeholder="Escribe un mensaje >" v-model="message">
        </div>
        <img src="@/assets/chatEnter.svg" alt="" v-on:click="sendMessage">
      </form>
    </div>

    <div v-else class="members__box">
      <p>MIEMBROS</p>
      <template v-for="member in room.members">
        <div v-if="member.id != room.hostId" :key="member.id" class="member__card">
          <div>
            <img :src="member.photoURL ||  require('@/assets/profilePicture.svg')" alt="">
          </div>
          <p>{{ member.memberName }}</p>
        </div>
      </template>

      <div class="line"></div>

      <p>ADMIN</p>
      <div class="member__card">
        <div>
          <img :src="(room.members.filter(member => member.id === room.hostId)[0].photoURL)
            || require('@/assets/profilePicture.svg')" alt="profilePicture">
        </div>
        <p>{{ room.hostName }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Chat',
  components: {
  },

  props: {
  },

  data() {
    return {
      message: '',
      tab: 'chat',
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
        if (event.target.result) this.$store.dispatch('sendMessage', { messageContent: event.target.result, messageType: 'image' });
        this.$refs.chat.scrollTop = 0;
      };
    },
    sendMessage() {
      console.log('enviando mensaje...');
      if (this.message !== '') this.$store.dispatch('sendMessage', { messageContent: this.message, messageType: 'text' });
      this.message = '';
      this.$refs.chat.scrollTop = 0;
    },
  },

  mounted() {
  },

  computed: {
    ...mapState(['userProfile', 'rooms', 'messages', 'room']),
    ...mapGetters(['getRoomById']),
  },
};
</script>

<style lang='scss' scoped>
p {
    font-family: monospace;
    font-size: 12px;
}
.chat__container {
  height: calc(100%);
  width: 24%;
  border: solid 1px var(--light-secondary-color);
  border-top: none;
  position: relative;

  .chat__nav {
    margin-top: 1em;
    margin-bottom: 1em;
    height: 3em;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    h4 {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3em;
      width: 100%;
      color: var(--light-gray);
      border-bottom: solid 1px transparent;
    }
    h4:not(.active):hover {
      color: var(--white);
    }
    .active {
      color: var(--primary-color);
      border-bottom: solid 1px var(--primary-color);
    }
  }

  .chat__box {
    height: 100%;
    .chat__input-box {
      height: 4em;
      padding: 0 3.5em 0 2em;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      .chat__inputs {
        display: flex;
        align-items: center;
        .chat__upload-img label{
          display: flex;
          align-items: center;
        }
      }
      .chat__input {
        padding-left: 1em;
        background-color: transparent;
        border: none;
        outline: none;
        &::placeholder {
          color: var(--light-gray);
        }
      }
      img:not(.selectPicture__btn){
        cursor: pointer;
        height: 17px;
        width: 17px;
        margin-top: 6px;
      }

      .selectPicture__btn {
        height: 1.3em;
        width: 1.3em;
        cursor: pointer;
      }
    }

    .chat__emptyState {
      height: calc(100% - 9em);
      display: flex;
      img {
        margin: auto;
        height: 15em;
        opacity: .5;
      }
    }

    .chat__messages {
      height: calc(100% - 9em);
      overflow-y: scroll;
      display: flex;
      flex-flow: column;
      flex-direction: column-reverse;
    }

    .chat__message {
      padding: 1em;
      display: flex;
      flex-flow: column;
      width: 80%;
      .chat__image {
        max-width: 100%;
        overflow: hidden;
        img {
          height: 200px;
        }
      }
      .chat__text {
        display: flex;
        width: fit-content;
        padding: .5em;
        background-color: var(--light-secondary-color);
        p {
          color: var(--gray);
        }
      }
    }

    .chat__message.sender {
      align-items: flex-end;
      margin-left: 15%;
      .chat__text p {
        color: var(--white-color);
      }
    }
    .chat__username p{
      color: var(--primary-color);
      margin-bottom: .5em;
    }
  }

  .members__box {
    height: calc(100% - 3em);
    width: 100%;
    padding: 2em;

    & > p {
      margin-bottom: 1.3em;
      color: var(--light-gray);
    }

    .line {
      height: 3px;
      margin: 2em 0;
      width: 100%;
      background-color: var(--light-secondary-color);
    }

    .member__card {
      display: flex;
      align-items: center;
      margin-bottom: 1em;

      p {
        color: var(--white-color);
      }

      div {
        background-color: black;
        height: 30px;
        border-radius: var(--radiusSm);
        overflow: hidden;
        margin-right: 1em;
      }
      img {
        height: 30px;
      }
    }
  }

}

</style>
