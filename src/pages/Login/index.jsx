import { useState } from "react";
import hutechLogo from "../../assets/images/hutech-logo.png";
import { login } from "../../services/loginService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="">
        <div className="flex items-center justify-center">
          <img src={hutechLogo} className="w-[80px]" />
        </div>
        <div className="m-5 flex items-center justify-center">
          <h1 className="text-center text-3xl">Đăng nhập</h1>
        </div>
        <div>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-96 rounded border-2 px-4 py-2"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-96 rounded border-2 px-4 py-2"
            placeholder="Password"
            type="password"
          />
        </div>
        {error && <div className="mt-2 text-red-500">{error}</div>}
        <div className="mt-5 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
