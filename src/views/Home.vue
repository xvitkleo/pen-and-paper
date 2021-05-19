<template>
  <div class='home__container'>
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';

export default {
  name: 'Home',
  components: {
    SideBar,
  },

  data() {
    return {};
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
</style>
