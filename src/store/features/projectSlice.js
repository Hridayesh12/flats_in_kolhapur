import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    totalLength: 0,
};

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjects: (state, { payload }) => {
            state.projects = payload.projects;
            state.totalLength = payload.totalLength;
        },
        setNextProjects: (state, { payload }) => {
            state.projects = state.projects.concat(payload.projects);
            if (payload.totalLength) {
                state.totalLength = payload.totalLength;
            }
        },
        // updateIndividualUser: (state, { payload }) => {
        //     const updatedUsers = state.users.map((user) => {
        //         if (user.id === payload.user.id) {
        //             return payload.user;
        //         } else {
        //             return user;
        //         }
        //     });
        //     state.users = updatedUsers;
        // },
        // deleteUser: (state, { payload }) => {
        //     state.users = state.users.filter((user) => user.id !== payload.id);
        //     state.totalLength -= 1;
        // },
    },
});

export const { setProjects, setNextProjects } = projectSlice.actions;

export default projectSlice.reducer;
