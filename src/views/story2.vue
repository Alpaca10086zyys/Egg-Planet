<template>
  <div class="about" @click="handleClick">
    <transition name="fade-in-up">
      <img v-if="clickCount > 0 && stage === 0" src="../assets/story2/文字1.png" alt="文字1" class="text-image">
    </transition>
    <transition name="fade-in-up">
      <img v-if="clickCount > 1 && stage === 0" src="../assets/story2/对话1-1.png" alt="对话1-1" class="dialog-image">
    </transition>
    <transition name="fade">
      <img v-if="clickCount > 2 && stage === 0" src="../assets/story2/对话1-2.png" alt="对话1-2" class="dialog-image">
    </transition>
    <transition name="fade">
      <img v-if="clickCount > 3 && stage === 0" src="../assets/story2/对话1-3.png" alt="对话1-3" class="dialog-image">
    </transition>
    <transition name="slide-left" @after-enter="showButton">
      <img v-if="clickCount === 5 && stage === 0" ref="egg" @animationend="handleAnimationEnd" src="../assets/story2/egg.png" alt="egg" class="egg-image">
    </transition>
    <transition name="fade">
      <img v-if="newImageVisible && newClickCount > 0 && stage === 1" src="../assets/story2/对话2-1.png" alt="对话2-1" class="dialog2-image">
    </transition>
    <transition name="fade">
      <img v-if="newImageVisible && newClickCount > 1 && stage === 1" src="../assets/story2/对话2-2.png" alt="对话2-2" class="dialog2-image">
    </transition>
    <transition name="fade-in-up">
      <img v-if="stage === 3 && newClickCount > 2" src="../assets/story2/文字3.png" alt="文字3" class="text-image">
    </transition>
    <transition name="fade-in-up">
      <img v-if="stage === 3 && newClickCount > 3" src="../assets/story2/对话3-1.png" alt="对话3-1" class="dialog-image">
    </transition>
    <transition name="fade">
      <img v-if="stage === 3 && newClickCount > 4" src="../assets/story2/对话3-2.png" alt="对话3-2" class="dialog-image">
    </transition>
    <transition name="fade">
      <img v-if="stage === 3 && newClickCount > 5" src="../assets/story2/对话3-3.png" alt="对话3-3" class="dialog-image">
    </transition>
    <transition name="fade">
      <img v-if="stage === 4 && newClickCount > 6" src="../assets/story2/对话4-1.png" alt="对话4-1" class="dialog2-image">
    </transition>
    <transition name="fade">
      <img v-if="stage === 4 && newClickCount > 7" src="../assets/story2/对话4-2.png" alt="对话4-2" class="dialog2-image">
    </transition>
    <transition name="bounce-left-to-right" @after-enter="handleBouncingEnd">
      <img v-if="showMusic1" src="../assets/story2/music1.png" alt="music1" class="bouncing-music-image">
    </transition>
    <transition name="fade-in-up">
      <img v-if="stage === 5 && newClickCount>9" src="../assets/story2/文字5.png" alt="文字5" class="text-image">
    </transition>
    <transition name="fade-in-up">
      <img v-if="stage === 5 && newClickCount >10" src="../assets/story2/对话5-1.png" alt="对话5-1" class="dialog-image">
    </transition>
    <transition name="fade">
      <img v-if="stage === 5 && newClickCount >11" src="../assets/story2/对话5-2.png" alt="对话5-2" class="dialog-image">
    </transition>
    <transition name="fade">
      <img v-if="stage === 5 && newClickCount >12" src="../assets/story2/对话5-3.png" alt="对话5-3" class="dialog-image">
    </transition>
    <transition name="fade">
      <img v-if="stage === 6 && newClickCount > 13" src="../assets/story2/对话6-1.png" alt="对话6-1" class="dialog2-image">
    </transition>
    <transition name="fade">
      <img v-if="stage === 6 && newClickCount > 14" src="../assets/story2/对话6-2.png" alt="对话6-2" class="dialog2-image">
    </transition>
    <button v-if="showEggButton" class="action-button" @click="showNewImage"></button>
  </div>
</template>

