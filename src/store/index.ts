import create from "zustand";

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Store {
  todos: Todo[];
  createTodo(todo: Todo): void;
  readTodos(todos: Todo[]): void;
  deleteTodo(todo: Todo): void;
  updateTodo(todo: Todo): void;
}

const useStore = create<Store>((set) => ({
  todos: [],
  createTodo: (newTodo) => {
    set((state) => ({ todos: [newTodo, ...state.todos] }));
  },
  readTodos: (todos) => {
    set((state) => ({ todos: [...state.todos, ...todos] }));
  },
  updateTodo: (updatedTodo) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ),
    }));
  },
  deleteTodo: (todoToDelete) => {
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== todoToDelete.id),
    }));
  },
}));

export default useStore;
