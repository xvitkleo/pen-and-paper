<template>
  <div class='account-box__container'>
    <div class="account-box__img">
      <img :src="userProfile.photoURL || require('@/assets/profilePicture.png')" alt="">
    </div>
    <h4>{{ userProfile.name + ' ' + (!userProfile.isGoogle ? userProfile.lastname : '') }}</h4>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AccountBox',
  components: {},

  props: {
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapState(['userProfile']),
  },
};
</script>

<style lang='scss' scoped>
.account-box__container {
  width: 20em;
  display: flex;
  justify-content: center;
  align-items: center;
  .account-box__img {
    height: 35px;
    width: 35px;
    margin-right: 1.5em;
    border-radius: 100%;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
