<template>
  <div class="lg:w-3/4 w-full">
    <!-- loading -->
    <div v-if="loading" class="mt-12 text-center text-5xl text-green-500">
      <i class="animate-spin fad fa-spinner"></i>
    </div>
    <div v-if="!loading">
      <div class="text-center lg:flex justify-between text-lg mb-5">
        <p class="">You have {{ questions.length }} Total Questions.</p>
        <p>Time Remaining: {{ timerCounter }} seconds</p>
      </div>
      <div class="text-center">
        <p class="text-2xl font-semibold pb-2">Question {{ questionCount }}</p>
        <p class="text-xl font-semibold pb-8">{{ questionPerView.question.question }}</p>
        <div class="space-y-2">
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
            <div
              v-for="option in questionPerView.question.choices"
              :key="option.index"
              class="bg-green-300 p-2 rounded-md"
            >
              <div class="flex items-center">
                <label class="inline-flex items-center">
                  <input
                    v-model="questionPerView.answer"
                    :value="option.id"
                    type="radio"
                    class="h-5 w-5"
                  />
                  <span class="pl-2"> {{ option.choice }} </span>
                </label>
              </div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <button
          :disabled="questionCount == 1"
          @click="prevQuestion"
          class="bg-green-600 text-white font-semibold text-xl shadow-md hover:bg-green-500 py-2 px-10 rounded-md mt-8"
        >
          Back
        </button>
        <button
          @click="nextQuestion"
          class="bg-green-600 text-white font-semibold text-xl shadow-md hover:bg-green-500 py-2 px-10 rounded-md mt-8"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: true,
      answer: "",
      questions: [],
      questionPerView: {},
      attemptedQuestions: [],
      questionCount: 0,
      timerCounter: 120,
      interval: null,
      timeout: null,
    };
  },

  methods: {
    prevQuestion() {
      let length = this.attemptedQuestions.length;
      if (this.questionCount == length + 1) {
        this.attemptedQuestions.push(this.questionPerView);
      }

      this.questionPerView = this.attemptedQuestions[this.questionCount - 2];
      this.questionCount--;
    },
    nextQuestion() {
      let length = this.attemptedQuestions.length;

      if (this.questionCount == length + 1) {
        this.attemptedQuestions.push(this.questionPerView);
        this.questionPerViewMethod();
      } else if (this.questionCount == length) {
        this.attemptedQuestions.push(this.questionPerView);
        this.questionPerViewMethod();
      } else {
        this.attemptedQuestions[this.questionCount - 1] = this.questionPerView;
        this.questionPerView = this.attemptedQuestions[this.questionCount];
        this.questionCount++;
      }
    },
    questionPerViewMethod() {
      let length = this.questions.length;
      let random = Math.floor(Math.random() * length);
      if (this.questionCount > 0) {
        if (this.questionCount - 1 == random) {
          random = Math.floor(Math.random() * length);
        }
      }
      this.questionPerView = { question: this.questions[random], answer: "" };
      this.qCount();
    },
    qCount() {
      if (this.questionCount == this.questions.length) {
        this.$store.commit("setAttemptedQuestions", this.attemptedQuestions);
        this.$router.push({ name: "Summary" });
      } else return this.questionCount++;
    },
    startTimer() {
      this.interval = setInterval(() => {
        this.timerCounter--;
      }, 1000);

      this.timeout = setTimeout(() => {
        this.$store.commit("setAttemptedQuestions", this.attemptedQuestions);
        this.$router.push({ name: "Summary" });
      }, 120000);
    },
  },

  async beforeMount() {
    let proxy = "https://cors-anywhere-origin.herokuapp.com/";
    let url =
      "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d24f646e-9ba9-45ba-a142-4fdd1f2368e4/questions.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210409T075109Z&X-Amz-Expires=86400&X-Amz-Signature=426c18719fe29bec1b30e9fd67ad0a401c2786e34d3872d6990b9b8269421a35&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22questions.json%22";

    await axios.get(proxy + url).then((response) => {
      this.questions = response.data.data;
      this.questionPerViewMethod();
      this.loading = false;
      this.startTimer();
      let length = this.questions.length;
      this.$store.commit("setTotalQuestions", length);
    });
  },

  beforeDestroy() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  },
};
</script>

<style></style>
