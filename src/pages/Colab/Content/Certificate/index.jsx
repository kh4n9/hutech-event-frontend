import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AddCertificate from "./AddCertificate";
import EditCertificate from "./EditCertidicate";
import DeleteCertificate from "./DeleteCertificate";

const Certificate = () => {
  const data = [
    {
      id: 1,
      certCode: "1/CN2020CNTT",
      eventName: "Sự kiện 1",
      studentCode: "2180603432",
      studentName: "Nguyễn Văn A",
      dateCreated: dayjs("2024-10-10 10:00:00").format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      id: 2,
      certCode: "2/CN2020CNTT",
      eventName: "Sự kiện 2",
      studentCode: "2180603433",
      studentName: "Nguyễn Văn B",
      dateCreated: dayjs("2024-10-10 10:00:00").format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      id: 3,
      certCode: "3/CN2020CNTT",
      eventName: "Sự kiện 3",
      studentCode: "2180603434",
      studentName: "Nguyễn Văn C",
      dateCreated: dayjs("2024-10-10 10:00:00").format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      id: 4,
      certCode: "4/CN2020CNTT",
      eventName: "Sự kiện 4",
      studentCode: "2180603435",
      studentName: "Nguyễn Văn D",
      dateCreated: dayjs("2024-10-10 10:00:00").format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      id: 5,
      certCode: "5/CN2020CNTT",
      eventName: "Sự kiện 5",
      studentCode: "2180603436",
      studentName: "Nguyễn Văn E",
      dateCreated: dayjs("2024-10-10 10:00:00").format("DD/MM/YYYY HH:mm:ss"),
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [quantity, setQuantity] = useState(10); // Số bản ghi trên mỗi trang
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPage, setTotalPage] = useState(1); // Tổng số trang
  const [search, setSearch] = useState(""); // Từ khóa tìm kiếm
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [showEditCertificate, setShowEditCertificate] = useState(false);
  const [showDeleteCertificate, setShowDeleteCertificate] = useState(false);

  // Xử lý phân trang và tìm kiếm
  useEffect(() => {
    // Lọc theo từ khóa
    const filteredData = data.filter(
      (item) =>
        item.studentCode.toLowerCase().includes(search.toLowerCase()) ||
        item.studentName.toLowerCase().includes(search.toLowerCase()) ||
        item.certCode.toLowerCase().includes(search.toLowerCase()) ||
        item.eventName.toLowerCase().includes(search.toLowerCase()),
    );

    // Tính tổng số trang
    const pages = Math.ceil(filteredData.length / quantity);
    setTotalPage(pages);

    // Lấy dữ liệu trang hiện tại
    const startIndex = (page - 1) * quantity;
    const currentData = filteredData.slice(startIndex, startIndex + quantity);
    setTableData(currentData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, page, search]);

  // Xử lý chuyển trang
  const handleNextPage = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleAddCertificate = () => {
    setShowAddCertificate(true);
  };

  const handleCloseAddCertificate = () => {
    setShowAddCertificate(false);
  };

  const handleEditCertificate = () => {
    setShowEditCertificate(true);
  };

  const handleCloseEditCertificate = () => {
    setShowEditCertificate(false);
  };

  const handleDeleteCertificate = () => {
    setShowDeleteCertificate(true);
  };

  const handleCloseDeleteCertificate = () => {
    setShowDeleteCertificate(false);
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
              d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
            />
          </svg>

          <div>
            <h1 className="text-2xl font-semibold">Danh sách chứng nhận</h1>
            <p className="text-gray-500">
              Bạn có thể tra cứu và huỷ chứng nhận sinh viên tại đây
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={handleAddCertificate}
            className="rounded-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
          >
            Thêm chứng nhận
          </button>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">
          Danh sách chứng nhận
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
            placeholder="Tìm kiếm chủ đề"
            className="rounded-md border-2 p-2"
          />
        </div>
        <table className="mt-4 w-full">
          <thead>
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Mã chứng nhận</th>
              <th className="text-left">Tên sự kiện</th>
              <th className="text-left">Mã sinh viên</th>
              <th className="text-left">Tên sinh viên</th>
              <th className="text-left">Ngày tạo</th>
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
                <td>{item.certCode}</td>
                <td>{item.eventName}</td>
                <td>{item.studentCode}</td>
                <td>{item.studentName}</td>
                <td>
                  {dayjs(item.dateCreated).format("DD/MM/YYYY lúc HH:mm:ss")}
                </td>
                <td>
                  <button
                    onClick={handleEditCertificate}
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
                    onClick={handleDeleteCertificate}
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
      {showAddCertificate && (
        <AddCertificate onClose={handleCloseAddCertificate} />
      )}
      {showEditCertificate && (
        <EditCertificate onClose={handleCloseEditCertificate} />
      )}
      {showDeleteCertificate && (
        <DeleteCertificate onClose={handleCloseDeleteCertificate} />
      )}
    </div>
  );
};

export default Certificate;