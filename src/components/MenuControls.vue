<template>
    <div class="menu-controls columns is-multiline">
        <div class="is-flex is-align-items-center is-justify-content-center column p-0 is-full is-half-desktop">
            <button
                class="menu__item menu__btn menu__item--playback"
                @click="$emit('skipBack')"
            >
                <icon-back></icon-back>
            </button>

            <button
                class="menu__item menu__btn menu__item--playback"
                @click="$emit('togglePause')"
            >
                <icon-play-pause :isPlaying="isPlaying"></icon-play-pause>
            </button>

            <button
                class="menu__item menu__btn menu__item--playback"
                @click="$emit('skipForward')"
            >
                <icon-forward></icon-forward>
            </button>

            <div class="menu__item menu__item--playback is-flex is-align-items-center is-justify-content-center">
                <icon-volume class="mr-2"></icon-volume>
                <input
                    class="menu__volume"
                    :value="volume"
                    @change="changeVolume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                />
            </div>

            <div class="menu__item menu__item--playback">
                {{ formattedCurrentTime }} / {{ formattedDuration }}
            </div>
        </div>

        <div class="is-flex is-align-items-center is-justify-content-center ml-auto column p-0 is-full is-half-desktop">
            <button
                class="menu__item menu__btn menu__item--with-text"
                @click="$emit('toggleDarkMode')"
            >
                <icon-dark-mode></icon-dark-mode>
                <span>{{ isDarkMode ? "Light Mode" : "Dark Mode" }}</span>
            </button>

            <button
                class="menu__item menu__btn menu__item--with-text"
                :class="{ 'menu__item--active': showSubtitleMenu }"
                @click="toggleSubsMenu"
            >
                <icon-subtitles></icon-subtitles>
                <span>Captions</span>
            </button>

            <Transition name="dropdown">
                <menu-subtitles
                    v-if="showSubtitleMenu"
                    @toggleSubsMenu="toggleSubsMenu"
                    @disableSubtitles="disableSubtitles"
                    @selectLanguage="(index) => selectLanguage(index)"
                    :tracks="tracks"
                ></menu-subtitles>
            </Transition>

            <button
                class="menu__item menu__btn menu__item--with-text"
                :class="{ 'menu__item--active': showSectionsMenu }"
                @click="toggleSectionsMenu"
            >
                <icon-sections></icon-sections>
                <span>Sections</span>
            </button>

            <Transition name="dropdown">
                <menu-sections
                    v-if="showSectionsMenu"
                    @selectVideo="(video) => selectSectionsVideo(video)"
                    @toggleSectionsMenu="toggleSectionsMenu"
                ></menu-sections>
            </Transition>

            <button
                class="menu__item menu__btn menu__item--with-text"
                @click="$emit('toggleFullscreen')"
            >
                <icon-fullscreen></icon-fullscreen>
                <span>Fullscreen</span>
            </button>
        </div>
    </div>
</template>

<script>
import IconPlayPause from "./icons/IconPlayPause.vue";
import IconVolume from "./icons/IconVolume.vue";
import IconForward from "./icons/IconForward.vue";
import IconBack from "./icons/IconBack.vue";
import IconClose from "./icons/IconClose.vue";
import IconFullscreen from "./icons/IconFullscreen.vue";
import IconSubtitles from "./icons/IconSubtitles.vue";
import IconSections from "./icons/IconSections.vue";
import IconDarkMode from "./icons/IconDarkMode.vue";
import { format } from "date-fns";
import MenuSections from "./MenuSections.vue";
import MenuSubtitles from "./MenuSubtitles.vue";
import { mapStores } from "pinia";
import { useVideoStore } from "../stores/videos";

export default {
    props: {
        isPlaying: {
            type: Boolean,
        },
        showMultiViewsMenu: {
            type: Boolean,
        },
        volume: {
            type: Number,
        },
        isDarkMode: {
            type: Boolean,
        },
        tracks: {
            type: Array,
        },
        currentTime: {
            type: Number,
            required: true,
            default: 0,
        },
        duration: {
            type: Number,
            required: true,
            default: 0,
        },
    },

    components: {
        IconPlayPause,
        IconVolume,
        IconForward,
        IconBack,
        IconClose,
        IconFullscreen,
        IconSubtitles,
        IconSections,
        IconDarkMode,
        MenuSections,
        MenuSubtitles,
    },

    data() {
        return {
            showSubtitleMenu: false,
            showSectionsMenu: false,
        };
    },

    computed: {
        ...mapStores(useVideoStore),

        formattedCurrentTime() {
            return this.formatTime(this.currentTime);
        },
        formattedDuration() {
            return this.formatTime(this.duration);
        },
    },

    methods: {
        selectSectionsVideo(video) {
            this.toggleSectionsMenu();
            this.$emit("selectVideo", video);
        },

        changeVolume(e) {
            this.$emit("update:volume", e.target.value);
        },

        toggleSubsMenu() {
            if (this.videoStore.currentVideo.tracks === undefined) {
                return;
            }
            this.showSubtitleMenu = !this.showSubtitleMenu;
            this.showSectionsMenu = false;
        },

        toggleSectionsMenu() {
            this.showSectionsMenu = !this.showSectionsMenu;
            this.showSubtitleMenu = false;
        },

        selectLanguage(index) {
            this.$emit("selectLanguage", index);
        },

        disableSubtitles() {
            this.$emit("disableSubtitles");
        },

        formatTime(seconds) {
            if (isNaN(seconds) || seconds < 0) {
                return "00:00";
            }
            const date = new Date(0);
            date.setSeconds(seconds);
            return format(date, "mm:ss");
        },
    },
};
</script>
