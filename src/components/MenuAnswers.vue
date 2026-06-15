<template>
    <div class="columns is-mobile is-multiline is-variable is-2">
        <div class="column is-12 pb-3">
            <Transition name="answer-fade" mode="out-in">
                <p class="menu__item fw-600">
                    {{ hasAnsweredIncorrect ? "See correct answer" : question }}
                </p>
            </Transition>
        </div>

        <div class="flex-center w-full">
            <TransitionGroup name="answer-stagger" tag="div" class="columns is-mobile is-multiline is-variable is-2 w-full">
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
                        <span>{{ answer.name }}</span>
                        <icon-arrow-right class="ml-2"></icon-arrow-right>
                    </button>
                </div>
            </TransitionGroup>
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

<style scoped>
.answer-fade-enter-active,
.answer-fade-leave-active {
    transition: all 250ms ease;
}

.answer-fade-enter-from,
.answer-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.answer-stagger-move {
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.answer-stagger-enter-active,
.answer-stagger-leave-active {
    transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.answer-stagger-enter-from,
.answer-stagger-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}
</style>
