import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0.
    },
    reducers: {
        increment: (state) => {
            state.count = state.count + 1;
        },
        decrement: (state) => {
            state.count = state.count - 1;
        },
        reloading: (state) => {
            state.count = 0;
        },
    },
});

export const {increment, decrement, reloading} = counterSlice.actions;
export default counterSlice.reducer;