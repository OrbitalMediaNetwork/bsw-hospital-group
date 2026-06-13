<template>
    <button @click="$emit('toggleMenu')" class="menu__item menu__btn menu__btn--toggle">
        <icon-menu></icon-menu>
    </button>
</template>




<script>
import IconMenu from './icons/IconMenu.vue'

export default {
    components: {
        IconMenu,
    }
}
</script>
