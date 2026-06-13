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
        <div
            v-for="video in this.videoStore.currentExperience.videos"
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
    </div>
</template>

<script>
import { mapStores } from "pinia";
import { useVideoStore } from "../stores/videos";
import IconArrowRight from "./icons/IconArrowRight.vue";
import IconWaveform from "./icons/IconWaveform.vue";
import IconCross from "./icons/IconCross.vue";

export default {
    props: {},

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
