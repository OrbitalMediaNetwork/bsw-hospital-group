<template>
    <div class="menu-sections">
        <div class="is-flex is-justify-content-end mb-4">
            <button
                class="menu-sections__close-btn"
                @click="$emit('toggleSectionsMenu')"
            >
                <icon-cross class="mr-1"></icon-cross>
                Close
            </button>
        </div>
        <TransitionGroup name="section-item" tag="div">
            <div
                v-for="video in videoStore.currentExperience.videos"
                :key="video.name"
                class="menu-sections__row"
            >
                <button
                    @click="$emit('selectVideo', video)"
                    class="menu-sections__item"
                    :disabled="isCurrentVideo(video)"
                >
                    {{ video.name }}

                    <icon-waveform v-if="isCurrentVideo(video)"></icon-waveform>
                    <icon-arrow-right v-else></icon-arrow-right>
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import { mapStores } from "pinia";
import { useVideoStore } from "../stores/videos";
import IconArrowRight from "./icons/IconArrowRight.vue";
import IconWaveform from "./icons/IconWaveform.vue";
import IconCross from "./icons/IconCross.vue";

export default {
    components: {
        IconArrowRight,
        IconWaveform,
        IconCross,
    },

    computed: {
        ...mapStores(useVideoStore),
    },

    methods: {
        isCurrentVideo(video) {
            return this.videoStore.currentVideo === video ? true : false;
        },
    },
};
</script>

<style scoped>
.section-item-move {
    transition: transform 250ms ease;
}

.section-item-enter-active,
.section-item-leave-active {
    transition: all 200ms ease;
}

.section-item-enter-from,
.section-item-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>
