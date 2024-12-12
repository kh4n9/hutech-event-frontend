/* eslint-disable react/prop-types */
import { getUserByToken } from "../../services/admin/userService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectAdmin = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserByToken();

        if (!user) {
          throw new Error("Không tìm thấy thông tin người dùng");
        }

        if (user.role.name !== "admin") {
          navigate("/login"); // Điều hướng nếu không phải admin
          return;
        }
      } catch (error) {
        console.log(error);
        navigate("/login"); // Điều hướng khi gặp lỗi
      }
    };

    fetchData();
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectAdmin;
