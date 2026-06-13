<template>
    <div class="columns is-mobile is-multiline is-2 is-variable">
        <div class="column is-12 pb-3">
            <p class="menu__item fw-600">Move to the next section</p>
        </div>
        <div class="column is-full py-3 menu__item--borders">
            <button
                class="menu__item menu__btn menu__item--with-text is-flex is-flex-direction-row is-align-content-center"
                @click="$emit('selectVideo', nextVideo)"
            >
                {{ nextVideo.name }}
                <icon-arrow-right class="ml-1"></icon-arrow-right>
            </button>
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
