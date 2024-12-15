import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProtectAdmin from "../../components/ProtectAdmin";

// eslint-disable-next-line react/prop-types
const Admin = ({ content }) => {
  return (
    <ProtectAdmin>
      <div className="flex min-h-screen flex-col bg-slate-200">
        <Header />
        <div className="max-w-screen flex flex-grow">
          <Sidebar />
          <Content content={content} />
        </div>
      </div>
    </ProtectAdmin>
  );
};

export default Admin;
