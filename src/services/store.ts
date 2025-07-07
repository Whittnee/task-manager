import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer, { persistTasksMiddleware } from "./slices/tasksSlice"
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook,
} from 'react-redux'

export const rootReducer = combineReducers({
  tasksReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistTasksMiddleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export default store