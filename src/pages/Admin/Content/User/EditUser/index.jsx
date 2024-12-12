import {
  updateUser,
  getUserById,
} from "../../../../../services/admin/userService";
import { getRoles } from "../../../../../services/admin/roleService";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const EditUser = ({ userIdEdit, closeEditUser }) => {
  const [roles, setRoles] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [roleId, setRoleId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
        const user = await getUserById(userIdEdit);
        setUsername(user.username);
        setFullname(user.fullname);
        setRoleId(user.roleId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!username || !password || !fullname || !roleId) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      await updateUser(userIdEdit, {
        username,
        fullname,
        password,
        roleId,
      });
      closeEditUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Chỉnh sửa tài khoản</h1>
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
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
              value={fullname}
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
              value={password}
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
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="rounded-md bg-gray-200 px-4 py-2"
              onClick={closeEditUser}
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

export default EditUser;
