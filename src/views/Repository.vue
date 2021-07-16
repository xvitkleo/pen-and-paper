<template>
  <div class='repository__container'>
    <div class="apa__form">
      <custom-input label="Pega tu DOI:" v-model="doi"></custom-input>
      <custom-button @click="getAPA()">Obtener APA</custom-button>
    </div>
   <div class="gcse-search" data-as_sitesearch="https://scholar.google.com/" data-queryParameterName="search"></div>
   <modal v-if="isModalOpen" :isOpen="isModalOpen" @close="isModalOpen = false">
      <template slot="title">Formato APA</template>
      <div>
        <p>{{ this.apa }}</p>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import CustomButton from '../components/CustomButton.vue';
import CustomInput from '../components/CustomInput.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'Repository',
  components: {
    CustomButton,
    CustomInput,
    Modal,
  },

  data() {
    return {
      doi: '',
      apa: '',
      isModalOpen: false,
    };
  },

  methods: {
    ...mapMutations(['setAlert', 'setLoadingState']),
    async getAPA() {
      // let idToSend = '10.1186/s12864-018-5131-x';
      // const url = '/2/doi2bib';
      // idToSend = idToSend.replace(/ /g, '');
      // if (idToSend.match(/^doi:/i)) {
      //   idToSend = idToSend.substring(4);
      // } else if (idToSend.indexOf('doi.org/') >= 0) {
      //   idToSend = idToSend.substr(idToSend.indexOf('doi.org/') + 8);
      // }
      // fetch(`http://localhost:8080${url}?id=${idToSend}`)
      //   .then((e) => e.json())
      //   .then((data) => console.log(data));
      let data;
      this.setLoadingState(true);
      fetch(`https://api.crossref.org/works/${this.doi}`).then((e) => e.json()).then((e) => {
        data = e.message;
        let author = '';
        data.author.forEach((el, index) => {
          if (index === data.author.length - 2) {
            author += `${el.family}, ${el.given[0]}. & `;
          } else if (index === data.author.length - 1) {
            author += `${el.family}, ${el.given[0]}.`;
          } else author += `${el.family}, ${el.given[0]}.,`;
          return el;
        });
        const date = ` (${new Date(data.created.timestamp).getFullYear()}).`;
        const title = ` ${data.title[0]}. `;
        const sTitle = `${data['short-container-title'][0]},`;
        const volIss = `${data.volume}(${data.issue}).`;
        const url = ` https://doi.org/${data.DOI}`;
        this.apa = author + date + title + sTitle + volIss + url;
        this.isModalOpen = true;
        this.setLoadingState(false);
      }).catch(() => {
        this.setAlert({
          state: 'error',
          message: 'DOI invalido',
        });
        this.setLoadingState(false);
      });
    },
  },

  mounted() {
    const recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://cse.google.com/cse.js?cx=05ae9dfa27f7d6e71');
    document.head.appendChild(recaptchaScript);
  },

  computed: {
  },
};
</script>

<style lang='scss'>
.repository__container {
  display: flex;
  flex-flow: column;
  gap: 1.5em;
  height: 100%;
  background-color: var(--light-secondary-color);
  border-radius: var(--radiusBase);
  margin: 1.5em 0 0 0;
  padding: 1.5em;
  & > div:nth-child(2) {
    overflow-y: scroll;
    height: 100%;
    border-radius: 8px;
    * {
      color: black;
    }
  }
  .apa__form {
    display: flex;
    align-items: flex-end;
    gap: 2em;
  }

  .gsc-control-cse {
    border-radius: 8px;
  }
}
</style>
