import { combineReducers, configureStore } from "@reduxjs/toolkit";
import projectReducer from "./features/projectSlice";
import filterReducer from "./features/filterSlice";

const rootReducer = combineReducers({
    projects: projectReducer,
    filters: filterReducer
});

export const store = configureStore({
    reducer: rootReducer,
});






// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

// const persistCreateUserFormConfig = {
//     key: " createUser",
//     storage,
// };
// createUser: persistReducer(persistCreateUserFormConfig, createUserReducer),
// export const persistor = persistStore(store);
