<template>
  <div class="optimized-story" v-if="assetsLoaded">
    <!-- 使用动画管理器优化的组件示例 -->
    <div class="story-container">
      <!-- 带loading状态的图片组 -->
      <transition-group name="fade" tag="div" class="image-group">
        <img 
          v-for="(image, index) in currentImages" 
          :key="`image-${index}`"
          :src="image.src" 
          :alt="image.alt"
          :class="image.classes"
          @load="onImageLoad"
        />
      </transition-group>
      
      <!-- 优化的滚动触发元素 -->
      <div 
        ref="scrollTarget" 
        class="scroll-trigger"
        :class="{ 'in-view': isInView }"
      >
        <img 
          src="../assets/story3/9.png" 
          alt="滚动触发的图片" 
          class="scroll-image"
        />
      </div>
    </div>

    <!-- 加载进度指示器 -->
    <div v-if="!animationsReady" class="loading-indicator">
      <div class="loading-text">加载中... {{ loadingProgress }}%</div>
    </div>
  </div>
  
  <!-- 骨架屏 -->
  <div v-else class="skeleton-loader">
    <div class="skeleton-image"></div>
    <div class="skeleton-text"></div>
  </div>
</template>

<script>
import { globalAnimationManager, ANIMATION_CONFIG, throttle } from '@/utils/AnimationManager.js';

