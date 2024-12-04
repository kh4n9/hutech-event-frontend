import { Link } from "react-router-dom";
import hutechLogo from "../../../assets/images/hutech-logo.png";

const Header = () => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-2 shadow-xl">
      <Link to="/admin" className="flex items-center justify-center">
        <img src={hutechLogo} alt="HUTECH Logo" className="w-12" />
        <h1 className="ml-2 text-2xl font-bold">Hutech Event</h1>
      </Link>

      <div className="flex items-center">
        <h1 className="mr-4">Admin</h1>
        <Link
          to="/login"
          className="rounded-xl px-4 py-1 shadow-md transition-all duration-500 hover:bg-blue-200"
        >
          Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default Header;
