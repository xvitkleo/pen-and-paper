<template>
  <div>
    <video v-if="videoSrc" id="video" autoplay :srcObject.prop ='videoSrc'></video>
    <button @click='start'>Start</button>
    <button @click='end'>End</button>
  </div>
</template>

<script>

export default {
  name: 'Test',
  components: {
  },

  data() {
    return {
      videoSrc: null,
      displayMediaOptions: {
        video: {
          cursor: 'always',
        },
        audio: false,
      },
    };
  },

  methods: {
    async startCapture() {
      try {
        this.videoSrc = await navigator.mediaDevices.getDisplayMedia(this.displayMediaOptions);
        this.dumpOptionsInfo();
      } catch (err) {
        console.error(err);
      }
    },
    stopCapture() {
      const tracks = this.videoSrc.getTracks();

      tracks.forEach((track) => track.stop());
      this.videoSrc = null;
    },
    dumpOptionsInfo() {
      const videoTrack = this.videoSrc.getVideoTracks()[0];

      console.info('Track settings:');
      console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
      console.info('Track constraints:');
      console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
    },
    start() {
      this.startCapture();
    },
    end() {
      this.stopCapture();
    },
  },

  mounted() {
  },

  computed: {
  },
};
</script>

<style lang='scss' scoped>
#video {
  border: 1px solid #999;
  width: 98%;
  max-width: 860px;
}

.error {
  color: red;
}

.warn {
  color: orange;
}

.info {
  color: darkgreen;
}
</style>
