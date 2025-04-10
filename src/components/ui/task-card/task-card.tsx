import { FC, memo, useCallback } from "react";
import { TTask } from "../../../types/types";
import styles from "./task-card.module.scss";
import { IoMdCheckmark } from "react-icons/io";
import clsx from 'clsx';
import { useDispatch } from "../../../services/store";
import { completeTask } from "../../../services/slices/tasksSlice";


export const TaskCard: FC<TTask> = memo(({ id, description, isDone }) => {
  const dispatch = useDispatch();
  
  const handleCheck = useCallback(() => {
    dispatch(completeTask(id))
  }, [dispatch, id]);
  return (
    <li className={styles.task}>
      <label className={clsx(styles.option, { [styles.active]: isDone})}>
        <input type="checkbox" checked={isDone} onChange={handleCheck} />
        <IoMdCheckmark className={styles.checkMark} />
      </label>
      <span className={clsx(styles.description, { [styles.done]: isDone})}>{description}</span>
    </li>
  );
});
