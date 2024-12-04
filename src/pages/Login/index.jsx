import hutechLogo from "../../assets/images/hutech-logo.png";

const Login = () => {
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
            className="w-96 rounded border-2 px-4 py-2"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            className="mt-2 w-96 rounded border-2 px-4 py-2"
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="mt-5 flex items-center justify-center">
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
