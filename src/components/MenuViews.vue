<template>
    <div class="columns is-mobile is-variable is-2">
        <div class="column" v-for="item in views" :key="item.id">
            <button
                class="menu__item menu__btn"
                @click="$emit('selectView', item)"
            >
                {{ item.name }}
            </button>
        </div>
        <div class="column">
            <button class="menu__item menu__btn" @click="$emit('onClickBack')">
                Menu
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        views: Array,
    },
};
</script>
