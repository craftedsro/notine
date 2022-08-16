import { Divider } from "antd";

interface Props {
  title?: string;
  children: JSX.Element;
}

const ContentLayout = ({ title, children }: Props) => {
  return (
    <main>
      <article>
        {title && (
          <>
            <h2>{title}</h2>
            <Divider />
          </>
        )}
        <div>{children}</div>
      </article>
    </main>
  );
};

export default ContentLayout;
