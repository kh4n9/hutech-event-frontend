import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../../../../services/colab/eventService";

const Event = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [timeFrom, setTimeFrom] = useState(""); // Thời gian bắt đầu
  const [timeTo, setTimeTo] = useState(""); // Thời gian kết thúc

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents();

        // Xử lý song song tất cả các event
        const eventsWithTopics = await Promise.all(
          events.map(async (event) => {
            // Tạo bản sao của event và thêm thuộc tính topics
            return { ...event };
          }),
        );

        setData(eventsWithTopics);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Xử lý phân trang và tìm kiếm
  useEffect(() => {
    // Lọc theo từ khóa
    let filteredData = data;

    // Lọc theo ngày
    if (timeFrom && timeTo) {
      const from = dayjs(timeFrom).startOf("day");
      const to = dayjs(timeTo).endOf("day");
      filteredData = filteredData.filter((item) => {
        const time = dayjs(item.time, "DD-MM-YYYY HH:mm:ss");
        return time.isAfter(from) && time.isBefore(to);
      });
    }

    setTableData(filteredData);
  }, [timeFrom, timeTo, data]);

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

        <div className="mt-4 grid grid-cols-4 gap-4">
          {tableData.map((item) => (
            <Link key={item._id} to={`/colab/event/${item._id}`} className="">
              <div className="rounded-md bg-gradient-to-r from-teal-400 to-blue-500 p-2 shadow-md transition-all duration-300 ease-in-out hover:from-pink-500 hover:to-orange-500">
                <h1 className="p-2 text-2xl font-semibold text-white">
                  {item.name}
                </h1>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>

                  <label className="p-2 text-white">
                    {dayjs(item.time).format("DD/MM/YYYY HH:mm")}
                  </label>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>

                  <label className="p-2 text-white">
                    Địa điểm: {item.location}
                  </label>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
