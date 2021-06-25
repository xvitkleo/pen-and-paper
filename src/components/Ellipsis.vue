<template>
  <div class="container" @click="$emit('click')">
    <div class="button" @click="show = !show">
      <div><img src="@/assets/ellipsis.svg" alt="" /></div>
    </div>
    <div :class="show ? 'collapse' : 'collapse hide'">
      <div class="content">
        <div
        v-if="showDownload"
          class="download"
          @click="
            $emit('download');
            show = false;
          "
        >
          <svg id="bold" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
          <path d="m12 16c-.205
          0-.401-.084-.542-.232l-5.25-5.5c-.455-.476-.117-1.268.542-1.268h2.75v-5.75c0-.689.561-1.25
          1.25-1.25h2.5c.689 0 1.25.561 1.25 1.25v5.75h2.75c.659 0 .997.792.542
          1.268l-5.25 5.5c-.141.148-.337.232-.542.232z"/>
          <path d="m22.25 22h-20.5c-.965 0-1.75-.785-1.75-1.75v-.5c0-.965.785-1.75
          1.75-1.75h20.5c.965 0 1.75.785 1.75 1.75v.5c0 .965-.785 1.75-1.75 1.75z"/>
          </svg>
          <p>Descargar</p>
        </div>
        <div
        v-if="showDelete"
          class="delete"
          @click="
            $emit('delete');
            show = false;
          "
        >
          <svg class="small-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002
                2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011
                2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1
                1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <p>Eliminar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ellipsis',
  data() {
    return {
      show: false,
    };
  },
  props: {
    showDelete: {
      required: false,
      default: true,
    },
    showDownload: {
      required: false,
      default: true,
    },
  },
  computed: {},
};
</script>

<style scoped>
.container {
  position: relative;
  width: fit-content;
}

.button span {
  margin: 1em;
  padding: 0.2em 1em;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: var(--weight-bold);
  border: solid 1px #d1d1d1;
  border-radius: 5px;
  cursor: pointer;
}

.button img {
  height: 0.85em;
  width: 1em;
  cursor: pointer;
}

.collapse {
  position: absolute;
  top: 140%;
  left: 0;
  border-radius: 5px;
  background-color: var(--secondary-color);
  width: fit-content;
  z-index: 1;
  border: solid 1px rgba(128, 128, 128, 0.26);
}

.collapse span {
  width: 100%;
}

.hide {
  display: none;
}

.content {
  display: flex;
  flex-wrap: wrap;
}

.content > div {
  width: 100%;
  padding: 0.5em 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.content > div svg {
  height: 1.2em;
  width: 1.2em;
  margin-right: 0.8em;
  fill: var(--light-gray);;
}

.download,
.delete {
  display: flex;
  align-items: center;
}

p {
  font-weight: 500;
  color: var(--light-gray);
}
</style>
