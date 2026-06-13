<template>
  <div class="columns is-mobile">
    <div
      v-for="item in videoStore.experiences"
      :key="item.title"
      class="column mx-auto"
      style="max-width: 600px"
    >
      <button
        @click.prevent="handleSelectExperience(item)"
        class="experience__button"
      >
        <img class="experience__img" :src="item.thumbURL" alt="" />
        <span>{{ item.title }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useVideoStore } from "../stores/videos";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default {
  name: "ExperienceMenu",

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      swiperBreakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    };
  },

  computed: {
    ...mapStores(useVideoStore),
  },

  methods: {
    handleSelectExperience(exp) {
      this.$router.push({ name: "experience", params: { slug: exp.slug } });
    },
  },

  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
};
</script>
