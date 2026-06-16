<template>
    <div class="columns is-mobile is-multiline is-2 is-variable">
        <div class="column is-12 pb-0">
            <p class="menu__item">Which would you like to see?</p>
        </div>

        <div class="column is-12 pb-0">
            <div class="choices-list">
                <button
                    v-for="video in filteredChoices"
                    :key="video.id"
                    class="menu__item menu__btn choice-item"
                    @click="$emit('selectAnswer', video)"
                >
                    {{ video.name }}
                </button>
            </div>
        </div>

        <div v-if="hasAnsweredCorrect" class="column is-12 pb-0">
            <button class="menu__item menu__btn" @click="$emit('nextVideo')">
                Finishing Up
            </button>
        </div>
    </div>
</template>

<script>
import { mapStores } from "pinia";
import { useVideoStore } from "../stores/videos";

export default {
    props: {
        choices: Array,
        hasAnsweredCorrect: Boolean,
    },

    computed: {
        ...mapStores(useVideoStore),

        filteredChoices() {
            if (this.hasAnsweredCorrect === true) {
                return this.choices.filter((video) => {
                    return (
                        video.videoURL !== this.videoStore.currentVideo.videoURL
                    );
                });
            } else return this.choices;
        },
    },
};
</script>
