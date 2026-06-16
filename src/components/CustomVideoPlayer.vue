<template>
    <video-player
        :src="videoStore.currentVideo.videoURL"
        :aspectRatio="'16:9'"
        autoplay
        :playsinline="true"
        :volume="volume"
        :tracks="this.videoStore.currentVideo.tracks"
        @mounted="handleMounted"
        @ended="handleEnded"
    >
        <template v-slot="{ player, state }">
            <RouterLink
                class="button is-outlined mb-5 mt-2 button__home test"
                to="/experiences"
            >
                <icon-home></icon-home>
            </RouterLink>

            <div class="popups">
                <a
                    v-if="showPopupMenu"
                    v-for="item in this.videoStore.popup"
                    class="button is-outlined mb-5 mt-2 video_popup"
                    :href="'//' + item.url"
                    target="_blank"
                >
                    {{ item.popup }}
                </a>
            </div>

            <div class="menu">
                <template v-if="showVideosMenu">
                    <menu-answers
                        v-if="isQuestion && !hasAnsweredCorrect"
                        :question="
                            videoStore.currentExperience.videos[
                                videoStore.videoIndex
                            ].question
                        "
                        :answers="
                            videoStore.currentExperience.videos[
                                videoStore.videoIndex
                            ].answers
                        "
                        :hasAnsweredIncorrect="hasAnsweredIncorrect"
                        @selectAnswer="selectAnswer"
                    ></menu-answers>

                    <menu-quiz
                        v-else-if="isQuiz && !hasAnsweredCorrect"
                        :question="
                            videoStore.currentExperience.videos[
                                videoStore.videoIndex
                            ].question
                        "
                        :answers="
                            videoStore.currentExperience.videos[
                                videoStore.videoIndex
                            ].answers
                        "
                        :hasAnsweredIncorrect="hasAnsweredIncorrect"
                        @playNextVideo="playNextVideo"
                    ></menu-quiz>

                    <menu-choices
                        v-else-if="isChoices"
                        :choices="
                            videoStore.currentExperience.videos[
                                videoStore.videoIndex
                            ].choices
                        "
                        :hasAnsweredCorrect="hasAnsweredCorrect"
                        @selectAnswer="selectAnswer"
                        @nextVideo="
                            selectVideo(
                                videoStore.currentExperience.videos[
                                    videoStore.videoIndex + 1
                                ]
                            )
                        "
                    ></menu-choices>

                    <menu-all
                        v-else-if="isFinal"
                        :videos="filteredVideos"
                        @selectVideo="selectVideo"
                        @onClickBack="$emit('onClickBack')"
                    ></menu-all>

                    <menu-videos
                        v-else
                        :nextVideo="
                            videoStore.currentExperience.videos[
                                videoStore.videoIndex + 1
                            ]
                        "
                        @selectVideo="selectVideo"
                        @onClickBack="$emit('onClickBack')"
                    ></menu-videos>
                </template>

                <template v-else>
                    <Transition name="menu">
                        <menu-controls
                            v-if="isMenuShown"
                            @skipBack="skipBack"
                            @togglePause="togglePause"
                            @skipForward="skipForward"
                            @toggleFullscreen="toggleFullscreen"
                            @toggleDarkMode="toggleDarkMode"
                            @toggleMenu="toggleMenu"
                            @onClickBack="$emit('onClickBack')"
                            @selectLanguage="setTracksLanguage"
                            @disableSubtitles="disableSubtitles"
                            :isPlaying="state.playing"
                            :isDarkMode="videoStore.isDarkMode"
                            :showMultiViewsMenu="showMultiViewsMenu"
                            v-model:volume="volume"
                            :tracks="this.videoStore.currentVideo.tracks"
                            :currentTime="state.currentTime"
                            :duration="state.duration"
                            @selectVideo="(video) => selectVideo(video)"
                        ></menu-controls>
                    </Transition>

                    <Transition name="toggle">
                        <menu-toggle
                            v-if="!isMenuShown"
                            @toggleMenu="toggleMenu"
                        ></menu-toggle>
                    </Transition>
                </template>
            </div>
        </template>
    </video-player>
</template>

<script>
import { mapStores } from "pinia";
import { useVideoStore } from "../stores/videos";

import MenuControls from "./MenuControls.vue";
import MenuVideos from "./MenuVideos.vue";
import MenuToggle from "./MenuToggle.vue";
import MenuAnswers from "./MenuAnswers.vue";
import MenuChoices from "./MenuChoices.vue";
import MenuAll from "./MenuAll.vue";
import MenuQuiz from "./MenuQuiz.vue";
import IconHome from "../components/icons/IconHome.vue";

