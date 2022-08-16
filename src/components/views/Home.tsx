import React, { useContext } from "react";
import { Empty, List, Spin } from "antd";
import { TodoContext } from "../../context/apiContext";
import { ITodo, ITodoContext } from "../../types/types";
import ContentLayout from "../layout/ContentLayout";
import CreateTodoForm from "../forms/CreateTodoForm";
import TodoItem from "../common/TodoItem";

const Home = () => {
  const { updateTodo, deleteTodo, todos, loading } = useContext(
    TodoContext
  ) as ITodoContext;

  const onTodoToggle = (todo: ITodo): void => {
    const toggledTodo = todo;
    toggledTodo.completed = !todo.completed;

    updateTodo(toggledTodo);
  };

  return (
    <ContentLayout
      children={
        <>
          <CreateTodoForm />
          <>
            <h3>List todos</h3>
            {loading ? (
              <div style={{ textAlign: "center" }}>
                <Spin style={{ height: "50%" }} />
              </div>
            ) : todos !== [] ? (
              <List
                itemLayout="horizontal"
                dataSource={todos}
                renderItem={(item) => (
                  <TodoItem
                    todo={item}
                    onTodoToggle={onTodoToggle}
                    onTodoRemove={deleteTodo}
                  />
                )}
              />
            ) : (
              <Empty />
            )}
          </>
        </>
      }
    />
  );
};

export default Home;
