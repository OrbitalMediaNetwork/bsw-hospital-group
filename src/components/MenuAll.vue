<template>
    <div class="columns is-multiline is-2 is-variable">
        <div class="column is-12 pb-0">
            <p class="menu__item">Go back to section</p>
        </div>
        <div
            v-for="video in videos"
            :key="video.name"
            class="column is-half pb-0"
        >
            <button
                class="menu__item menu__btn is-flex is-flex-direction-row is-justify-content-center is-align-items-center w-100"
                @click="$emit('selectVideo', video)"
            >
                {{ video.name }}
                <icon-arrow-right class="ml-2"></icon-arrow-right>
            </button>
        </div>
        <div class="column is-half pb-0">
            <button
                class="menu__item menu__btn is-flex is-justify-content-center is-align-items-center w-100"
                @click="$emit('onClickBack')"
            >
                Back to menu
                <icon-arrow-right class="ml-2"></icon-arrow-right>
            </button>
        </div>
    </div>
</template>

<script>
import IconArrowRight from "./icons/IconArrowRight.vue";

export default {
    props: {
        videos: Array,
    },
    components: {
        IconArrowRight,
    },
};
</script>
