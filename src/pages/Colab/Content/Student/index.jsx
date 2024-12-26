//Đây là trang Student
import { useEffect, useState } from "react";
import AddStudent from "./AddStudent";
import DeleteStudent from "./DeleteStudent";
import EditStudent from "./EditStudent";
import { getStudents } from "../../../../services/admin/studentService";

const Student = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const [quantity, setQuantity] = useState(10); // Số bản ghi trên mỗi trang
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPage, setTotalPage] = useState(1); // Tổng số trang
  const [search, setSearch] = useState(""); // Từ khóa tìm kiếm
  const [showAddStudent, setShowAddStudent] = useState(false); // Hiển thị form thêm mới
  const [studentEditId, setStudentEditId] = useState(null); // ID của sinh viên được chọn để sửa
  const [studentDeleteId, setStudentDeleteId] = useState(null); // ID của sinh viên được chọn để xóa

  useEffect(() => {
    const fetchData = async () => {
      const response = await getStudents();
      setData(response);
    };
    fetchData();
  }, [showAddStudent, studentDeleteId, studentEditId]);

  // Xử lý phân trang và tìm kiếm
  useEffect(() => {
    // Lọc dữ liệu dựa vào trạng thái showIncomplete
    const filteredData = showIncomplete
      ? data.filter((item) => item.studentCode && item.email && item.phone)
      : data;

    // Tìm kiếm dữ liệu dựa vào từ khóa search
    const searchedData = filteredData.filter(
      (item) =>
        item.studentCode.includes(search) ||
        item.fullname.includes(search) ||
        item.class.includes(search) ||
        item.phone.includes(search) ||
        item.email.includes(search) ||
        item.facebook.includes(search),
    );

    // Tính tổng số trang
    const pages = Math.ceil(searchedData.length / quantity);
    setTotalPage(pages);

    // Lấy dữ liệu trang hiện tại
    const startIndex = (page - 1) * quantity;
    const currentData = searchedData.slice(startIndex, startIndex + quantity);
    setTableData(currentData);
  }, [quantity, page, showIncomplete, data, search]);

  // Xử lý chuyển trang
  function handleNextPage() {
    if (page < totalPage) setPage(page + 1);
  }

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Xử lý thêm mới tài khoản
  const handleAddStudent = () => {
    setShowAddStudent(true);
  };

  const closeAddStudent = () => {
    setShowAddStudent(false);
  };

  // xử lý sửa tài khoản
  const handleEditStudent = (id) => {
    setStudentEditId(id);
  };

  const closeEditStudent = () => {
    setStudentEditId(null);
  };

  // Xử lý xóa tài khoản
  const handleDeleteStudent = (id) => {
    setStudentDeleteId(id);
  };

  const closeDeleteStudent = () => {
    setStudentDeleteId(null);
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
            className="size-20 rounded-md border-2 p-2 shadow-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>

          <div>
            <h1 className="text-2xl font-semibold">Danh sách sinh viên</h1>
            <p className="text-gray-500">
              Bạn có thể tra cứu thông tin và các sự kiện mà sinh viên đó tham
              gia tại đây.
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={handleAddStudent}
            className="rounded-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
          >
            Thêm sinh viên mới
          </button>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">
          DANH SÁCH SINH VIÊN
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
        <div className="flex items-center justify-end">
          <label className="flex cursor-pointer items-center">
            <div className="relative">
              <input
                type="checkbox"
                checked={showIncomplete}
                onChange={() => setShowIncomplete(!showIncomplete)}
                className="sr-only"
              />
              <div
                className={`block h-4 w-8 rounded-full ${
                  showIncomplete ? "bg-blue-500" : "bg-gray-300"
                } transition-colors duration-300`}
              ></div>
              <div
                className={`dot absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white transition-transform duration-300 ${
                  showIncomplete ? "translate-x-4" : ""
                }`}
              ></div>
            </div>
            <span className="ml-2 text-sm text-gray-700">
              {showIncomplete
                ? "Hiện đầy đủ sinh viên"
                : "Ẩn các mã số sinh viên bị thiếu thông tin"}
            </span>
          </label>
        </div>

        <table className="mt-4 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">MSSV</th>
              <th className="px-4 py-2 text-left">Họ tên</th>
              <th className="px-4 py-2 text-left">Lớp</th>
              <th className="px-4 py-2 text-center">BCS</th>
              <th className="px-4 py-2 text-left">Điện thoại</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Facebook</th>
              <th className="px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr
                key={item._id}
                className="border-y-2 border-gray-200 hover:bg-gray-100"
              >
                <td className="max-w-10 overflow-hidden text-ellipsis whitespace-nowrap px-3 py-1 text-center">
                  {item._id}
                </td>
                <td className="px-3 py-1">{item.studentCode}</td>
                <td className="px-3 py-1">{item.fullname}</td>
                <td className="px-3 py-1">{item.class}</td>
                <td className="px-3 py-1 text-center">
                  {item.isMonitor && "✔"}
                </td>
                <td className="px-3 py-1">{item.phone}</td>
                <td className="px-3 py-1">{item.email}</td>
                <td className="px-3 py-1 text-center">
                  {item.facebook ? (
                    <a
                      href={item.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="text-blue-500"
                      >
                        <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.497v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.894-4.785 4.659-4.785 1.325 0 2.464.099 2.794.143v3.24h-1.917c-1.504 0-1.795.714-1.795 1.762v2.311h3.59l-.467 3.622h-3.123v9.293h6.126c.733 0 1.324-.591 1.324-1.324v-21.35c0-.733-.591-1.325-1.324-1.325z" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-gray-500">Không có</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEditStudent(item._id)}
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
                    onClick={() => handleDeleteStudent(item._id)}
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
      {/* Hiển thị AddStudent nếu showAddStudent = true */}
      {showAddStudent && <AddStudent onClose={closeAddStudent} />}
      {/* Hiển thị EditStudent nếu showEditStudent = true */}
      {studentEditId && (
        <EditStudent onClose={closeEditStudent} id={studentEditId} />
      )}
      {/* Hiển thị DeleteStudent nếu showDeleteStudent = true */}
      {studentDeleteId && (
        <DeleteStudent onClose={closeDeleteStudent} id={studentDeleteId} />
      )}
    </div>
  );
};

export default Student;
