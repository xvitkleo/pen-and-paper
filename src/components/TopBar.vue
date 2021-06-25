<template>
  <div class='top-bar__container'>
    <div class="top-bar__tittle">
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
  },

  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
.top-bar__container {
  display: flex;
  min-height: 4em;
  max-height: 4em;
  width: 100%;
  justify-content: space-between;
  border-bottom: solid 1px #222226;
  background-color: var(--light-secondary-color);

  .top-bar__tittle {
    margin: auto 4.5%;
  }
}
</style>
