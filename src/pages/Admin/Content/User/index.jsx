import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import DeleteUser from "./DeteleUser";
import EditUser from "./EditUser";

const User = () => {
  const data = [
    { id: 1, username: "admin", fullname: "Admin", monitor: true },
    { id: 2, username: "user", fullname: "User", monitor: false },
    { id: 3, username: "user1", fullname: "User 1", monitor: false },
    { id: 4, username: "user2", fullname: "User 2", monitor: false },
    { id: 5, username: "user3", fullname: "User 3", monitor: false },
    { id: 6, username: "user4", fullname: "User 4", monitor: false },
    { id: 7, username: "user5", fullname: "User 5", monitor: false },
    { id: 8, username: "user6", fullname: "User 6", monitor: false },
    { id: 9, username: "user7", fullname: "User 7", monitor: false },
    { id: 10, username: "user8", fullname: "User 8", monitor: false },
    { id: 11, username: "user9", fullname: "User 9", monitor: false },
    { id: 12, username: "user10", fullname: "User 10", monitor: false },
    { id: 13, username: "user11", fullname: "User 11", monitor: false },
    { id: 14, username: "user12", fullname: "User 12", monitor: false },
    { id: 15, username: "user13", fullname: "User 13", monitor: false },
    { id: 16, username: "user14", fullname: "User 14", monitor: false },
    { id: 17, username: "user15", fullname: "User 15", monitor: false },
    { id: 18, username: "user16", fullname: "User 16", monitor: false },
    { id: 19, username: "user17", fullname: "User 17", monitor: false },
    { id: 20, username: "user18", fullname: "User 18", monitor: false },
    { id: 21, username: "user19", fullname: "User 19", monitor: false },
    { id: 22, username: "user20", fullname: "User 20", monitor: false },
    { id: 23, username: "user21", fullname: "User 21", monitor: false },
    { id: 24, username: "user22", fullname: "User 22", monitor: false },
    { id: 25, username: "user23", fullname: "User 23", monitor: false },
    { id: 26, username: "user24", fullname: "User 24", monitor: false },
    { id: 27, username: "user25", fullname: "User 25", monitor: false },
    { id: 28, username: "user26", fullname: "User 26", monitor: false },
    { id: 29, username: "user27", fullname: "User 27", monitor: false },
    { id: 30, username: "user28", fullname: "User 28", monitor: false },
    { id: 31, username: "user29", fullname: "User 29", monitor: false },
  ];

  const [tableData, setTableData] = useState([]);
  const [quantity, setQuantity] = useState(10); // Số bản ghi trên mỗi trang
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPage, setTotalPage] = useState(1); // Tổng số trang
  const [search, setSearch] = useState(""); // Từ khóa tìm kiếm
  const [showAddUser, setShowAddUser] = useState(false); // Hiển thị form thêm mới
  const [showEditUser, setShowEditUser] = useState(false); // Hiển thị form sửa
  const [showDeleteUser, setShowDeleteUser] = useState(false); // Hiển thị form xóa

  // Xử lý phân trang và tìm kiếm
  useEffect(() => {
    // Lọc theo từ khóa
    const filteredData = data.filter(
      (item) =>
        item.username.toLowerCase().includes(search.toLowerCase()) ||
        item.fullname.toLowerCase().includes(search.toLowerCase()),
    );

    // Tính tổng số trang
    const pages = Math.ceil(filteredData.length / quantity);
    setTotalPage(pages);

    // Lấy dữ liệu trang hiện tại
    const startIndex = (page - 1) * quantity;
    const currentData = filteredData.slice(startIndex, startIndex + quantity);
    setTableData(currentData);
  }, [quantity, page, search]);

  // Xử lý chuyển trang
  const handleNextPage = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Xử lý thêm mới tài khoản
  const handleAddUser = () => {
    setShowAddUser(true);
  };

  const closeAddUser = () => {
    setShowAddUser(false);
  };

  // xử lý sửa tài khoản
  const handleEditUser = () => {
    setShowEditUser(true);
  };

  const closeEditUser = () => {
    setShowEditUser(false);
  };

  // Xử lý xóa tài khoản
  const handleDeleteUser = () => {
    setShowDeleteUser(true);
  };

  const closeDeleteUser = () => {
    setShowDeleteUser(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-20 rounded-md border-2 bg-white p-2 shadow-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <div>
            <h1 className="text-2xl font-semibold">Danh sách tài khoản</h1>
            <p className="text-gray-500">
              Danh sách tài khoản quản trị hệ thống, bạn có thể tạo mới và phân
              quyền các thành viên tại đây.
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={handleAddUser}
            className="rounded-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
          >
            Thêm mới tài khoản
          </button>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">
          TÀI KHOẢN HỆ THỐNG
        </h1>
        <hr className="my-2" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Xem</span>
            <select
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="rounded-md border-2 p-2 text-gray-500 hover:border-gray-700"
              defaultValue={10}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            <span className="text-gray-500">bản ghi</span>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Tìm kiếm tài khoản"
            className="rounded-md border-2 p-2"
          />
        </div>
        <table className="mt-4 w-full">
          <thead>
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Tên đăng nhập</th>
              <th className="text-left">Họ tên</th>
              <th className="text-left">Quyền</th>
              <th className="text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr
                key={item.id}
                className="border-y-2 border-gray-200 hover:bg-gray-100"
              >
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.fullname}</td>
                <td>{item.monitor ? "Quản trị viên" : "Nhân viên"}</td>
                <td>
                  <button
                    onClick={handleEditUser}
                    className="rounded-md bg-blue-500 p-1 text-white transition-all duration-300 ease-in-out hover:bg-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="ml-2 rounded-md bg-red-500 p-1 text-white transition-all duration-300 ease-in-out hover:bg-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex">
          {page > 1 && (
            <button
              onClick={handlePreviousPage}
              className="rounded-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
            >
              Trang trước
            </button>
          )}
          <div className="mx-2 rounded-md bg-white px-4 py-2 shadow-md">
            <span>{page}</span>
          </div>
          {page < totalPage && (
            <button
              onClick={handleNextPage}
              className="rounded-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
            >
              Trang sau
            </button>
          )}
        </div>
      </div>
      {/* Hiển thị AddUser nếu showAddUser = true */}
      {showAddUser && <AddUser onClose={closeAddUser} />}
      {/* Hiển thị EditUser nếu showEditUser = true */}
      {showEditUser && <EditUser onClose={closeEditUser} />}
      {/* Hiển thị DeleteUser nếu showDeleteUser = true */}
      {showDeleteUser && <DeleteUser onClose={closeDeleteUser} />}
    </div>
  );
};

export default User;
