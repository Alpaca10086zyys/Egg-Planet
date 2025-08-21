// 动画管理工具类 - 优化示例
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 动画配置常量
export const ANIMATION_CONFIG = {
  durations: {
    fast: 300,
    normal: 1000,
    slow: 2000
  },
  easings: {
    bouncy: 'bounce.out',
    smooth: 'power2.inOut',
    elastic: 'elastic.out(1, 0.3)'
  },
  // 根据设备性能调整动画
  getOptimizedDuration(baseDuration) {
    const isLowEnd = this.isLowEndDevice();
    return isLowEnd ? baseDuration * 0.5 : baseDuration;
  },
  isLowEndDevice() {
    return navigator.hardwareConcurrency < 4 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
};

// 节流函数
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 动画管理类
export class AnimationManager {
  constructor() {
    this.animations = new Map();
    this.observers = new Set();
    this.scrollTriggers = new Set();
  }

  // 淡入动画
  fadeIn(element, options = {}) {
    const {
      duration = ANIMATION_CONFIG.durations.normal,
      ease = ANIMATION_CONFIG.easings.smooth,
      delay = 0
    } = options;

    const optimizedDuration = ANIMATION_CONFIG.getOptimizedDuration(duration);
    
    const animation = gsap.to(element, {
      opacity: 1,
      duration: optimizedDuration / 1000,
      ease,
      delay: delay / 1000
    });

    this.animations.set(element, animation);
    return animation;
  }

  // 缩放动画
  scale(element, fromScale, toScale, options = {}) {
    const {
      duration = ANIMATION_CONFIG.durations.normal,
      ease = ANIMATION_CONFIG.easings.smooth
    } = options;

    const animation = gsap.fromTo(element, 
      { scale: fromScale },
      { 
        scale: toScale, 
        duration: ANIMATION_CONFIG.getOptimizedDuration(duration) / 1000,
        ease 
      }
    );

    this.animations.set(element, animation);
    return animation;
  }

  // 滚动触发动画
  createScrollTrigger(trigger, animation, options = {}) {
    const {
      start = 'top 100%',
      end = 'top 20%',
      scrub = true
    } = options;

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start,
      end,
      scrub,
      animation
    });

    this.scrollTriggers.add(scrollTrigger);
    return scrollTrigger;
  }

  // 创建优化的滚动触发缩放动画
  scrollTriggerScale(trigger, fromScale, toScale, options = {}) {
    const animation = gsap.fromTo(trigger, 
      { scale: fromScale }, 
      { scale: toScale }
    );
    
    return this.createScrollTrigger(trigger, animation, options);
  }

  // 创建Intersection Observer
  createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(callback, { ...defaultOptions, ...options });
    this.observers.add(observer);
    return observer;
  }

  // 预加载图片
  async preloadImages(imageSources) {
    const promises = imageSources.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    try {
      await Promise.all(promises);
      return true;
    } catch (error) {
      console.warn('图片预加载失败:', error);
      return false;
    }
  }

  // 检测用户动画偏好
  respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // 获取优化的动画配置
  getOptimizedConfig(baseConfig) {
    if (this.respectsReducedMotion()) {
      return {
        ...baseConfig,
        duration: 0.01,
        ease: 'none'
      };
    }

    if (ANIMATION_CONFIG.isLowEndDevice()) {
      return {
        ...baseConfig,
        duration: baseConfig.duration * 0.5
      };
    }

    return baseConfig;
  }

  // 清理所有动画和观察者
  cleanup() {
    // 清理GSAP动画
    this.animations.forEach(animation => {
      if (animation && animation.kill) {
        animation.kill();
      }
    });
    this.animations.clear();

    // 清理ScrollTrigger
    this.scrollTriggers.forEach(trigger => {
      if (trigger && trigger.kill) {
        trigger.kill();
      }
    });
    this.scrollTriggers.clear();

    // 清理Intersection Observer
    this.observers.forEach(observer => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    });
    this.observers.clear();
  }
}

// 全局动画管理器实例
export const globalAnimationManager = new AnimationManager();

// 在页面卸载时自动清理
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    globalAnimationManager.cleanup();
  });
}