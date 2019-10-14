<template lang="pug">
  .carousel
    .carousel-container
      transition-group(tag="ul" :name="motion.name")
        li.slide(
          v-for="(item, index) in slides"
          v-show="currentIndex === index"
          v-bind:key="`slide-${item.id}`"
        )
          img(v-bind:src="item.imageUrl")
    .carousel-controller
      button.button-prev(
        @click="triggerSlide('prev')"
        :disabled="isDisabled"
      ) &lt;
        span.a11y-hidden 이전 슬라이드
      span.title {{ renderTitle }}
      button.button-next(
        @click="triggerSlide('next')"
        :disabled="isDisabled"
      ) &gt;
        span.a11y-hidden 다음 슬라이드
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('carousel');

export default {
  name: 'Carousel',
  data() {
    return {
      // carousel
      currentIndex: 0,
      currentTitle: null,
      motion: {
        show: 'next',
        direction: null,
        name: null,
        duration: 1000,
      },

      // timer
      timer: null,
      timerDelay: 5000,

      // btn
      isClick: false,
    };
  },
  computed: {
    ...mapGetters(['slides']),
    currentSlide: {
      get() {
        return this.currentIndex;
      },
      /* eslint-disable consistent-return */
      set(value) {
        switch (value.show) {
          case 'next':
            if (this.currentIndex < this.totalSlides) {
              this.currentIndex = this.currentIndex + value.add;
            }
            if (this.currentIndex === this.totalSlides) {
              this.currentIndex = 0;
            }
            break;
          case 'prev':
            if (this.currentIndex === 0) {
              this.currentIndex = this.totalSlides - value.minus;
            }
            if (this.currentIndex > 0) {
              this.currentIndex = this.currentIndex - value.minus;
            }
            break;
          default:
            return this.currentIndex;
        }
      },
    },
    renderTitle() {
      let titleToRender;
      if (this.slides) {
        const initialTitle = this.slides[this.currentIndex].title;
        titleToRender = this.currentTitle !== null
          ? this.currentTitle
          : initialTitle;
      }
      return titleToRender;
    },
    totalSlides() {
      let total;
      if (this.slides) total = this.slides.length;
      return total;
    },
    isDisabled() {
      let disable = false;
      if (this.isClick) {
        disable = true;
      }
      return disable;
    },
  },
  methods: {
    triggerSlide(show) {
      this.isClick = true;
      this.slideCarousel(show);
      setTimeout(() => {
        this.isClick = false;
      }, this.motion.duration);
    },
    updateSlideTitle() {
      setTimeout(() => {
        this.currentTitle = this.slides[this.currentIndex].title;
      }, this.motion.duration);
    },
    animateSlide(direction) {
      const name = direction === 'left' ? 'slide-to-left' : 'slide-to-right';

      this.motion = {
        ...this.motion,
        direction,
        name,
      };
    },
    slideCarousel(show) {
      const direction = show === 'next' ? 'left' : 'right';

      if (show === 'next') {
        this.currentSlide = { add: 1, show };
      }
      if (show === 'prev') {
        this.currentSlide = { minus: 1, show };
      }

      // 슬라이딩 효과 켜기
      this.animateSlide(direction);

      // 슬라이딩이 끝나면 이미지 타이틀 업데이트
      this.updateSlideTitle();
    },
    startTimer() {
      this.timer = setTimeout(() => {
        this.slideCarousel('next');
        this.startTimer();
      }, this.timerDelay);
    },
  },
  mounted() {
    this.startTimer();
  },
  updated() {
    // 타이머 리셋
    if (this.isClick) {
      clearTimeout(this.timer);
      this.startTimer();
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style scope="scoped" lang="scss">
  .carousel {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #ececec;
    box-sizing: content-box;
    &-container {
      position: relative;
      width: 400px;
      height: 300px;
      overflow: hidden;
      li {
        position: absolute;
        top: 0;
        left: 0;
      }

      .slide-to-left-enter-active,
      .slide-to-left-leave-active,
      .slide-to-right-enter-active,
      .slide-to-right-leave-active {
        transition: transform 1s cubic-bezier(.53,.1,.55,.86);
      }

      .slide-to-left-enter {
        transform: translateX(100%);
      }
      .slide-to-left-leave-to {
        transform: translateX(-100%);
      }

      .slide-to-right-enter {
        transform: translateX(-100%);
      }
      .slide-to-right-leave-to {
        transform: translateX(100%);
      }
    }
    &-controller {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-top: 20px;
      .button-prev, .button-next {
        width: 40px;
        height: 40px;
        font-size: 16px;
        color: #fff;
        border-radius: 50%;
        background: #000;
      }
      .title {
        font-size: 18px;
      }
    }
  }

</style>
