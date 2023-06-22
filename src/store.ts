import { createStore } from "vuex";
import { Task, TaskStatus } from "./entities";

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

const getInitialState = () => {
  return {
    tasks: getInitialTasks(),
  };
};

const AddTaskMutation = "addTask";
const ChangeTaskMutation = "changeTask";
const DeleteTaskMutation = "deleteTask";
const SaveAction = "save";
const GetTaskByIdGetter = "getTaskById";

export const store = createStore({
  state: getInitialState,
  mutations: {
    [AddTaskMutation]: (state, title: string) => {
      state.tasks.push({
        id: Math.max(...state.tasks.map((e) => e.id), 0) + 1,
        status: TaskStatus.ToDo,
        title,
      });
    },
    [ChangeTaskMutation]: (state, task: Task) => {
      const candidate = state.tasks.find((e) => e.id === task.id);
      if (!candidate) {
        return;
      }
      candidate.status = task.status;
      candidate.title = task.title;
    },
    [DeleteTaskMutation]: (state, id: Task["id"]) => {
      const index = state.tasks.findIndex((e) => e.id === id);
      if (!~index) {
        return;
      }
      state.tasks.splice(index, 1);
    },
  },
  getters: {
    [TaskStatus.Done]: (state) =>
      state.tasks
        .filter((el) => el.status === TaskStatus.Done)
        .map((el) => el.id),
    [TaskStatus.InProgress]: (state) =>
      state.tasks
        .filter((el) => el.status === TaskStatus.InProgress)
        .map((el) => el.id),
    [TaskStatus.ToDo]: (state) =>
      state.tasks
        .filter((el) => el.status === TaskStatus.ToDo)
        .map((el) => el.id),
    [GetTaskByIdGetter]: (state) => (id: Task["id"]) =>
      state.tasks.find((el) => el.id === id),
  },
  actions: {
    [SaveAction]: ({ state }) => {
      saveTasks(state.tasks ?? []);
    },
  },
});

type Store = typeof store;

const commitInState = (
  store: Store
): ((mutationName: string, ...payload: any[]) => void) => store.commit;

export const commitAddTask = (store: Store, title: string) =>
  commitInState(store)(AddTaskMutation, title);
export const commitChangeTask = (store: Store, task: Task) =>
  commitInState(store)(ChangeTaskMutation, task);
export const commitDeleteTask = (store: Store, id: Task["id"]) =>
  commitInState(store)(DeleteTaskMutation, id);

export const Save = (store: Store): void => store.dispatch(SaveAction);

export const getterGetTaskById = (
  store: Store,
  id: Task["id"]
): Task | undefined => store.getters[GetTaskByIdGetter](id);

export const getterGetTaskIds = (store: Store, status: TaskStatus): number[] =>
  store.getters[status];