export default {
    components: {
        MenuControls,
        MenuVideos,
        MenuToggle,
        MenuAnswers,
        MenuChoices,
        MenuAll,
        MenuQuiz,
        IconHome,
    },

    props: {
        showSectionsMenu: {
            type: Boolean,
        },
    },

    data() {
        return {
            volume: "0.8",
            state: null,
            player: null,
            isEnded: false,
            isMenuShown: true,
            hasAnsweredCorrect: false,
            hasAnsweredIncorrect: false,
        };
    },

    computed: {
        ...mapStores(useVideoStore),

        filteredVideos() {
            // Remove current video from button options
            return this.videoStore.currentExperience.videos.filter((video) => {
                return video.videoURL !== this.videoStore.currentVideo.videoURL;
            });
        },

        showVideosMenu() {
            if (
                !this.videoStore.currentVideo.autoPlayNext &&
                (this.state.currentTime >=
                    this.videoStore.currentVideo.menuTime ||
                    this.isEnded)
            ) {
                return true;
            } else return false;
        },

        showPopupMenu() {
            try {
                for (
                    let i = 0;
                    i < this.videoStore.currentVideo.popupKeyframes.length;
                    i++
                ) {
                    let item = this.videoStore.currentVideo.popupKeyframes[i];

                    if (
                        this.state.currentTime > item.startTime &&
                        this.state.currentTime < item.endTime
                    ) {
                        this.videoStore.popup = item.data;
                        return true;
                        break;
                    }
                }
            } catch (error) {
                return false;
            }

            return false;
        },

        showAnswersMenu() {
            return this.isEnded && "answers" in this.videoStore.currentVideo;
        },

        showChoicesMenu() {
            return this.isEnded && "choices" in this.videoStore.currentVideo;
        },

        isQuestion() {
            return (
                this.videoStore.currentExperience.videos[
                    this.videoStore.videoIndex
                ].type === "question"
            );
        },

        isQuiz() {
            return (
                this.videoStore.currentExperience.videos[
                    this.videoStore.videoIndex
                ].type === "quiz"
            );
        },

        isChoices() {
            return (
                this.videoStore.currentExperience.videos[
                    this.videoStore.videoIndex
                ].type === "choices"
            );
        },

        isFinal() {
            return (
                this.videoStore.currentExperience.videos[
                    this.videoStore.videoIndex
                ].type === "final" ||
                this.videoStore.videoIndex ===
                    this.videoStore.currentExperience.videos.length - 1
            );
        },
    },

    methods: {
        handleMounted(payload) {
            this.state = payload.state;
            this.player = payload.player;
        },

        handleEnded() {
            this.isEnded = true;

            if (this.isFinal) {
                this.$router.push({ name: "completed", params: { slug: this.$route.params.slug } });
            } else if (this.videoStore.currentVideo.autoPlayNext) {
                this.selectVideo(
                    this.videoStore.currentExperience.videos[
                        this.videoStore.videoIndex + 1
                    ]
                );
            }
        },

        togglePause() {
            this.state.playing ? this.player.pause() : this.player.play();
        },

        skipForward() {
            this.player.currentTime(this.player.currentTime() + 10);
        },

        skipBack() {
            this.player.currentTime(this.player.currentTime() - 10);
        },

        setTracksLanguage(index) {
            this.disableSubtitles();
            this.videoStore.currentVideo.tracks[index].mode = "showing";

            this.videoStore.currentExperience.videos.forEach((video) => {
                if ("tracks" in video) {
                    video.tracks[index].mode = "showing";
                }

                if ("answers" in video) {
                    video.answers.forEach((answer) => {
                        if ("tracks" in answer) {
                            answer.tracks[index].mode = "showing";
                        }
                    });
                }
                if ("choices" in video) {
                    video.choices.forEach((choice) => {
                        if ("tracks" in choice) {
                            choice.tracks[index].mode = "showing";
                        }
                    });
                }
            });
        },

        disableSubtitles() {
            this.changeTracksModeToDisabled(this.videoStore.currentVideo);

            this.videoStore.currentExperience.videos.forEach((video) => {
                this.changeTracksModeToDisabled(video);

                if ("answers" in video) {
                    video.answers.forEach((answer) => {
                        this.changeTracksModeToDisabled(answer);
                    });
                }
                if ("choices" in video) {
                    video.choices.forEach((choice) => {
                        this.changeTracksModeToDisabled(choice);
                    });
                }
            });
        },

        changeTracksModeToDisabled(video) {
            if ("tracks" in video) {
                video.tracks.forEach((track) => {
                    track.mode = "disabled";
                });
            }
        },

        toggleDarkMode() {
            this.videoStore.isDarkMode = !this.videoStore.isDarkMode;

            if (this.videoStore.isDarkMode) {
                localStorage.setItem("isDarkMode", true);
            } else {
                localStorage.setItem("isDarkMode", false);
            }
        },

        toggleMenu() {
            this.isMenuShown = !this.isMenuShown;
        },

        toggleFullscreen() {
            this.state.isFullscreen
                ? this.player.exitFullscreen()
                : this.player.requestFullscreen();
        },

        selectVideo(item) {
            this.videoStore.currentVideo = item;
            this.videoStore.videoIndex =
                this.videoStore.currentExperience.videos.indexOf(item);
            this.isEnded = false;
            this.hasAnsweredCorrect = false;
            this.hasAnsweredIncorrect = false;
        },

        playNextVideo() {
            const nextVideoIndex = this.videoStore.videoIndex + 1;
            console.log(nextVideoIndex);
            const nextVideo =
                this.videoStore.currentExperience.videos[nextVideoIndex];
            console.log(nextVideo);

            this.selectVideo(nextVideo);
        },

        selectView(item) {
            this.videoStore.currentVideo = item;
            this.isEnded = false;
        },

        selectAnswer(answer) {
            this.videoStore.currentVideo = answer;
            this.isEnded = false;
            if (answer.isCorrect) {
                this.hasAnsweredCorrect = true;
            } else {
                this.hasAnsweredIncorrect = true;
            }
        },
    },
};
</script>
