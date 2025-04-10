import { useState } from "react";
import styles from "./app.module.scss";
import { AddTaskBar } from "../ui/add-task-bar";
import { TaskCard } from "../ui/task-card";
import { useSelector } from "../../services/store";
import { selecetView, selectActiveTasks, selectCompletedTasks, selectTasks } from "../../services/slices/tasksSlice";
import { AppFooter } from "../app-footer";
import { TaskManagerFooter } from "../ui/task-manager-footer";

const App = () => {
  const [value, setValue] = useState<string>("");
  const tasks = useSelector(selectTasks);
  const activeTasks = useSelector(selectActiveTasks);
  const completedTasks = useSelector(selectCompletedTasks);
  const view = useSelector(selecetView);

  const filteredTasks = {
    all: tasks,
    active: activeTasks,
    completed: completedTasks,
  };
  

  return (
    <div className={styles.app}>
      <main>
        <article className={styles.content}>
          <h1 className={styles.title}>todos</h1>
          <div className={styles.tasksWrapper}>
            <div className={styles.tasks}>
              <AddTaskBar value={value} setValue={setValue} />
              <ul className={styles.tasksList}>
                {filteredTasks[view].map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
              </ul>
              <TaskManagerFooter />
            </div>
          </div>
        </article>
      </main>
      <AppFooter />
    </div>
  );
};

export default App;
