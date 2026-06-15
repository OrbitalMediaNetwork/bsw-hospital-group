<template>
    <div class="columns is-mobile is-multiline is-variable is-2">
        <div class="column is-12 pb-3">
            <Transition name="next-fade" mode="out-in">
                <p class="menu__item fw-600">Move to the next section</p>
            </Transition>
        </div>
        <div class="column is-full py-3 menu__item--borders">
            <Transition name="next-btn" mode="out-in">
                <button
                    class="menu__item menu__btn menu__item--with-text is-flex is-flex-direction-row is-align-items-center"
                    @click="$emit('selectVideo', nextVideo)"
                >
                    <span>{{ nextVideo.name }}</span>
                    <icon-arrow-right class="ml-2"></icon-arrow-right>
                </button>
            </Transition>
        </div>
    </div>
</template>

<script>
import IconArrowRight from "./icons/IconArrowRight.vue";
export default {
    props: {
        nextVideo: Object,
    },
    components: {
        IconArrowRight,
    },
};
</script>

<style scoped>
.next-fade-enter-active,
.next-fade-leave-active {
    transition: all 250ms ease;
}

.next-fade-enter-from,
.next-fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}

.next-btn-enter-active,
.next-btn-leave-active {
    transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.next-btn-enter-from,
.next-btn-leave-to {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
}
</style>
