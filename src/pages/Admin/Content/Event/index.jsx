import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AddEvent from "./AddEvent";
import DeleteEvent from "./DeleteEvent";
import EditEvent from "./EditEvent";
import { Link } from "react-router-dom";

const Event = () => {
  const data = [
    {
      id: 1,
      title: "event 1",
      time: dayjs("10-10-2020 19:00:00").format("DD-MM-YYYY HH:mm:ss"),
      location: "E1-10.1",
      hostBy: "Khoa CNTT",
      allowCheckin: true,
      hidden: false,
      // số lượng người checkin
      checkin: 0,
      // số lượng người đăng ký
      register: 0,
      topic: [
        {
          id: 1,
          name: "topic 1",
        },
        {
          id: 2,
          name: "topic 2",
        },
      ],
    },
    {
      id: 2,
      title: "event 2",
      time: dayjs("10-11-2020 19:00:00").format("DD-MM-YYYY HH:mm:ss"),
      location: "E1-10.1",
      hostBy: "Khoa CNTT",
      allowCheckin: true,
      hidden: true,
      checkin: 0,
      register: 0,
      topic: [
        {
          id: 1,
          name: "topic 1",
        },
        {
          id: 2,
          name: "topic 2",
        },
        {
          id: 3,
          name: "topic 3",
        },
      ],
    },
    {
      id: 3,
      title: "event 3",
      time: dayjs("10-12-2020 19:00:00").format("DD-MM-YYYY HH:mm:ss"),
      location: "E1-10.1",
      hostBy: "Khoa CNTT",
      allowCheckin: false,
      hidden: false,
      checkin: 0,
      register: 0,
      topic: [],
    },
    {
      id: 4,
      title: "event 4",
      time: dayjs("10-12-2020 19:00:00").format("DD-MM-YYYY HH:mm:ss"),
      location: "E1-10.1",
      hostBy: "Khoa CNTT",
      allowCheckin: false,
      hidden: false,
      checkin: 0,
      register: 0,
      topic: [
        {
          id: 1,
          name: "topic 1",
        },
      ],
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [quantity, setQuantity] = useState(10); // Số bản ghi trên mỗi trang
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPage, setTotalPage] = useState(1); // Tổng số trang
  const [search, setSearch] = useState(""); // Từ khóa tìm kiếm
  const [timeFrom, setTimeFrom] = useState(""); // Thời gian bắt đầu
  const [timeTo, setTimeTo] = useState(""); // Thời gian kết thúc
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [showDeleteEvent, setShowDeleteEvent] = useState(false);

  // Xử lý phân trang và tìm kiếm
  useEffect(() => {
    // Lọc theo từ khóa
    let filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );

    // Lọc theo ngày
    if (timeFrom && timeTo) {
      const from = dayjs(timeFrom).startOf("day");
      const to = dayjs(timeTo).endOf("day");
      filteredData = filteredData.filter((item) => {
        const time = dayjs(item.time, "DD-MM-YYYY HH:mm:ss");
        return time.isAfter(from) && time.isBefore(to);
      });
    }

    // Tính tổng số trang
    const pages = Math.ceil(filteredData.length / quantity);
    setTotalPage(pages);

    // Lấy dữ liệu trang hiện tại
    const startIndex = (page - 1) * quantity;
    const currentData = filteredData.slice(startIndex, startIndex + quantity);
    setTableData(currentData);
  }, [quantity, page, search, timeFrom, timeTo]);

  // Xử lý chuyển trang
  const handleNextPage = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Xử lý thêm mới sự kiện
  const handleAddEvent = () => {
    setShowAddEvent(true);
  };

  const handleCloseAddEvent = () => {
    setShowAddEvent(false);
  };

  // Xử lý sửa sự kiện
  const handleEditEvent = () => {
    setShowEditEvent(true);
  };

  const handleCloseEditEvent = () => {
    setShowEditEvent(false);
  };

  // Xử lý xóa sự kiện
  const handleDeleteEvent = () => {
    setShowDeleteEvent(true);
  };

  const handleCloseDeleteEvent = () => {
    setShowDeleteEvent(false);
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
            <h1 className="text-2xl font-semibold">Danh sách sự kiện</h1>
            <p className="text-gray-500">
              Bạn có thể tạo mới sự kiện để điểm danh hoặc xem danh sách sinh
              viên tham gia sự kiện tại đây
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={handleAddEvent}
            className="rounded-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
          >
            Thêm mới sự kiện
          </button>
        </div>
      </div>
      {/* Lọc theo ngày */}
      <div className="my-4 flex items-center justify-between">
        <div className="space-x-2">
          <label htmlFor="date" className="text-gray-500">
            Từ ngày
          </label>
          <input
            onChange={(e) => setTimeFrom(e.target.value)}
            type="date"
            className="rounded-md border-2 p-2"
          />
        </div>
        <div className="space-x-2">
          <label htmlFor="date" className="text-gray-500">
            Đến ngày
          </label>
          <input
            onChange={(e) => setTimeTo(e.target.value)}
            type="date"
            className="rounded-md border-2 p-2"
          />
        </div>
      </div>

      <div className="mt-4 rounded-md bg-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">
          Danh sách sự kiện
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
              <th className="text-left">Thời gian</th>
              <th className="text-left">Tên sự kiện</th>
              <th className="text-left">Địa điểm</th>
              <th className="text-left">Đơn vị</th>
              {/* checkin là switch checkbox input */}
              <th className="text-left">Checkin</th>
              {/* Hiển thị là switch checkbox input */}
              <th className="text-left">Hiển thị</th>
              {/* Số lượng tham gia */}
              <th className="text-left">Số lượng tham gia</th>
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
                <td>{dayjs(item.time).format("DD-MM-YYYY")}</td>
                <td>
                  <div>
                    {item.title}
                    <div className="mt-2 flex space-x-1">
                      {item.topic.map((topic) => (
                        <span
                          key={topic.id}
                          className="rounded-full bg-gray-500 p-0 px-1 text-[12px] text-white"
                        >
                          {topic.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td>{item.location}</td>
                <td>{item.hostBy}</td>
                {/* checkin là switch checkbox input customize lại kiểu checkbox là nút switch bật tắt */}
                <td>
                  <input
                    className="h-7 w-14"
                    type="checkbox"
                    checked={item.allowCheckin}
                  />
                </td>
                {/* Hiển thị là switch checkbox input */}
                <td>
                  <input
                    className="h-7 w-14 rounded-full"
                    type="checkbox"
                    checked={!item.hidden}
                  />
                </td>
                {/* Số lượng checkin / tổng số người đăng ký */}
                <td>
                  <label className="rounded-md bg-blue-500 p-1 text-white transition-all duration-300 ease-in-out hover:bg-blue-700">
                    {item.checkin}
                  </label>
                  <label className="ml-2 rounded-md bg-red-500 p-1 text-white transition-all duration-300 ease-in-out hover:bg-red-700">
                    {item.register}
                  </label>
                </td>
                <td>
                  <button
                    onClick={handleEditEvent}
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
                  <button className="ml-2 rounded-md bg-green-500 p-1 text-white hover:bg-green-700">
                    <Link to={`/admin/event/${item.id}`}>
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
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                      </svg>
                    </Link>
                  </button>

                  <button
                    onClick={handleDeleteEvent}
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
      {showAddEvent && <AddEvent onClose={handleCloseAddEvent} />}
      {showEditEvent && <EditEvent onClose={handleCloseEditEvent} />}
      {showDeleteEvent && <DeleteEvent onClose={handleCloseDeleteEvent} />}
    </div>
  );
};

export default Event;
