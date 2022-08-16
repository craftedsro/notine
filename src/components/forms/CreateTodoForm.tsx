import { Button, Card, Form, Input, Select } from "antd";
import React, { useContext } from "react";
import { TodoContext } from "../../context/apiContext";
import { ITodo, ITodoContext } from "../../types/types";
import { UserOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateTodoForm = () => {
  const { createTodo, loading } = useContext(TodoContext) as ITodoContext;

  const [form] = Form.useForm();

  const onAddTodo = ({ description, completed }: ITodo): void => {
    const todo: ITodo = {
      description: description,
      completed: completed,
    };

    createTodo(todo);

    form.resetFields();
  };

  return (
    <Card className="card-addTodoForm" title="Add todo">
      <Form name="normal_login" form={form} onFinish={onAddTodo}>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Description"
          />
        </Form.Item>

        <Form.Item name="completed">
          <Select placeholder="Completed">
            <Option value="true">Done</Option>
            <Option value="false">Pending</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={loading}
          >
            Add task
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateTodoForm;
