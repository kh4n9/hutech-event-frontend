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
  // const handleEditEvent = () => {
  //   setShowEditEvent(true);
  // };

  const handleCloseEditEvent = () => {
    setShowEditEvent(false);
  };

  // // Xử lý xóa sự kiện
  // const handleDeleteEvent = () => {
  //   setShowDeleteEvent(true);
  // };

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
          DANH SÁCH SỰ KIỆN
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
        <div className="mt-4 grid grid-cols-4 gap-4">
                    {tableData.map((event) => (
                    <Link
                      key={event.id}
                      to={`/colab/event/${event.title}`}
                      className="rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 p-4 text-white shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                      <h2 className="text-lg font-semibold uppercase">{event.title}</h2>
                      <p className="mt-2 text-sm">
                        <span className="font-semibold">📅 Ngày: </span>
                        {event.time.split(" ")[0]}
                      </p>
                      <p className="mt-1 text-sm">
                        <span className="font-semibold">📍 Địa điểm: </span>
                        {event.location}
                      </p>
                    </Link>
                  ))}
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
      {showAddEvent && <AddEvent onClose={handleCloseAddEvent} />}
      {showEditEvent && <EditEvent onClose={handleCloseEditEvent} />}
      {showDeleteEvent && <DeleteEvent onClose={handleCloseDeleteEvent} />}
    </div>
  );
};

export default Event;
