import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: null,
    config: null,
    area: null,
    minPrice: 100000,
    maxPrice: 50000000,
    possessionStatus: null,
    limit: 100,
    offset: 0
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, { payload }) => {
            // console.log("New Payload", payload);
            if (payload.type && payload.type !== 'deselect') {
                state.type = payload.type
            }
            if (payload.type === 'deselect') {
                state.type = null
            }
            if (payload.config && payload.config !== 'deselect') {
                state.config = payload.config
            }
            if (payload.config === 'deselect') {
                state.config = null
            }
            if (payload.area && payload.area !== 'deselect') {
                state.area = payload.area
            }
            if (payload.area === 'deselect') {
                state.area = null
            }
            if (payload.minPrice) {
                state.minPrice = payload.minPrice
            }
            if (payload.maxPrice) {
                state.maxPrice = payload.maxPrice
            }
            if (payload.possessionStatus && payload.possessionStatus !== 'deselect') {
                state.possessionStatus = payload.possessionStatus
            }
            if (payload.possessionStatus === 'deselect') {
                state.possessionStatus = null
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
