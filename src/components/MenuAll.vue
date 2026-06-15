<template>
    <div class="columns is-multiline is-variable is-2">
        <div class="column is-12 pb-0">
            <Transition name="fade" mode="out-in">
                <p class="menu__item fw-600">Go back to section</p>
            </Transition>
        </div>
        <TransitionGroup name="section-stagger" tag="div" class="columns is-multiline is-variable is-2">
            <div
                v-for="video in videos"
                :key="video.name"
                class="column is-half pb-0"
            >
                <button
                    class="menu__item menu__btn is-flex is-flex-direction-row is-justify-content-center is-align-items-center w-100"
                    @click="$emit('selectVideo', video)"
                >
                    <span>{{ video.name }}</span>
                    <icon-arrow-right class="ml-2"></icon-arrow-right>
                </button>
            </div>
        </TransitionGroup>
        <div class="column is-half pb-0">
            <button
                class="menu__item menu__btn is-flex is-justify-content-center is-align-items-center w-100"
                @click="$emit('onClickBack')"
            >
                <span>Back to menu</span>
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

<style scoped>
.section-stagger-move {
    transition: transform 250ms ease;
}

.section-stagger-enter-active,
.section-stagger-leave-active {
    transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.section-stagger-enter-from,
.section-stagger-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}
</style>
