import { createStore } from "vuex";
import { Task } from "./entities";

const taskStorage = {
  get: () =>
    JSON.parse(localStorage.getItem("tasks") || "null") as Task[] | null,
  set: (v: Task[]) => localStorage.setItem("tasks", JSON.stringify(v)),
};

const getInitialTasks = (): Task[] => {
  try {
    const data = taskStorage.get();
    if (!data) {
      saveTasks([]);
      return [];
    }
    return data;
  } catch (e) {
    console.warn(e);
    return [];
  }
};

const saveTasks = (newTasks: Task[]): void => {
  try {
    taskStorage.set(newTasks);
  } catch (e) {
    console.warn(e);
    taskStorage.set([]);
  }
};

const getInitialState = () => ({
  task: getInitialTasks(),
});

export const store = createStore({
  state: getInitialState,
});
