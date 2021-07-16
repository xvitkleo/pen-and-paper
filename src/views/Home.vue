<template>
  <div class='home__container'>
    <side-bar></side-bar>
    <div class="content">
      <top-bar v-if="userProfile.name" :name='userProfile.name' :lastname="userProfile.lastname">
      </top-bar>
      <router-view class="view"></router-view>
      <alert></alert>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import TopBar from '../components/TopBar.vue';
import SideBar from '../components/SideBar.vue';
import Alert from '../components/Alert.vue';

export default {
  name: 'Home',
  components: {
    SideBar,
    TopBar,
    Alert,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState(['userProfile']),
  },
};
</script>

<style lang='scss' scoped>
.home__container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.content {
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  .view {
    height: calc(100% - 4em);
  }
}
</style>
