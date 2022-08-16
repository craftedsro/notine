import { Button, List, Popconfirm, Switch, Tag, Tooltip } from "antd";
import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ITodo } from "../../types/types";

interface Props {
  todo: ITodo;
  onTodoRemove: (todo: ITodo) => void;
  onTodoToggle: (todo: ITodo) => void;
}

const TodoItem = React.memo(({ todo, onTodoRemove, onTodoToggle }: Props) => {
  return (
    <List.Item
      actions={[
        <Tooltip
          title={todo.completed ? "Mark as uncompleted" : "Mark as completed"}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => onTodoToggle(todo)}
            defaultChecked={todo.completed}
          />
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            onTodoRemove(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo._id}
    >
      <div className="todo-item">
        <Link to={"detail/" + todo._id}>
          <Tag color={todo.completed ? "cyan" : "red"} className="todo-tag">
            {todo.description}
          </Tag>
        </Link>
      </div>
    </List.Item>
  );
});

export default TodoItem;
