<template>
  <div class='top-bar__container'>
    <div class="top-bar__tittle">
      <h2>{{tittle}}</h2>
    </div>
    <account-box></account-box>
  </div>
</template>

<script>
import AccountBox from './AccountBox.vue';

export default {
  name: 'TopBar',
  components: {
    AccountBox,
  },

  props: {
    tittle: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
.top-bar__container {
  display: flex;
  min-height: 5em;
  max-height: 5em;
  width: 100%;
  justify-content: space-between;
  border-bottom: solid 1px #222226;

  .top-bar__tittle {
    margin: auto 4.5%;
  }

  * {
    color: white;
  }
}
</style>
