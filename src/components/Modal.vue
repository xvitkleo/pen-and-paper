<template>
  <transition name='modal'>
    <div v-if='isOpen' class='modal__mask'>
      <div class='modal__container'>
        <div @click="$emit('close')" class='modal__close'>
          <img src="@/assets/close.svg" alt="">
        </div>

        <div class='modal__body'>
          <h3 v-if='$slots.title' class='modal__title'>
            <slot name='title' />
          </h3>

          <p v-if='$slots.description' class='modal__description'>
            <slot name='description' />
          </p>

          <slot />
        </div>

        <div v-if='$slots.footer' class='modal__footer'>
          <slot name='footer'></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    isOpen: Boolean,
  },

  destroyed() {
    this.$emit('close');
  },
};
</script>

<style lang='scss' scoped>
.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal__container {
  position: relative;
  width: 35%;
  max-height: 95%;
  text-align: center;
  background-color: var(--secondary-color);
  border-radius: var(--lengthSm1);
  transition: all 0.3s ease;
  overflow-y: auto;
}

.modal__close {
  position: absolute;
  top: 0;
  right: 0;
  margin: var(--lengthMd1);

  img {
    cursor: pointer;
    height: .8em;
  }
}

.modal__body {
  padding: var(--lengthLg1);
}

.modal__title,
.modal__icon {
  margin-bottom: var(--lengthMd3);
}

.modal__footer {
  display: flex;
  justify-content: center;
  padding: var(--lengthMd3);
  border-top: 1px solid #e5e5e5;
  border-bottom-left-radius: var(--lengthSm1);
  border-bottom-right-radius: var(--lengthSm1);
}

.modal__footer .btn + .btn {
  margin-left: var(--lengthMd3);
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 300ms;
}

.modal-enter-to {
  opacity: 1;
}
</style>
