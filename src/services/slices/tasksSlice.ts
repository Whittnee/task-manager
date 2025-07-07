import {
  AnyAction,
  createSelector,
  createSlice,
  Dispatch,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { TTask } from "../../types/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ITasksState {
  tasks: TTask[];
  view: "all" | "active" | "completed";
}

export const state: ITasksState = {
  tasks: [],
  view: "all",
};

export const loadStateFromStorage = (): ITasksState => {
  try {
    const savedTasks = localStorage.getItem('tasks');
    return {
      ...state, 
      tasks: savedTasks ? JSON.parse(savedTasks) : []
    }
  } catch {
    return state
  }
}

export const initialState = loadStateFromStorage();

export const persistTasksMiddleware: Middleware<{}, RootState> =
  (storeAPI: MiddlewareAPI<Dispatch, RootState>) =>
  (next) =>
  (action) => {
    const result = next(action);
    const tasks = storeAPI.getState().tasksReducer.tasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return result;
  };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TTask>) => {
      state.tasks.push(action.payload);
    },
    completeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          task.isDone = !task.isDone;
        }
        return task;
      });
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter((task) => !task.isDone);
    },
    changeView: (
      state,
      action: PayloadAction<"all" | "active" | "completed">
    ) => {
      state.view = action.payload;
    },
  },
});

export default tasksSlice.reducer;
export const { addTask, completeTask, clearCompleted, changeView } =
  tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasksReducer.tasks;
export const selectActiveTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((task) => !task.isDone)
);

export const selectCompletedTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((task) => task.isDone)
);

export const selecetView = (state: RootState) => state.tasksReducer.view;
