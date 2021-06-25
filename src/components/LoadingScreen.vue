<template>
  <div class='loading-screen'>
    <div class="loading-icon">
      <img src="@/assets/loading.png" alt="">
      <img src="@/assets/loader.gif" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoadingScreen',
};
</script>

<style lang='scss' scoped>
.loading-screen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.671);
}
.loading-icon {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  img:first-child {
    height: 10em;
  }
  img:nth-child(2) {
    height: 9em;
    width: 13.5em;
  }
}
</style>
