<template>
  <div class="lg:w-3/4 w-full">
    <div class="text-center text-xl">
      <p class="text-4xl mb-5">RESULT SUMMARY</p>
      <div class="lg:flex block">
        <p>
          Country: <b>{{ candidateDetails.country }} </b>
        </p>
        <p class="lg:pl-5 pl-0">
          Phone Number: <b>{{ candidateDetails.phoneNo }}</b>
        </p>
      </div>
      <p>
        Total number of questions answered: <b>{{ attemptedQuestions.length }}</b>
      </p>
      <p>
        Total number of correct answers: <b>{{ correctAnswers }}</b>
      </p>
      <p>
        Total number of incorrect answers: <b>{{ wrong }} </b>
      </p>
      <p class="font-bold">
        Total point accumulated: <b>{{ point }}.00</b>
      </p>
    </div>

    <!--  -->
    <div class="flex justify-center mt-5">
      <button
        @click="$router.go(-1)"
        class="bg-green-600 text-white font-semibold text-xl shadow-md hover:bg-green-500 py-2 px-10 rounded-md mt-8"
      >
        Start Over
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      candidateDetails: {},
      attemptedQuestions: [],
      totalQuestions: "",
      point: 0,
      correctAnswers: 0,
    };
  },

  computed: {
    wrong() {
      return this.attemptedQuestions.length - this.correctAnswers;
    },
  },

  methods: {
    calculateAnswer() {
      for (var i = 0; i < this.attemptedQuestions.length; i++) {
        for (var a = 0; a < this.attemptedQuestions[i].question.choices.length; a++) {
          if (this.attemptedQuestions[i].question.choices[a].is_correct_choice === 1) {
            let correctID = this.attemptedQuestions[i].question.choices[a].id;
            let answerID = this.attemptedQuestions[i].answer;
            if (correctID == answerID) {
              this.point += 5;
              this.correctAnswers += 1;
            }
          }
        }
      }
    },
  },

  mounted() {
    this.candidateDetails = this.$store.state.candidateDetails;
    this.attemptedQuestions = this.$store.state.attemptedQuestions;
    this.totalQuestions = this.$store.state.totalQuestions;
    this.calculateAnswer();
  },
};
</script>

<style></style>
