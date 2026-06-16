<template>
    <div v-if="isValidExperience">
        <CustomVideoPlayer
            @onClickBack="backToHome"
            :showSectionsMenu="showSectionsMenu"
        />
    </div>
</template>

<script>
import CustomVideoPlayer from "../components/CustomVideoPlayer.vue";
import { useVideoStore } from "../stores/videos";
import { mapStores } from "pinia";

export default {
    name: "VideoView",

    components: {
        CustomVideoPlayer,
    },

    data() {
        return {
            showSectionsMenu: false,
            isValidExperience: false,
        };
    },

    computed: {
        ...mapStores(useVideoStore),

        validationBackRoute() {
            return this.videoStore.selectedClient
                ? { path: "/experiences", label: "Back to Experiences" }
                : { path: "/", label: "Back to Home" };
        },
    },

    methods: {
        clientPath() {
            return this.videoStore.selectedClient ? `/${this.videoStore.selectedClient.id}` : '';
        },

        backToHome() {
            const base = this.validationBackRoute.path;
            const clientPrefix = this.clientPath();
            this.$router.push(clientPrefix ? `${clientPrefix}${base}` : base);
        },

        redirectToHome(message) {
            this.$router.push({
                path: "/",
                query: {
                    message: message
                }
            });
        },

        validateExperience() {
            const slug = this.$route.params.slug;

            if (!this.videoStore.selectedClient) {
                this.redirectToHome("Please select the organisation first.");
                return false;
            }

            const experience = this.videoStore.experiences.find(
                (i) => i.slug === slug
            );

            if (!experience) {
                this.redirectToHome("That experience is not available for this organisation.");
                return false;
            }

            if (!experience.videos || experience.videos.length === 0) {
                this.redirectToHome("That experience is not available for this organisation.");
                return false;
            }

            this.videoStore.currentExperience = experience;
            this.videoStore.currentVideo = experience.videos[0];
            this.videoStore.videoIndex = 0;
            this.isValidExperience = true;
            return true;
        },
    },

    created() {
        this.validateExperience();
    },

    watch: {
        "$route.params.slug": {
            handler() {
                this.validateExperience();
            },
        },
    },
};
</script>
