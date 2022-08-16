import { Card, Empty, Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";
import { ITodoContext } from "../../types/types";
import { TodoContext } from "../../context/apiContext";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const { getTodo, todo, loading } = useContext(TodoContext) as ITodoContext;

  const [createdAt, setCreatedAt] = useState<string | null>("");
  const [updatedAt, setUpdatedAt] = useState<string | null>("");

  useEffect(() => {
    const path = location.pathname;

    const id = path.substring(path.indexOf("detail/") + 7);

    if (id) getTodo(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const created = new Date(todo?.createdAt ? todo?.createdAt : "");
    const updated = new Date(todo?.updatedAt ? todo?.updatedAt : "");

    created &&
      setCreatedAt(
        `${created.getDay().toString()}.${created
          .getMonth()
          .toString()}.${created.getFullYear().toString()}`
      );

    updated &&
      setUpdatedAt(
        `${updated.getDay().toString()}.${updated
          .getMonth()
          .toString()}.${updated.getFullYear().toString()}`
      );
  }, [todo]);

  return (
    <Card title={loading ? "" : todo?.description}>
      {loading ? (
        <Skeleton></Skeleton>
      ) : todo ? (
        <>
          <p>Completed: {todo?.completed ? "Done" : "Pending"}</p>
          <p>Created at: {createdAt}</p>
          <p>Updated at: {updatedAt}</p>
        </>
      ) : (
        <Empty />
      )}
    </Card>
  );
};

export default Detail;
