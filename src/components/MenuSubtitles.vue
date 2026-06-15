<template>
    <div class="menu-sections">
        <div class="is-flex is-justify-content-end mb-4">
            <button
                class="menu-sections__close-btn"
                @click="$emit('toggleSubsMenu')"
            >
                <icon-cross class="mr-1"></icon-cross>
                Close
            </button>
        </div>

        <TransitionGroup name="subtitle-item" tag="div">
            <div class="menu-sections__row">
                <button
                    @click="$emit('disableSubtitles')"
                    class="menu-sections__item"
                    :disabled="isDisabled"
                >
                    Off
                    <icon-check v-if="isDisabled"></icon-check>
                </button>
            </div>

            <div
                v-for="(language, index) of tracks"
                :key="language.label"
                class="menu-sections__row"
            >
                <button
                    @click="$emit('selectLanguage', index)"
                    class="menu-sections__item"
                    :disabled="isShowing(index)"
                >
                    {{ language.label }}

                    <icon-check v-if="isShowing(index)"></icon-check>
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import { mapStores } from "pinia";
import { useVideoStore } from "../stores/videos";
import IconCross from "./icons/IconCross.vue";
import IconCheck from "./icons/IconCheck.vue";

export default {
    props: {
        tracks: {
            type: Array,
        },
    },

    components: {
        IconCheck,
        IconCross,
    },

    computed: {
        ...mapStores(useVideoStore),

        isDisabled() {
            const tracks = this.videoStore.currentVideo.tracks;
            return !tracks.some((track) => track.mode === "showing");
        },
    },

    methods: {
        isShowing(index) {
            return (
                this.videoStore.currentVideo.tracks[index].mode === "showing"
            );
        },
    },
};
</script>

<style scoped>
.subtitle-item-move {
    transition: transform 250ms ease;
}

.subtitle-item-enter-active,
.subtitle-item-leave-active {
    transition: all 200ms ease;
}

.subtitle-item-enter-from,
.subtitle-item-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>
