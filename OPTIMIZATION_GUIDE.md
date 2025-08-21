# 性能优化指南

## 实际优化建议和代码示例

### 1. 立即可实施的优化

#### a) 在现有组件中添加清理逻辑

在 `src/views/story3.vue` 的 `beforeUnmount` 钩子中添加：

```javascript
beforeUnmount() {
  // 清理GSAP动画
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // 清理事件监听器
  window.removeEventListener('keydown', this.handleSpacePress);
  window.removeEventListener('scroll', this.handleScrollToBottom);
  
  // 清理Intersection Observer
  if (this.observer9in) {
    this.observer9in.disconnect();
  }
}
```

#### b) 优化滚动事件处理

将现有的滚动监听器改为节流版本：

```javascript
// 在组件顶部导入节流函数
import { throttle } from '@/utils/AnimationManager.js';

// 在mounted中使用节流
mounted() {
  const throttledScrollHandler = throttle(this.handleScrollToBottom, 16);
  window.addEventListener('scroll', throttledScrollHandler, { passive: true });
}
```

#### c) 缓存DOM查询

在 `setupIntersectionObserver` 方法中：

```javascript
setupIntersectionObserver() {
  // 缓存元素查询
  const pageElement = this.$refs.pageElement;
  if (!pageElement) return;
  
  const imageElements = {
    image9: pageElement.querySelector(".image9"),
    image9Left: pageElement.querySelector(".image9-left"),
    image9Right: pageElement.querySelector(".image9-right")
  };
  
  const observerOptions = {
    rootMargin: "0px",
    threshold: 0.5,
  };
  
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && this.animationState === 0) {
        this.animationState = 1;
        if (imageElements.image9) {
          imageElements.image9.classList.add("animate__animated", "animate__fadeInLeft");
          // ... 其他逻辑
        }
      }
    });
  };
  
  this.observer9in = new IntersectionObserver(callback, observerOptions);
  this.observer9in.observe(pageElement);
}
```

### 2. 中期优化方案

#### a) 重构重复的ScrollTrigger代码

创建一个通用函数：

```javascript
// 在methods中添加
createImageScrollTrigger(selector, startScale = 0.8, endScale = 1.4) {
  ScrollTrigger.create({
    trigger: selector,
    start: 'top 100%',
    end: 'top 20%',
    scrub: true,
    animation: gsap.fromTo(selector, { scale: startScale }, { scale: endScale })
  });
  
  ScrollTrigger.create({
    trigger: selector,
    start: 'bottom 70%',
    end: 'bottom 20%',
    scrub: true,
    animation: gsap.fromTo(selector, { scale: endScale }, { scale: startScale })
  });
}

// 然后在imageTroll方法中简化代码
imageTroll() {
  const images = [
    '.image1', '.image2', '.image3Hen', '.image3Egg', 
    '.image4', '.image5', '.image6', '.image7', '.image8', 
    '.image10', '.image16'
  ];
  
  images.forEach(selector => {
    this.createImageScrollTrigger(selector);
  });
  
  // 特殊情况单独处理
  this.createImageScrollTrigger('.image3Hen', 1, 1.3);
  this.createImageScrollTrigger('.image3Egg', 1, 1.8);
}
```

#### b) 添加图片预加载

在组件加载前预加载关键图片：

```javascript
data() {
  return {
    // ... 现有数据
    assetsLoaded: false,
    criticalImages: [
      '../assets/story3/开场蛋.png',
      '../assets/story3/开场白.png',
      '../assets/story3/1.png',
      '../assets/story3/2.png'
    ]
  };
},

async mounted() {
  await this.preloadCriticalAssets();
  
  setTimeout(() => {
    this.imageTroll();
    this.sparkling();
    ScrollTrigger.refresh();
  }, 500);
  
  // ... 其他初始化代码
},

async preloadCriticalAssets() {
  try {
    await Promise.all(
      this.criticalImages.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      })
    );
    this.assetsLoaded = true;
  } catch (error) {
    console.warn('资源预加载失败，使用降级模式');
    this.assetsLoaded = true;
  }
}
```

### 3. 长期优化方案

#### a) 实现虚拟滚动

对于长列表或多页面故事，实现虚拟滚动：

