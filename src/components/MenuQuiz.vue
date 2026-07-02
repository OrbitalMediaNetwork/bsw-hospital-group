<template>
    <div class="columns is-mobile is-multiline is-variable is-2">
        <div class="column is-12 pb-3">
            <Transition name="quiz-fade" mode="out-in">
                <p class="menu__item fw-600">
                    {{ hasAnsweredIncorrect ? "Incorrect, try again" : question }}
                </p>
            </Transition>
        </div>
        <TransitionGroup name="quiz-stagger" tag="div" class="columns is-mobile is-multiline is-variable is-2 w-full">
            <div
                v-for="answer in answers"
                :key="answer.id"
                class="column is-full py-3 menu__item--borders"
                :class="{ 'is-offset-one-quarter': hasAnsweredIncorrect }"
            >
                <button
                    class="menu__item menu__btn menu__item--with-text"
                    :class="{ 'bg-red': answer.hasSelected && !answer.isCorrect, 'bg-green': answer.hasSelected && answer.isCorrect}"
                    @click="checkAnswer(answer)"
                >
                    {{ answer.name }}
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
export default {
    props: {
        question: String,
        answers: Array,
        hasAnsweredIncorrect: Boolean,
    },

    methods: {
        checkAnswer(answer) {
            answer.hasSelected = true;
            if (answer.videoURL) {
                this.$emit("selectAnswer", answer);
            } else if (answer.isCorrect) {
                setTimeout(() => this.$emit("playNextVideo"), 800);
            }
        },
    },
};
</script>

<style scoped>
.quiz-fade-enter-active,
.quiz-fade-leave-active {
    transition: all 250ms ease;
}

.quiz-fade-enter-from,
.quiz-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.quiz-stagger-move {
    transition: transform 250ms ease;
}

.quiz-stagger-enter-active,
.quiz-stagger-leave-active {
    transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.quiz-stagger-enter-from,
.quiz-stagger-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}
</style>