export default {
  name: 'OptimizedStoryExample',
  data() {
    return {
      assetsLoaded: false,
      animationsReady: false,
      loadingProgress: 0,
      isInView: false,
      currentImages: [
        { src: '../assets/story3/1.png', alt: '图片1', classes: 'story-image fade-enter' },
        { src: '../assets/story3/2.png', alt: '图片2', classes: 'story-image fade-enter' }
      ],
      // 缓存DOM元素引用，避免重复查询
      cachedElements: {},
      // 动画实例引用
      animations: {
        scrollTrigger: null,
        sparkle: null
      }
    };
  },
  
  async mounted() {
    await this.initializeComponent();
  },
  
  beforeUnmount() {
    this.cleanup();
  },
  
  methods: {
    async initializeComponent() {
      try {
        // 1. 预加载资源
        await this.preloadAssets();
        
        // 2. 缓存DOM元素
        this.cacheElements();
        
        // 3. 检查用户偏好
        if (globalAnimationManager.respectsReducedMotion()) {
          this.setupReducedMotionMode();
        } else {
          await this.setupAnimations();
        }
        
        // 4. 设置事件监听器
        this.setupEventListeners();
        
        this.animationsReady = true;
      } catch (error) {
        console.error('组件初始化失败:', error);
        // 降级处理
        this.fallbackMode();
      }
    },
    
    async preloadAssets() {
      const imageSources = this.currentImages.map(img => img.src);
      
      // 使用动画管理器的预加载功能
      const loadPromises = imageSources.map((src, index) => {
        return globalAnimationManager.preloadImages([src]).then(() => {
          this.loadingProgress = Math.round(((index + 1) / imageSources.length) * 100);
        });
      });
      
      await Promise.all(loadPromises);
      this.assetsLoaded = true;
    },
    
    cacheElements() {
      // 缓存常用DOM元素，避免重复查询
      this.cachedElements = {
        scrollTarget: this.$refs.scrollTarget,
        container: this.$el.querySelector('.story-container'),
        images: this.$el.querySelectorAll('.story-image')
      };
    },
    
    async setupAnimations() {
      // 使用动画管理器设置滚动触发动画
      if (this.cachedElements.scrollTarget) {
        this.animations.scrollTrigger = globalAnimationManager.scrollTriggerScale(
          this.cachedElements.scrollTarget,
          0.8,
          1.2,
          { start: 'top 80%', end: 'bottom 20%' }
        );
      }
      
      // 设置闪烁动画
      this.animations.sparkle = globalAnimationManager.fadeIn(
        this.cachedElements.container,
        { 
          duration: ANIMATION_CONFIG.durations.slow,
          ease: ANIMATION_CONFIG.easings.smooth 
        }
      );
      
      // 设置Intersection Observer
      this.setupIntersectionObserver();
    },
    
    setupIntersectionObserver() {
      const callback = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.isInView = true;
            this.onElementInView(entry.target);
          } else {
            this.isInView = false;
          }
        });
      };
      
      const observer = globalAnimationManager.createIntersectionObserver(
        callback,
        { threshold: 0.3 }
      );
      
      if (this.cachedElements.scrollTarget) {
        observer.observe(this.cachedElements.scrollTarget);
      }
    },
    
    onElementInView(element) {
      // 优化的动画触发逻辑
      const config = globalAnimationManager.getOptimizedConfig({
        duration: ANIMATION_CONFIG.durations.normal,
        ease: ANIMATION_CONFIG.easings.bouncy
      });
      
      globalAnimationManager.scale(element, 0.8, 1.1, config);
    },
    
    setupReducedMotionMode() {
      // 为有动画敏感的用户提供静态体验
      console.log('用户偏好减少动画，启用静态模式');
      this.animationsReady = true;
    },
    
    fallbackMode() {
      // 降级处理，确保功能可用
      console.log('启用降级模式');
      this.assetsLoaded = true;
      this.animationsReady = true;
    },
    
    setupEventListeners() {
      // 使用节流的滚动监听器
      const throttledScrollHandler = throttle(this.handleOptimizedScroll, 16); // 60fps
      window.addEventListener('scroll', throttledScrollHandler, { passive: true });
      
      // 监听设备方向变化
      window.addEventListener('orientationchange', this.handleOrientationChange);
    },
    
    handleOptimizedScroll() {
      // 使用requestAnimationFrame优化滚动处理
      requestAnimationFrame(() => {
        if (!this.cachedElements.container) return;
        
        const rect = this.cachedElements.container.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        
        // 基于滚动进度更新样式
        this.updateScrollProgress(progress);
      });
    },
    
    updateScrollProgress(progress) {
      // 高效的样式更新
      if (this.cachedElements.images) {
        this.cachedElements.images.forEach((img, index) => {
          const delay = index * 0.1;
          const adjustedProgress = Math.max(0, progress - delay);
          
          // 使用transform而不是改变布局属性
          img.style.transform = `translateY(${(1 - adjustedProgress) * 50}px) scale(${0.8 + adjustedProgress * 0.2})`;
          img.style.opacity = adjustedProgress;
        });
      }
    },
    
    handleOrientationChange() {
      // 设备旋转时重新计算动画
      setTimeout(() => {
        if (this.animations.scrollTrigger) {
          // 刷新ScrollTrigger以适应新的布局
          this.animations.scrollTrigger.refresh();
        }
      }, 100);
    },
    
    onImageLoad() {
      // 图片加载完成的回调
      this.loadingProgress = Math.min(100, this.loadingProgress + 10);
    },
    
    cleanup() {
      // 组件卸载时的清理工作
      globalAnimationManager.cleanup();
      
      // 移除事件监听器
      window.removeEventListener('scroll', this.handleOptimizedScroll);
      window.removeEventListener('orientationchange', this.handleOrientationChange);
      
      // 清理动画引用
      Object.values(this.animations).forEach(animation => {
        if (animation && animation.kill) {
          animation.kill();
        }
      });
    }
  }
};
</script>

<style scoped>
.optimized-story {
  position: relative;
  min-height: 100vh;
}

.story-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.image-group {
  position: relative;
  width: 100%;
  height: 100%;
}

.story-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  /* 启用硬件加速 */
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.scroll-trigger {
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-image {
  width: 60%;
  height: auto;
  transition: transform 0.3s ease;
  will-change: transform;
}

.scroll-trigger.in-view .scroll-image {
  transform: scale(1.1);
}

/* 加载状态 */
.loading-indicator {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
}

.loading-text {
  text-align: center;
  font-size: 18px;
}

/* 骨架屏 */
.skeleton-loader {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.skeleton-image {
  width: 300px;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 8px;
}

.skeleton-text {
  width: 200px;
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Vue transition */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .story-image {
    max-width: 90%;
    max-height: 70%;
  }
  
  .scroll-image {
    width: 80%;
  }
}

/* 无障碍访问支持 */
@media (prefers-reduced-motion: reduce) {
  .story-image,
  .scroll-image {
    transition: none !important;
    animation: none !important;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: none !important;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .loading-indicator {
    background: black;
    border: 2px solid white;
  }
}
</style>