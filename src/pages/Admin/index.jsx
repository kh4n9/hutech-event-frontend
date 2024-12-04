import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";

// eslint-disable-next-line react/prop-types
const Admin = ({ content }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <Content content={content} />
      </div>
    </>
  );
};

export default Admin;
