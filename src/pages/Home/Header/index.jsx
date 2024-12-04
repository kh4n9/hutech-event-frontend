import hutechLogo from "../../../assets/images/hutech-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-300 p-3">
      <Link to="/" className="flex items-center">
        <img src={hutechLogo} alt="HUTECH Logo" className="w-10" />
        <h1 className="ml-3 text-2xl">HUTECH Event</h1>
      </Link>
    </div>
  );
};

export default Header;