```javascript
// 创建虚拟滚动组件
export default {
  name: 'VirtualStoryScroll',
  data() {
    return {
      visibleRange: { start: 0, end: 3 },
      itemHeight: window.innerHeight,
      scrollTop: 0
    };
  },
  
  computed: {
    visibleItems() {
      return this.storyPages.slice(this.visibleRange.start, this.visibleRange.end);
    }
  },
  
  methods: {
    updateVisibleRange() {
      const containerHeight = window.innerHeight;
      const start = Math.floor(this.scrollTop / this.itemHeight);
      const end = Math.min(start + Math.ceil(containerHeight / this.itemHeight) + 1, this.storyPages.length);
      
      this.visibleRange = { start, end };
    }
  }
};
```

#### b) 实现动画池

重用动画对象以减少内存使用：

```javascript
class AnimationPool {
  constructor() {
    this.availableAnimations = [];
    this.activeAnimations = new Set();
  }
  
  getAnimation() {
    if (this.availableAnimations.length > 0) {
      return this.availableAnimations.pop();
    }
    return gsap.timeline();
  }
  
  returnAnimation(animation) {
    animation.clear();
    this.activeAnimations.delete(animation);
    this.availableAnimations.push(animation);
  }
}
```

### 4. 用户体验优化

#### a) 添加加载状态

```vue
<template>
  <div class="story-container">
    <!-- 加载状态 -->
    <div v-if="!assetsLoaded" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>正在加载故事资源...</p>
    </div>
    
    <!-- 主要内容 -->
    <div v-else class="story-content">
      <!-- 现有的故事内容 -->
    </div>
  </div>
</template>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
```

#### b) 添加错误处理

```javascript
// 在组件中添加错误处理
data() {
  return {
    // ... 其他数据
    hasError: false,
    errorMessage: ''
  };
},

methods: {
  handleAnimationError(error) {
    console.error('动画错误:', error);
    this.hasError = true;
    this.errorMessage = '动画加载失败，请刷新页面重试';
    
    // 提供降级体验
    this.enableFallbackMode();
  },
  
  enableFallbackMode() {
    // 禁用复杂动画，提供基本的静态体验
    const elements = document.querySelectorAll('.animate__animated');
    elements.forEach(el => {
      el.classList.remove('animate__animated');
    });
  }
}
```

### 5. 性能监控

#### a) 添加性能指标收集

```javascript
// 在组件中添加性能监控
mounted() {
  this.startPerformanceMonitoring();
  // ... 其他初始化代码
},

methods: {
  startPerformanceMonitoring() {
    // 监控动画性能
    this.animationStartTime = performance.now();
    
    // 监控FPS
    this.fpsCounter = 0;
    this.lastFpsUpdate = performance.now();
    this.monitorFPS();
  },
  
  monitorFPS() {
    this.fpsCounter++;
    const now = performance.now();
    
    if (now - this.lastFpsUpdate >= 1000) {
      const currentFPS = this.fpsCounter;
      this.fpsCounter = 0;
      this.lastFpsUpdate = now;
      
      // 如果FPS过低，启用性能模式
      if (currentFPS < 30) {
        this.enablePerformanceMode();
      }
      
      console.log(`当前FPS: ${currentFPS}`);
    }
    
    requestAnimationFrame(() => this.monitorFPS());
  },
  
  enablePerformanceMode() {
    // 降低动画质量以提升性能
    gsap.globalTimeline.timeScale(0.5); // 减慢动画速度
    ScrollTrigger.refresh(); // 刷新触发器
    
    console.log('启用性能模式');
  }
}
```

### 6. CSS优化

#### a) 使用will-change属性

```css
.image-layer {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* 动画完成后移除will-change */
.animation-complete {
  will-change: auto;
}
```

#### b) 优化CSS选择器

```css
/* 避免复杂的选择器 */
/* 不好的做法 */
.story-container .page:nth-child(even) .image-layer:hover {
  /* ... */
}

/* 好的做法 */
.even-page-image:hover {
  /* ... */
}
```

### 7. 浏览器兼容性

#### a) 添加特性检测

```javascript
// 检测浏览器支持
const supportsIntersectionObserver = 'IntersectionObserver' in window;
const supportsRequestIdleCallback = 'requestIdleCallback' in window;

if (!supportsIntersectionObserver) {
  // 使用polyfill或降级到scroll事件
  console.warn('浏览器不支持Intersection Observer，使用降级方案');
}
```

这些优化建议按优先级排列，建议从立即可实施的优化开始，逐步实现中长期的优化方案。