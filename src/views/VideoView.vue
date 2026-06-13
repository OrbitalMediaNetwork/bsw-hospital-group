<template>
    <CustomVideoPlayer
        @onClickBack="backToHome"
        :showSectionsMenu="showSectionsMenu"
    />
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
        };
    },

    computed: {
        ...mapStores(useVideoStore),
    },

    methods: {
        backToHome() {
            this.$router.push("/experiences");
        },
    },

    created() {
        const slug = this.$route.params.slug;
        this.videoStore.currentExperience = this.videoStore.experiences.find(
            (i) => i.slug === slug
        );
        this.videoStore.currentVideo =
            this.videoStore.currentExperience.videos[0];
        this.videoStore.videoIndex = 0;
    },
};
</script>
