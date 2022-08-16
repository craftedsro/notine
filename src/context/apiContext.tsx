import React, { createContext, useContext, useEffect, useState } from "react";
import { IAuthContext, ITodo, ITodoContext } from "../types/types";
import axios from "axios";
import { AuthContext } from "./authContext";
import { message } from "antd";

export const TodoContext = createContext<ITodoContext | null>(null);

interface Props {
  children: JSX.Element;
}

export const APIContextProvider = ({ children }: Props) => {
  const { token } = useContext(AuthContext) as IAuthContext;
  const [todos, setTodos] = useState<ITodo[] | []>([]);
  const [todo, setTodo] = useState<ITodo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      showLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function showLoading() {
    setLoading(true);
    await getTodos();
    setLoading(false);
  }

  async function getTodos() {
    await axios
      .get(`${process.env.REACT_APP_API_HEROKU_BASE_URL}task`, {
        headers: {
          authorization: `Bearer ${token?.token}`,
        },
      })
      .then((response) => {
        setTodos([...response.data.data]);
      })
      .catch((response) => {
        setTodos([]);
        message.error("Error getting todos." + response.data);
      });
  }

  async function getTodo(id: string | undefined) {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_API_HEROKU_BASE_URL}task/` + id, {
        headers: {
          authorization: `Bearer ${token?.token}`,
        },
      })
      .then((response) => {
        setTodo(response.data.data);
      })
      .catch((response) => {
        setTodo(null);
        message.error("Error getting todo." + response.data);
      });
    setLoading(false);
  }

  async function createTodo(todo: ITodo) {
    await axios
      .post(
        `${process.env.REACT_APP_API_HEROKU_BASE_URL}task`,
        {
          description: todo.description,
          completed: todo.completed,
        },
        {
          headers: {
            authorization: `Bearer ${token?.token}`,
          },
        }
      )
      .then(() => {
        message.success("Todo successfully created.");
        getTodos();
      })
      .catch((response) => {
        message.error("Error updating todo." + response.data);
      });
  }

  async function updateTodo(todo: ITodo) {
    await axios
      .put(
        `${process.env.REACT_APP_API_HEROKU_BASE_URL}task/` + todo._id,
        {
          description: todo.description,
          completed: todo.completed,
        },
        {
          headers: {
            authorization: `Bearer ${token?.token}`,
          },
        }
      )
      .then(() => {
        message.success("Todo successfully updated.");
        getTodos();
      })
      .catch((response) => {
        message.error("Error updating todo." + response.data);
      });
  }

  async function deleteTodo(todo: ITodo) {
    await axios
      .delete(`${process.env.REACT_APP_API_HEROKU_BASE_URL}task/` + todo._id, {
        headers: {
          authorization: `Bearer ${token?.token}`,
        },
      })
      .then(() => {
        message.success("Todo successfully deleted.");
        getTodos();
      })
      .catch((response) => {
        message.error("Error deleting todo." + response.data);
      });
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        todo,
        loading,
        getTodo,
        getTodos,
        createTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default APIContextProvider;
