<template>
  <router-link v-if='to' :to='to' :class='btnVariant' class='btn'>
    <slot></slot>
  </router-link>
  <a
    v-else-if='href'
    :href='href'
    target='_blank'
    rel='noopener noreferrer'
    :class='btnVariant'
    class='btn'
  >
    <slot></slot>
  </a>
  <button
    v-else
    @click="$emit('click')"
    :type='type'
    :disabled='disabled'
    :class='btnVariant'
    class='btn'
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    to: String,
    href: String,
    variant: String,
    type: String,
    disabled: Boolean,
  },
  computed: {
    btnVariant() {
      switch (this.variant) {
        case 'text':
          return 'btn__text';
        case 'text2':
          return 'btn__text2';
        case 'text2-danger':
          return 'btn__text2--danger';
        case 'danger':
          return 'btn__danger';
        default:
          return 'btn__primary';
      }
    },
  },
};
</script>

<style lang='scss' scoped>
* {
  font-size: var(--lengthBase);
  cursor: pointer;
}
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: var(--lengthSm3) var(--lengthLg1);
  font-size: var(--lengthBase);
  font-weight: var(--medium);
  text-align: center;
  border: 1px solid;
  transition: background-color 300ms;
}

.btn__primary {
  color: white;
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  border-radius: var(--radiusSm);
}

.btn__danger {
  color: white;
  background-color: var(--danger);
  border-color: var(--danger);
  border-radius: var(--radiusSm);
}

.btn__text {
  color: white;
  background-color: transparent;
  border-color: white;
  border-radius: var(--radiusSm);
}

.btn__text2 {
  color: white;
  background-color: transparent;
  border: none
}

.btn__text2--danger {
  color: var(--danger);
  background-color: transparent;
  border: none
}

.btn__primary:hover:not(:disabled) {
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn:active:not(:disabled) {
  transform: translateY(2px);
}

.btn div {
  display: flex;
  width: 95%;
  justify-content: space-around;
  align-items: center;
}
</style>
