<template>
    <div class="columns is-mobile is-multiline is-2 is-variable">
        <div class="column is-12 pb-3">
            <p class="menu__item fw-600">
                {{ hasAnsweredIncorrect ? "See correct answer" : question }}
            </p>
        </div>

        <div class="flex-center w-full">
            <div
                v-for="answer in filteredAnswers"
                :key="answer.id"
                class="column py-3 menu__item--borders"
                :class="{ 'is-offset-one-quarter': hasAnsweredIncorrect }"
            >
                <button
                    class="menu__item menu__btn menu__item--with-text fw-600 is-flex is-flex-direction-row is-align-items-center"
                    @click="$emit('selectAnswer', answer)"
                >
                    {{ answer.name }}
                    <icon-arrow-right class="ml-2"></icon-arrow-right>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import IconArrowRight from "./icons/IconArrowRight.vue";

export default {
    props: {
        question: String,
        answers: Array,
        hasAnsweredIncorrect: Boolean,
    },

    components: {
        IconArrowRight,
    },

    computed: {
        filteredAnswers() {
            if (this.hasAnsweredIncorrect === true) {
                return this.answers.filter((item) => item.isCorrect);
            } else return this.answers;
        },
    },
};
</script>
