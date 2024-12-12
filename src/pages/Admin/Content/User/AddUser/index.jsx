import { useEffect, useState } from "react";
import { createUser } from "../../../../../services/admin/userService";
import { getRoles } from "../../../../../services/admin/roleService";

// eslint-disable-next-line react/prop-types
const AddUser = ({ closeAddUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
        data.length && setRoleId(data[0]._id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!username || !password || !fullname || !roleId) {
      console.log(username, password, fullname, roleId);
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      await createUser({
        username,
        fullname,
        password,
        roleId,
      });
      closeAddUser();
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Thêm mới tài khoản</h1>
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Họ tên
            </label>
            <input
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập họ tên"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập mật khẩu"
            />
          </div>
          {/* role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Quyền hạn
            </label>
            <select
              onChange={(e) => setRoleId(e.target.value)}
              value={roleId}
              className="w-full rounded-md border-2 p-2"
            >
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="rounded-md bg-gray-200 px-4 py-2"
              onClick={closeAddUser}
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
