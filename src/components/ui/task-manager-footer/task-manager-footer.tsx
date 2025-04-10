import { FC } from "react";
import { useDispatch, useSelector } from "../../../services/store";
import {
  changeView,
  clearCompleted,
  selecetView,
  selectActiveTasks,
} from "../../../services/slices/tasksSlice";
import styles from "./task-manager-footer.module.scss";
import clsx from "clsx";

export const TaskManagerFooter: FC = () => {
  const activeTasks = useSelector(selectActiveTasks);
  const dispatch = useDispatch();
  const view = useSelector(selecetView);

  return (
    <div className={styles.footer}>
      <span>{activeTasks.length} items left</span>
      <div className={styles.actions}>
        <button
          onClick={() => dispatch(changeView("all"))}
          className={clsx( { [styles.active]: view === "all" })}
        >
          All
        </button>
        <button
          onClick={() => dispatch(changeView("active"))}
          className={clsx({ [styles.active]: view === "active" })}
        >
          Active
        </button>
        <button
          onClick={() => dispatch(changeView("completed"))}
          className={clsx({ [styles.active]: view === "completed" })}
        >
          Completed
        </button>
      </div>
      <button onClick={() => dispatch(clearCompleted())}>Clear completed</button>
    </div>
  );
};
