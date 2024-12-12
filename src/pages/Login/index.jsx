import { useState } from "react";
import hutechLogo from "../../assets/images/hutech-logo.png";
import { login } from "../../services/loginService";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../../services/admin/userService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    try {
      setLoading(true); // Bắt đầu loading
      setError(""); // Xóa lỗi cũ nếu có
      const data = await login(username, password);

      localStorage.setItem("token", data.token); // Dùng sessionStorage thay vì localStorage
      const user = await getUserByToken();

      // Điều hướng dựa trên quyền
      if (user.role.name === "colab") {
        navigate("/colab");
      } else if (user.role.name === "admin") {
        navigate("/admin");
      } else {
        setError("Quyền hạn không hợp lệ.");
      }
    } catch (error) {
      console.error(error);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.");
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="">
        <div className="flex items-center justify-center">
          <img src={hutechLogo} className="w-[80px]" alt="Hutech Logo" />
        </div>
        <div className="m-5 flex items-center justify-center">
          <h1 className="text-center text-3xl">Đăng nhập</h1>
        </div>
        <div>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-96 rounded border-2 px-4 py-2"
            placeholder="Tên đăng nhập"
          />
        </div>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-96 rounded border-2 px-4 py-2"
            placeholder="Mật khẩu"
            type="password"
          />
        </div>
        {error && <div className="mt-2 text-red-500">{error}</div>}
        <div className="mt-5 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className={`rounded px-4 py-2 text-white ${
              loading
                ? "cursor-not-allowed bg-gray-500"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading} // Vô hiệu hóa nút khi đang loading
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
