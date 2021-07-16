<template>
  <transition name='alert'>
    <div v-if='alert.state' class='alert' :class='typeClass'>
      <svg
        v-if="alert.state === 'success'"
        class='medium-icon'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>

      <svg
        v-else-if="alert.state === 'error'"
        class='medium-icon'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667
          1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        />
      </svg>

      <span>{{ alert.message }}</span>

      <div class='close-btn' @click='clearAlert'>
        <svg class='small-icon' viewBox='0 0 20 20' fill='currentColor'>
          <path
            fill-rule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293
            4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10
            4.293 5.707a1 1 0 010-1.414z'
            clip-rule='evenodd'
          />
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      timeOutId: '',
    };
  },

  watch: {
    'alert.state': function () {
      if (this.alert.state) {
        if (this.timeOutId) clearTimeout(this.timeOutId);
        this.timeOutId = setTimeout(() => {
          this.setAlert({ state: '', message: '' });
          if (this.timeOutId) clearTimeout(this.timeOutId);
          this.timeOutId = '';
        }, 5000);
      }
    },
  },

  computed: {
    ...mapState(['alert']),

    typeClass() {
      switch (this.alert.state) {
        case 'success':
          return 'alert--success';
        case 'error':
          return 'alert--danger';
        default:
          return '';
      }
    },
  },

  methods: {
    ...mapMutations(['setAlert']),

    clearAlert() {
      this.setAlert({
        state: '',
        message: '',
      });
      if (this.timeOutId) {
        clearTimeout(this.timeOutId);
        this.timeOutId = '';
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.alert {
  position: fixed;
  top: 0;
  right: 0;
  margin: var(--lengthMd1);
  padding: var(--lengthMd1);
  display: flex;
  align-items: center;
  font-weight: var(--semi-bold);
  background-color: #3D4145;
  border-radius: var(--lengthSm1);
  box-shadow: 0 0 5px 1px rgba(000, 000, 000, 0.1);
  z-index: 9998;
}

.small-icon {
  width: 20px;
  height: 20px;
}

.medium-icon {
  width: 24px;
  height: 24px;
}

.close-btn {
  margin-left: var(--lengthMd2);
  color: #c1c1c1;
  display: flex;
  cursor: pointer;
}

.alert .medium-icon {
  margin-right: var(--lengthSm3);
}

.alert--danger .medium-icon {
  color: var(--danger);
}

.alert--success .medium-icon {
  color: var(--success);
}

.alert-enter,
.alert-leave-to {
  transform: translateY(-200px);
  opacity: 0;
}

.alert-enter-active,
.alert-leave-active {
  transition: transform 300ms, opacity 300ms;
}
</style>