<script>
export default {
  name: 'Story2',
  data() {
    return {
      clickCount: 0,
      newClickCount: 0,
      newImageVisible: false,
      showEggButton: false,
      showMusic1: false,
      stage: 0
    };
  },
  methods: {
    handleClick() {
      if (this.stage === 0 && this.clickCount < 5) {
        this.clickCount++;
      }
    },
    handleAnimationEnd(event) {
      if (event.animationName === 'slideLeftAndRotate') {
        event.target.style.display = 'none';
      }
      if (event.animationName === 'bounce-left-to-right') {
        event.target.style.display = 'none';
      }
    },
    handleBouncingEnd() {
      this.showEggButton = true;
    },
    showButton() {
      this.showEggButton = true;
    },
    showNewImage() {
      if (this.stage === 0) {
        this.stage = 1;
        this.newImageVisible = true;
        this.newClickCount = 1;
      } else if (this.stage === 1 && this.newClickCount < 2) {
        this.newClickCount++;
      } else if (this.stage === 1 && this.newClickCount === 2) {
        this.stage = 3;
        this.newClickCount++;
        this.newImageVisible = true;
      } else if (this.stage === 3 && this.newClickCount < 6) {
        this.newClickCount++;
      } else if (this.stage === 3 && this.newClickCount === 6) {
        this.stage = 4;
        this.newClickCount++;
      } else if (this.stage === 4 && this.newClickCount < 8) {
        this.newClickCount++;
      } else if (this.stage === 4 && this.newClickCount === 8) {
        this.showMusic1 = true;
        this.newClickCount++;
      }else if (this.stage === 4 && this.newClickCount === 9) {
        this.showMusic1=false;
        this.stage = 5;
        this.newClickCount ++; 
      } else if (this.stage === 5 && this.newClickCount < 13) {
        this.newClickCount++;
      }
      else if (this.stage === 5 && this.newClickCount === 13) {
        this.stage = 6;
        this.newClickCount++;
      }else if (this.stage === 6 && this.newClickCount < 15) {
        this.newClickCount++;
      }
    }
  }
};
</script>

<style scoped>
.about {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

body {
  cursor:url("../assets/egg2cursor.png"),auto;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  background-color: rgb(239, 232, 224);
}

.text-image,
.dialog-image,
.dialog2-image,
.egg-image {
  position: absolute;
  max-width: 100%;
  height: auto;
}

.text-image {
  top: 0%;
  left: 15%;
  width: 65%;
}

.dialog-image {
  top: 25%;
  left: 20%;
}

.dialog2-image {
  top: 5%;
  left: 8%;
  max-width: 80%;
}

.egg-image {
  top: 50%;
  left: 50%;
}

.bouncing-music-image{
  top: 80%;
}

.fade-in-up-enter-active {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active {
  animation: fade 1s ease-out forwards;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.slide-left-enter-active {
  animation: slideLeftAndRotate 4s linear forwards;
}

@keyframes slideLeftAndRotate {
  0% {
    transform: translateX(-100vw) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: translateX(0vw) rotate(720deg);
    opacity: 1;
  }
  100% {
    transform: translateX(100vw) rotate(1440deg);
    opacity: 0;
  }
}
@keyframes bounceLeftToRight {
  0% {
    opacity: 0;
    transform: translateX(-100vw) translateY(60px);
  }
  25% {
    opacity: 1;
    transform: translateX(-50vw) translateY(120px);
  }
  50% {
    opacity: 1;
    transform: translateX(0vw) translateY(60px);
  }
  75% {
    opacity: 1;
    transform: translateX(50vw) translateY(120px);
  }
  100% {
    opacity: 1;
    transform: translateX(100vw) translateY(0);
  }
}

.bounce-left-to-right-enter-active {
  animation: bounceLeftToRight 4s linear forwards;
}

.action-button {
  position: absolute;
  bottom: 90px;
  right: 90px;
  width: 120px;
  height: 120px;
  background: url('../assets/story2/eggbutton.png') no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease; 
}

.action-button:hover {
  transform: scale(1.5); 
  cursor:url("../assets/egg2cursor.png"),auto;
}

.action-button:focus {
  outline: none;
}
</style>
