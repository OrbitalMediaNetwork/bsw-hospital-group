<template>
    <div class="columns is-mobile is-multiline is-2 is-variable">
        <div class="column is-12 pb-3">
            <p class="menu__item fw-600">
                {{ hasAnsweredIncorrect ? "Incorrect, try again" : question }}
            </p>
        </div>
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
    </div>
</template>

<script>
export default {
    props: {
        question: String,
        answers: Array,
        hasAnsweredIncorrect: Boolean,
    },

    data() {
        return {};
    },

    //   computed: {
    //     filteredAnswers() {
    //       if (this.hasAnsweredIncorrect === true) {
    //         return this.answers.filter((item) => item.isCorrect);
    //       } else return this.answers;
    //     },
    //   },

    methods: {
        checkAnswer(answer) {
            if (answer.isCorrect) {
                // this.$emit("selectAnswer", answer);

				setTimeout(() => this.$emit("playNextVideo"), 1000);
            }
            answer.hasSelected = true;
        },
    },
};
</script>
