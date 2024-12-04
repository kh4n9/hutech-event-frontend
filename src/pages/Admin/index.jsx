import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";

// eslint-disable-next-line react/prop-types
const Admin = ({ content }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <Content content={content} />
      </div>
    </div>
  );
};

export default Admin;
