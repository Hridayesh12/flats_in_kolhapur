import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    totalProjects: 0,
    hasMore: true
};

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjects: (state, { payload }) => {
            // console.log("Payload Of Projects", payload);
            state.projects = payload.projects;
            state.totalProjects = payload.totalProjects;
            state.hasMore = payload.hasMore;
        },
        setNextProjects: (state, { payload }) => {
            state.projects = state.projects.concat(payload.projects);
            state.hasMore = payload.hasMore;
            if (payload.totalProjects) {
                state.totalProjects = payload.totalProjects;
            }
        },
        setHasMore: (state, { payload }) => {
            state.hasMore = payload.doesHaveMore;
        },

        setLikeProject: (state, { payload }) => {
            // Find the project by _id and toggle its isFav property
            const projectIndex = state.projects.findIndex(
                (project) => project._id === payload.projectId
            );

            if (projectIndex !== -1) {
                // Toggle the isFav value
                state.projects[projectIndex].isFav = !state.projects[projectIndex].isFav;
            }
        }
    },
});

export const { setProjects, setNextProjects, setHasMore, setLikeProject } = projectSlice.actions;

export default projectSlice.reducer;

