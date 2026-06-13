<template>
    <svg
        v-if="isPlaying"
        class="icon icon--pause"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 21"
    >
        <path
            id="PAUSE_ICON"
            data-name="PAUSE ICON"
            d="M9,28.5h6V7.5H9Zm12-21v21h6V7.5Z"
            transform="translate(-9 -7.5)"
        />
    </svg>

    <svg
        v-else
        class="icon icon--play"
        viewBox="0 0 31 36"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M29.1074 14.7969C30.2012 15.5 30.9043 16.75 30.9043 18C30.9043 19.3281 30.2012 20.5781 29.1074 21.2031L6.60742 34.9531C5.43555 35.6562 3.95117 35.7344 2.7793 35.0312C1.60742 34.4062 0.904297 33.1562 0.904297 31.75V4.25C0.904297 2.92188 1.60742 1.67188 2.7793 1.04688C3.95117 0.34375 5.43555 0.34375 6.60742 1.125L29.1074 14.7969Z"
        />
    </svg>
</template>

<script>
export default {
    props: {
        isPlaying: Boolean,
    },
};
</script>
