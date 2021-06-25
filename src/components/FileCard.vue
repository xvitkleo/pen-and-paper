<template>
  <div class="fileCard__container">
    <div class="fileCard__header">
      <ellipsis :showDelete="file.metadata.customMetadata.uploaderId === userProfile.id"
        v-on:delete="deleteFile" v-on:download="downloadFile"/>
    </div>
    <div class="fileCard__body">
      <img
        class="fileCard__img"
        :src="
          require(`@/assets/fileTypes/${
            fileTypes.find(
              fileType => fileType.Extension === '.'+file.file.name.split('.').pop()
            ) ?
            fileTypes.find(
              fileType => fileType.Extension === '.'+file.file.name.split('.').pop()
            ).svg : 'file.svg'
          }`)
        "
        alt=""
      />
      <p>{{ file.file.name }}</p>
    </div>
    <div class="fileCard__footer">
      <div>
        <p>Size:</p>
        <p>{{ (file.metadata.size / 1000).toFixed(1) }} KB</p>
      </div>
      <div class="fileCard__pfp">
        <img :src="getUserById(file.metadata.customMetadata.uploaderId).photoURL
        || require('@/assets/profilePicture.svg')" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ellipsis from './Ellipsis.vue';
import ft from '../fileTypes';

export default {
  name: 'FileCard',

  components: {
    ellipsis,
  },

  data() {
    return {
      fileTypes: ft.fileTypes,
    };
  },

  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  methods: {
    deleteFile() {
      console.log(this.file);
      this.$store.dispatch('deleteFile', this.file);
    },

    downloadFile() {
      this.file.file
        .getDownloadURL()
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          const link = document.createElement('a');
          link.download = this.file.file.name;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    ...mapState(['userProfile', 'rooms']),
    ...mapGetters(['getUserById']),
  },
};
</script>

<style lang='scss' scoped>
p {
  font-size: var(--lengthSm3);
}
.fileCard__container {
  background-color: var(--light-secondary-color);
  border-radius: var(--radiusSm);
  padding: .5em 1.5em;
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  &:hover {
    background-color: #242433;
    h2 {
      color: white;
    }
  }
}
.fileCard__img {
  height: 4.5em;
}
.fileCard__header {
  height: 15%;
  display: flex;
  align-items: center;
}
.fileCard__body {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-evenly;
  height: 53%;
  margin: auto;
  width: 85%;
  p {
    margin-top: 1.5em;
    text-align: center;
  }
}
.fileCard__footer {
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div p:first-child {
    margin-bottom: .2em;
  }
  & > div p:nth-child(2) {
    margin-bottom: .2em;
    color: var(--light-gray);
  }
  .fileCard__pfp img{
    height: 1.6em;
    border-radius: var(--radiusSm);
    filter: grayscale(100%) brightness(.6);
  }
}
</style>
