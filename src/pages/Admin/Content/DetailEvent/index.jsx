import { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import dayjs from "dayjs";

const DetailEvent = () => {
  const data = [
    {
      id: 1,
      studentCode: "2180603432",
      studentName: "Hoàng Minh Khang",
      className: "21DTHB1",
      email: "mkhoangvip@gmail.com",
      phone: "0123456789",
      checkIn: dayjs("2021-10-10 10:00:00").format("YYYY-MM-DD HH:mm:ss"),
      checkOut: dayjs("2021-10-10 10:00:00").format("YYYY-MM-DD HH:mm:ss"),
      checkInBy: "admin",
    },
    {
      id: 2,
      studentCode: "2180603432",
      studentName: "Hoàng Minh Khang",
      className: "21DTHB1",
      email: "mkhoangvip@gmail.com",
      phone: "0123456789",
      checkIn: dayjs("2021-10-10 10:00:00").format("YYYY-MM-DD HH:mm:ss"),
      checkOut: null,
      checkInBy: "admin",
    },
    {
      id: 3,
      studentCode: "2180603432",
      studentName: "Hoàng Minh Khang",
      className: "21DTHB1",
      email: "mkhoangvip@gmail.com",
      phone: "0123456789",
      checkIn: dayjs("2021-10-10 10:00:00").format("YYYY-MM-DD HH:mm:ss"),
      checkOut: dayjs("2021-10-10 10:00:00").format("YYYY-MM-DD HH:mm:ss"),
      checkInBy: "admin",
    },
    {
      id: 4,
      studentCode: "2180603432",
      className: "21DTHB1",
      studentName: "Hoàng Minh Khang",
      email: "mkhoangvip@gmail.com",
      phone: "0123456789",
      checkIn: dayjs("2021-10-10 10:00:00").format("YYYY-MM-DD HH:mm:ss"),
      checkOut: null,
      checkInBy: "admin",
    },
    {
      id: 5,
      studentCode: "2180603432",
      className: "21DTHB1",
      studentName: "Hoàng Minh Khang",
      email: "mkhoangvip@gmail.com",
      phone: "0123456789",
      checkIn: dayjs("2021-10-10 10:00:00").format("YYYY-MM-DD HH:mm:ss"),
      checkOut: dayjs("2021-10-10 10:00:00").format("YYYY-MM-DD HH:mm:ss"),
      checkInBy: "admin",
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [quantity, setQuantity] = useState(10); // Số bản ghi trên mỗi trang
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPage, setTotalPage] = useState(1); // Tổng số trang
  const [search, setSearch] = useState(""); // Từ khóa tìm kiếm
  const [mode, setMode] = useState("check-in"); // Chế độ xem, sửa, thêm mới
  const tableRef = useRef(null);

  // download excel
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Event 1",
    sheet: "Users",
  });

  // Xử lý phân trang và tìm kiếm
  useEffect(() => {
    // Lọc theo từ khóa
    const filteredData = data.filter(
      (item) =>
        item.studentName.toLowerCase().includes(search.toLowerCase()) ||
        item.studentCode.toLowerCase().includes(search.toLowerCase()) ||
        item.className.toLowerCase().includes(search.toLowerCase()),
    );

    // Tính tổng số trang
    const pages = Math.ceil(filteredData.length / quantity);
    setTotalPage(pages);

    // Lấy dữ liệu trang hiện tại
    const startIndex = (page - 1) * quantity;
    const currentData = filteredData.slice(startIndex, startIndex + quantity);
    setTableData(currentData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, page, search, mode]);

  // Xử lý chuyển trang
  const handleNextPage = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>

          <div>
            <h1 className="text-2xl font-semibold">Event 1</h1>
            <p className="text-gray-500">Danh sách check-in, check-out</p>
          </div>
        </div>
        {mode === "check-in" && (
          <div className="flex space-x-0">
            <button
              onClick={() => setMode("check-out")}
              className="rounded-l-md bg-gray-400 px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
            >
              Chế độ checkin
            </button>
            <button
              onClick={() => setMode("check-out")}
              className="rounded-r-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
            >
              Chế độ checkout
            </button>
          </div>
        )}
        {mode === "check-out" && (
          <div className="flex space-x-0 transition-all">
            <button
              onClick={() => setMode("check-in")}
              className="rounded-l-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
            >
              Chế độ checkin
            </button>
            <button
              onClick={() => setMode("check-in")}
              className="rounded-r-md bg-gray-400 px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
            >
              Chế độ checkout
            </button>
          </div>
        )}
      </div>

      <div className="my-5 flex space-x-0 rounded-md text-lg shadow-md">
        {mode === "check-in" && (
          <input
            type="text"
            placeholder="Nhập mã sinh viên để check-in"
            className="w-full rounded-l-md p-2"
          />
        )}
        {mode === "check-out" && (
          <input
            type="text"
            placeholder="Nhập mã sinh viên để check-out"
            className="w-full rounded-l-md p-2"
          />
        )}

        <div className="w-fit border-x-2 bg-white p-2 hover:bg-blue-200">
          <button className="">Nhập</button>
        </div>
        <div className="min-w-fit rounded-r-md bg-white p-2 hover:bg-blue-200">
          <button className="">Nhập hàng loạt</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-grow items-center justify-between rounded-md bg-white p-2 shadow-md">
          <div>
            <h1 className="text-xl font-semibold text-gray-700">
              Tổng số người tham gia
            </h1>
            <span className="text-gray-500">Số người đã check-in</span>
          </div>
          <h1 className="text-4xl font-semibold text-gray-700">100</h1>
        </div>
        <div className="flex flex-grow items-center justify-between rounded-md bg-white p-2 shadow-md">
          <div>
            <h1 className="text-xl font-semibold text-gray-700">
              Tổng số người đã check-out
            </h1>
            <span className="text-gray-500">Tổng số người đã check-out</span>
          </div>
          <h1 className="text-4xl font-semibold text-gray-700">100</h1>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-700">
            Danh sách {mode === "check-in" ? "check-in" : "check-out"}
          </h1>
          <div className="flex space-x-0">
            <button className="rounded-l-md bg-blue-500 p-2 text-white hover:bg-blue-700">
              Quét lại danh sách
            </button>
            <button className="bg-yellow-500 p-2 text-white hover:bg-yellow-700">
              Xoá MSSV không hợp lệ
            </button>
            <button
              onClick={onDownload}
              className="rounded-r-md bg-green-500 p-2 text-white hover:bg-green-700"
            >
              Xuất file excel
            </button>
          </div>
        </div>
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
        <div className="overflow-auto">
          <table ref={tableRef} className="mt-4 w-full">
            <thead>
              <tr>
                <th className="text-left">#</th>
                <th className="text-left">Họ tên</th>
                <th className="text-left">MSSV</th>
                <th className="text-left">Lớp</th>
                <th className="text-left">Email</th>
                <th className="text-left">SĐT</th>
                <th className="text-left">Checkin</th>
                <th className="text-left">Checkout</th>
                <th className="text-left">Người checkin</th>
                <th className="text-left">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr
                  key={item.id}
                  className="border-y-2 border-gray-200 hover:bg-gray-100"
                >
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.studentName}</td>
                  <td className="p-2">{item.studentCode}</td>
                  <td className="p-2">{item.className}</td>
                  <td className="p-2">{item.email}</td>
                  <td className="p-2">{item.phone}</td>
                  <td className="p-2">
                    {dayjs(item.checkIn).format("DD/MM/YYYY lúc HH:mm:ss")}
                  </td>
                  <td className="p-2">
                    {item.checkOut
                      ? dayjs(item.checkOut).format("DD/MM/YYYY lúc HH:mm:ss")
                      : ""}
                  </td>
                  <td className="p-2">{item.checkInBy}</td>
                  <td className="p-2">
                    {!item.checkOut ? (
                      <button className="rounded-md bg-green-500 p-2 text-white hover:bg-green-700">
                        Checkout
                      </button>
                    ) : (
                      <button className="rounded-md bg-red-500 p-2 text-white hover:bg-red-700">
                        Huỷ checkout
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    </div>
  );
};

export default DetailEvent;
