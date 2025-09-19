import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import messageReducer from "./reducers/messageReducer";
import courseReducer from "./reducers/courseReducer";
import instructorReducer from "./reducers/instructorReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    course: courseReducer,
    instructor:instructorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["course/setFileFields"], 
        ignoredPaths: ["course.course.thumbnail", "course.course.certificate"],

      }
    })

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export default store;
