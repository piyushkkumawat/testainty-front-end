// store.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state using createSlice
const counterSlice = createSlice({
    name: 'createAssessment',
    initialState: {
        value: 0,
        basicDetails:[],
        selectedQBank: [],
        settings: []
    },
    reducers: {
        handleNext: (state) => {
            state.value += 1;
        },
        handlePrev: (state) => {
            state.value -= 1;
        },
        addQBank: (state, action) => {
            state.selectedQBank = action.payload;
        },
        addBasicDetails: (state, action) => {
            state.basicDetails = action.payload;
        },
        addSettings: (state, action) => {
            state.settings = action.payload;
        },
        updateQuestionBankCount: (state, action) => {
            const { index, count, totalQDurationTime } = action.payload;
            state.selectedQBank[index].count = count;
            state.selectedQBank[index].totalQDurationTime = totalQDurationTime;
        },
        resetValue: (state) => {
            state.value = 0;
            state.basicDetails = [];
            state.selectedQBank = [];
            state.settings = []
        },
    },
});

// Extract the actions and reducer from the slice
export const { handleNext, handlePrev, addQBank, addBasicDetails, addSettings, resetValue, updateQuestionBankCount } = counterSlice.actions;
export default counterSlice.reducer

