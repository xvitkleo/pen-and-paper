<template>
  <div class="files__container">
    <div class="files__tittle">
      <div><h4>Archivos Compartidos</h4></div>
      <div class="files__tools">
        <search-input v-model='searchField'/>
        <div class="addFile__container">
          <label for="upload-file">
            <img class="addFile__btn"
              src="../assets/add.svg" alt="">
          </label>
          <input class="hidden" id="upload-file" type="file" @change="handleFileChange">
        </div>
      </div>
    </div>
    <div v-if="files.length" class="fileCards__container">
      <file-card v-for="(file, index) in files
        .filter(file => file.file.name.toLowerCase().includes(searchField.toLowerCase()))"
        :key="index" :file="file"
      />
    </div>
    <div v-else class="files__emptyState">
      <img src="@/assets/filesEmptyState.svg" alt="">
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import SearchInput from '../components/SearchInput.vue';
import FileCard from '../components/FileCard.vue';

export default {
  name: 'RoomFiles',
  components: {
    FileCard,
    SearchInput,
  },

  data() {
    return {
      searchField: '',
      isMenuOpen: false,
      name: '',
      theme: '',
      length: '',

    };
  },

  methods: {
    ...mapMutations(['setAlert']),
    async handleFileChange(e) {
      const index = 0;
      this.selectedFile = e.target.files[index];
      try {
        await this.$store.dispatch('uploadFile', this.selectedFile);
        this.setAlert({
          state: 'success',
          message: 'Ha subido un archivo',
        });
      } catch (err) {
        this.setAlert({
          state: 'error',
          message: 'No se ha podido subir el archivo, intentelo de nuevo',
        });
      }
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
.fileCards__container {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 31.3%);
  grid-auto-rows: 48.5%;
  gap: 3%;
  overflow: auto;
}

.files__container {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.files__tittle {
  border-bottom: 1px solid #514b6531;
  margin: 1em 0;
  padding: .5em 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .files__tools {
    display: flex;
    align-items: center;
    & > div:first-child {
      margin-right: 1em;
    }
  }
  .addFile__container label {
    display: flex;
    align-items: center;
  }
}

.addFile__btn {
  height: 1.2em;
  width: 1.2em;
  cursor: pointer;
}

.files__emptyState {
  height: 100%;
  display: flex;
  img {
    margin: auto;
    height: 15em;
    opacity: 0.7;
  }
}
</style>
