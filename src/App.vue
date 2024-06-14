<template>
  <audio id="background-music" ref="audioRef" src="../public/春之行.mp3" loop></audio>
  <button class="play-button1" @click="playAndHideButton" v-if="!isPlaying">
    <span class="button-text">播放音乐</span>
  </button>
  <RouterView />
</template>

<script setup>
import { ref } from 'vue';

const isPlaying = ref(false);

const playAndHideButton = () => {
  const audio = document.getElementById('background-music');
  if (audio && !isPlaying.value) {
    audio.play().then(() => {
      isPlaying.value = true;
    }).catch((error) => {
      console.error('Failed to play audio:', error);
    });
  }
};
</script>


<style>
html,body,#app{
    height: 100%;
    width: 100%;
    /* background-color: #f2eadf;  */
  }
  
.play-button1 {
  background-color: #f2eadf;
  color: #ebb94c;
  border: none;

  font-size: 18px;
  font-weight: bold;

  cursor: pointer;
  transition: background-color 0.3s ease;
}

.play-button1:hover {
  background-color: #7b4e45;
}
.button-text {
  font-size: 16px;
  font-weight: bold;
  line-height: 1.1;
}
</style>
