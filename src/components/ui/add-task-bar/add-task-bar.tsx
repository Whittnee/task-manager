import { FC, memo, useEffect } from "react";
import { TAddTaskBarProps } from "./add-task-bar-types";
import styles from "./add-task-bar.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "../../../services/store";
import { addTask } from "../../../services/slices/tasksSlice";

import { nanoid } from "@reduxjs/toolkit";

export const AddTaskBar: FC<TAddTaskBarProps> = memo(({ value, setValue }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (value) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          dispatch(
            addTask({ id: nanoid(), description: value, isDone: false })
          );
          setValue("");
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  });
  return (
    <div className={styles.addTaskBar}>
      <IoIosArrowDown className={styles.arrow} />
      <input
        type="text"
        placeholder="What needs to be done?"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
});
