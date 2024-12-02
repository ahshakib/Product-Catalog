import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    product: productReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;