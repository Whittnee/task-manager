import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TTask } from "../../types/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ITasksState {
  tasks: TTask[];
  view: "all" | "active" | "completed";
}

const initialState: ITasksState = {
  tasks: [],
  view: "all",
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
    changeView: (state, action: PayloadAction<"all" | "active" | "completed">) => {
      state.view = action.payload
    }
  },
});

export default tasksSlice.reducer;
export const { addTask, completeTask, clearCompleted, changeView } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasksReducer.tasks;
export const selectActiveTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((task) => !task.isDone)
);

export const selectCompletedTasks = createSelector([selectTasks], (tasks) => 
  tasks.filter((task) => task.isDone)
)

export const selecetView = (state: RootState) => state.tasksReducer.view