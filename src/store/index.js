import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        candidateDetails: {},
        attemptedQuestions: [],
        totalQuestions: "",

    },
    mutations: {
        setCandidateDetails(state, payload){
            state.candidateDetails = payload;
        },
        setAttemptedQuestions(state, payload){
            state.attemptedQuestions = payload;
        },
        setTotalQuestions(state, payload)
        {
            state.totalQuestions = payload;
        },
    },
    actions: {

    },
    modules: {

    },
})