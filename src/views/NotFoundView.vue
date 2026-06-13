<template>
    <h1 class="home__title">404 - page not found</h1>

    <div class="has-text-centered">

        <RouterLink class="button is-outlined is-primary mb-5 mt-2 mx-auto" to="/">
            Menu
        </RouterLink>
    </div>
</template>




<script>
import ExperienceMenu from '../components/ExperienceMenu.vue'
import { useVideoStore } from '../stores/videos'
import { mapStores } from 'pinia'

export default {
    name: 'HomeView',

    components: { ExperienceMenu, },

    computed: {
        ...mapStores(useVideoStore),

        stemImgSrc() {
            if (this.videoStore.isDarkMode) {
                return "/images/stem-bg-dark@2x-cropped.png";
            } else {
                return "/images/stem-bg@2x-cropped.png";
            }
        }
    },
}
</script>




<style scoped>
.home__title {
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0.5rem 1rem;
    border: solid lightgrey 2px;
    max-width: 380px;
    margin: 4rem auto;
    text-align: center;
}

.stem-img {
    margin-top: 2rem;
}
</style>