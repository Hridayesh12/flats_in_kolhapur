import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: {
        type: 'flat',
        config: null,
        location: null,
        minPrice: null,
        maxPrice: null,
        projectStatus: null,
        limit: 5,
        offset: 0
    },
    totalLength: 0,
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, { payload }) => {
            state.filters = payload.projects;
            if (payload.type) {
                state.filters.type = payload.type
            }
            if (payload.config) {
                state.filters.config = payload.config
            }
            if (payload.location) {
                state.filters.location = payload.location
            }
            if (payload.minPrice) {
                state.filters.minPrice = payload.minPrice
            }
            if (payload.maxPrice) {
                state.filters.maxPrice = payload.maxPrice
            }
            if (payload.projectStatus) {
                state.filters.projectStatus = payload.projectStatus
            }
            state.offset = 0;
        },
        setOffset: (state, { payload }) => {
            state.filters.offset += payload.newOffset;
        },
    },
});

export const { setFilters, setOffset } = filterSlice.actions;

export default filterSlice.reducer;
