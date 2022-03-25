<template>
  <div>
    <b-container>
      {{playerOptions.sources[0].src}}
      <video-player class="video-player-box" ref="videoPlayer" :options="playerOptions" :playsinline="true">
      </video-player>
      <br>
    </b-container>
  </div>

</template>

<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  name: 'VideoPlayer',
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
        sources: [{
            type: "video/mp4",
            src: '../../../videos/' + this.$route.query.file
          }],
        aspectRatio: "16:9"
      }
    }
  },
  computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
