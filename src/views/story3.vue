<template>
  <!-- <div class="story3">
      <h1>This is 3</h1>
  </div> -->
  <BackgroundChanger class="story3">
    <div class="page">
      <img src="../assets/story3/开场蛋.png" alt="" class="sticker">
      <img src="../assets/story3/开场白.png" alt="" class="sticker floating">
    </div>
    <div class="page">
      <img src="../assets/story3/1.png" alt="" class="image1">
    </div>
    <div class="page">
      <img src="../assets/story3/2.png" alt="" class="image2">
    </div>
    <div class="page">
      <img class="floating" src="../assets/story3/3-鸡妈.png" alt="">
      <img src="../assets/story3/3-蛋宝宝.png" alt="">
    </div>
    <div class="page">
      <img src="../assets/story3/4.png" alt="" class="image4">
    </div>
    <div class="page">
      <img src="../assets/story3/5.png" alt="" class="image5">
    </div>
    <div class="page">
      <img src="../assets/story3/6.png" alt="" class="image6">
    </div>
    <div class="page">
      <img src="../assets/story3/7.png" alt="" class="image7">
      <img src="../assets/story3/7-对呀.png" alt="" id="floating7word">
      <img src="../assets/story3/7-汗.png" alt="" id="floating7sweat">
    </div>
    <div class="page">
      <img src="../assets/story3/8.png" alt="" class="image8">
    </div>
    <div class="page">
      <img src="../assets/story3/9.png" alt="" class="image9">
      <img src="../assets/story3/9-汗左.png" alt="" id="" z-index:1>
      <img src="../assets/story3/9-汗右.png" alt="" id="" z-index:1>
    </div>
    <div class="page">
      <img src="../assets/story3/10.png" alt="" class="image10">
      <img src="../assets/story3/10-怒气右.png" alt="" id="" z-index:1>
      <img src="../assets/story3/10-怒气左.png" alt="" id="" z-index:1>
      <img src="../assets/story3/10-怒气身.png" alt="" id="" z-index:1>
    </div>
    <div class="page">
      <img src="../assets/story3/11.png" alt="" class="image11">
    </div>
    <div class="page">
      <img src="../assets/story3/12.png" alt="" class="image12">
      <img src="../assets/story3/12-light.png" alt="" id="" z-index:1>
      <img src="../assets/story3/12-star.png" alt="" id="" z-index:1>
    </div>
    <div class="page">
      <img src="../assets/story3/13.png" alt="" class="image13">
    </div>
    <div class="page">
      <img src="../assets/story3/14.png" alt="" class="image14">
    </div>
    <div class="page">
      <img src="../assets/story3/15.png" alt="" class="image15">
    </div>
    <div class="page">
      <img src="../assets/story3/16.png" alt="" class="image16">
    </div>
    <div class="page">
      <img src="../assets/story3/17-字.png" alt="" id="" z-index:1>
      <img src="../assets/story3/17.png" alt="">
    </div>

  </BackgroundChanger>
</template>

<script>
// import "/node_modules/animate.css"
import BackgroundChanger from '../components/BackgroundChanger.vue'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "story3",
  components: {
    BackgroundChanger,
  },
  data() {
    return {
      stickerStyle: {
        transform: 'scale(1)'
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.imageTroll();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    imageTroll() {
      // const t = gsap.timeline();
      ScrollTrigger.create({
        trigger: '.image1',
        start: 'top 100%',
        end: 'top 20%',
        // markers: true,
        scrub: true,
        animation:
          gsap.fromTo('.image1', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image1',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image1', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image2',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image2', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image2',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image2', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image4',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image4', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image4',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image4', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image5',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image5', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image5',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image5', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image6',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image6', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image6',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image6', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image7',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image7', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image7',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image7', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image8',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image8', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image8',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image8', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image9',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image9', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image9',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image9', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image10',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image10', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image10',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image10', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image11',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image11', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image11',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image11', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image12',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image12', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image12',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image12', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image13',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image13', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image13',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image13', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image14',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image14', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image14',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image14', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image15',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image15', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image15',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image15', { scale: 1.4 }, { scale: 0.8 })
      })
      ScrollTrigger.create({
        trigger: '.image16',
        start: 'top 100%',
        end: 'top 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image16', { scale: 0.8 }, { scale: 1.4 })
      })
      ScrollTrigger.create({
        trigger: '.image16',
        start: 'bottom 70%',
        end: 'bottom 20%',
        scrub: true,
        animation:
          gsap.fromTo('.image16', { scale: 1.4 }, { scale: 0.8 })
      })
    }
  }

};
</script>

<style scoped>
.page {
  /*页容器 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 设置容器高度 */
  position: relative;
  /*相对定位，这是为了标题可以浮动在蛋上面 */
}

/* .image {
  object-fit: contain;
} */

.sticker {
  max-width: 100%;
  max-height: 100%;
  /* object-fit: contain; */
}

.floating {
  position: absolute;
  /* 设置绝对定位 */
  top: 5vh;
  /* 距离容器顶部 10px */
  /* left: 5vw; */
  /* 距离容器左侧 10px */
  max-width: 100%;
  max-height: 100%;
  z-index: 1;
  /* 确保浮动图片在主图片之上 */
}

#floating7word {
  position: absolute;
  top: 48vh;
  right: 33vw;
  z-index: 1;
}

#floating7sweat {
  position: absolute;
  top: 58vh;
  left: 48vw;
  z-index: 1;
}
</style>


