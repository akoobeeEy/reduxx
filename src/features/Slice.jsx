import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const table = {
    sports: 21,
    history: 23,
    politics: 24,
  };
  const API_ENDPOINT = 'https://opentdb.com/api.php?'
const initialState = {
  waiting: true,
  loading: false,
  questions: [],
  index: 0,
  correct: 0,
  error: false,
  quiz: {
    amount: 10,
    category: "sports",
    difficulty: "easy",
  },
  isModalOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setWaiting: (state, action) => {
      state.waiting = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setCorrect: (state, action) => {
      state.correct = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  setWaiting,
  setLoading,
  setQuestions,
  setIndex,
  setCorrect,
  setError,
  setQuiz,
  setIsModalOpen,
} = appSlice.actions;

// ...

export const fetchQuestions = (url) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setWaiting(false));
  
    try {
      const response = await axios(url);
      const data = response.data.results;
  
      if (data.length > 0) {
        dispatch(setQuestions(data));
        dispatch(setLoading(false));
        dispatch(setWaiting(false));
        dispatch(setError(false));
      } else {
        dispatch(setWaiting(true));
        dispatch(setError(true));
      }
    } catch (error) {
      dispatch(setWaiting(true));
    }
  };
  
  export const updateQuizAndFetchQuestions = (quiz) => async (dispatch) => {
    const { amount, category, difficulty } = quiz;
  
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
  
    dispatch(setLoading(true));
    dispatch(setWaiting(false));
  
    try {
      const response = await axios(url);
      const data = response.data.results;
  
      if (data.length > 0) {
        dispatch(setQuestions(data));
        dispatch(setLoading(false));
        dispatch(setWaiting(false));
        dispatch(setError(false));
        dispatch(setQuiz({ amount, category, difficulty }));
      } else {
        dispatch(setWaiting(true));
        dispatch(setError(true));
      }
    } catch (error) {
      dispatch(setWaiting(true));
    }
  };
  
  

export const nextQuestion = () => (dispatch, getState) => {
  const { index, questions } = getState().app;
  const newIndex = index + 1;
  if (newIndex > questions.length - 1) {
    dispatch(setIsModalOpen(true));
    dispatch(setIndex(0));
  } else {
    dispatch(setIndex(newIndex));
  }
};

export const checkAnswer = (value) => (dispatch, getState) => {
  if (value) {
    const { correct } = getState().app;
    dispatch(setCorrect(correct + 1));
  }
  dispatch(nextQuestion());
};

export const closeModal = () => (dispatch) => {
  dispatch(setWaiting(true));
  dispatch(setCorrect(0));
  dispatch(setIsModalOpen(false));
};

export default appSlice.reducer;
