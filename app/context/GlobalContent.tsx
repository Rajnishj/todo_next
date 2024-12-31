"use client";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Todo } from "../utils/interface";
import toast from "react-hot-toast";

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  count: number;
  loading: boolean;
}
const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface ContextProviderType {
  children: ReactNode;
}

export const ContextProvider: FC<ContextProviderType> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchTodoList = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/tasks");
      const data = await res.json();
      if (data.data) {
        setTodos(data.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTodoList();
  }, []);
  useEffect(() => {
    setCount(todos.length);
  }, [todos]);
  return (
    <TodoContext.Provider value={{ todos, setTodos, count, loading }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Use Todo comtent must be within the ContextProvider");
  }
  return context;
};
