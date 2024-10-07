import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: 'flat',
    config: null,
    area: null,
    minPrice: 100000,
    maxPrice: 50000000,
    possessionStatus: null,
    limit: 3,
    offset: 0
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, { payload }) => {
            console.log("New Payload", payload);
            if (payload.type) {
                state.type = payload.type
            }
            if (payload.config) {
                state.config = payload.config
            }
            if (payload.area) {
                state.area = payload.area
            }
            if (payload.minPrice) {
                state.minPrice = payload.minPrice
            }
            if (payload.maxPrice) {
                state.maxPrice = payload.maxPrice
            }
            if (payload.possessionStatus) {
                state.possessionStatus = payload.possessionStatus
            }
            state.offset = 0;
        },
        setOffset: (state, { payload }) => {
            state.offset += payload.newOffset;
        },

    },
});

export const { setFilters, setOffset } = filterSlice.actions;

export default filterSlice.reducer;
