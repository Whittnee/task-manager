import { describe, expect, it, test } from "@jest/globals";
import tasksSlice, {
  addTask,
  changeView,
  clearCompleted,
  completeTask,
  ITasksState,
  initialState
} from "../services/slices/tasksSlice";

describe("Tasks Testing", () => {
  const initialTasks: ITasksState = {
    tasks: [
      {
        id: "1",
        description: "Task 1",
        isDone: false,
      },
      {
        id: "2",
        description: "Task 2",
        isDone: false,
      },
      {
        id: "3",
        description: "Task 3",
        isDone: true,
      },
      {
        id: "4",
        description: "Task 4",
        isDone: true,
      },
    ],
    view: "all",
  };

  it("тест на добавление задачи", () => {
    const state = tasksSlice(initialState, addTask(initialTasks.tasks[0]));
    const { tasks } = state;
    expect(tasks[0]).toMatchObject(initialTasks.tasks[0]);
  });

  it("тест на выполнение задачи", () => {
    const state = tasksSlice(
      initialTasks,
      completeTask(initialTasks.tasks[1].id)
    );
    const { tasks } = state;
    expect(tasks[1].isDone).toBe(true);
  });

  it("тест на очистку выполненных задач", () => {
    const state = tasksSlice(initialTasks, clearCompleted());
    const { tasks } = state;
    expect(tasks.length).toBe(2);
  });

  it("тест на смену вида задач на active", () => {
    const state = tasksSlice(initialTasks, changeView("active"));
    const { view } = state;
    expect(view).toBe("active");
  });

  it("тест на смену вида задач на completed", () => {
    const state = tasksSlice(initialTasks, changeView("completed"));
    const { view } = state;
    expect(view).toBe("completed");
  });
});
