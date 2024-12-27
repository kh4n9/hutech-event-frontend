import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getEvents } from "../../../../services/colab/eventService";
import DetailReportMonitor from "./DetailReportMonitor";

const ReportMonitor = () => {
  const [data, setData] = useState([]);
  const [eventList, setEventList] = useState([]); // Dữ liệu hiển thị trên bảng
  const [dayFrom, setDayFrom] = useState(""); // Ngày bắt đầu
  const [dayTo, setDayTo] = useState(""); // Ngày kết thúc
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setData(events);
    };
    fetchEvents();
  }, []);

  // Lọc danh sách sự kiện dựa trên khoảng thời gian
  useEffect(() => {
    if (dayFrom || dayTo) {
      // Nếu có khoảng thời gian, hiển thị sự kiện trong khoảng thời gian
      setEventList(
        data
          .filter((item) => {
            const date = new Date(item.date);
            return (
              (!dayFrom || date >= new Date(dayFrom)) &&
              (!dayTo || date <= new Date(dayTo))
            );
          })
          .map((item) => ({
            ...item,
            checked: false,
          })),
      );
    } else {
      // Nếu không có khoảng thời gian, hiển thị tất cả sự kiện
      setEventList(
        data.map((item) => ({
          ...item,
          checked: false,
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayFrom, dayTo, data]);

  // bấm vào đây để checked tất cả các sự kiện
  const handleCheckAll = () => {
    setEventList(
      eventList.map((item) => ({
        ...item,
        checked: true,
      })),
    );
  };

  const handleShowResult = () => {
    if (eventList.filter((item) => item.checked).length === 0) {
      alert("Vui lòng chọn ít nhất 1 sự kiện");
      return;
    }
    setShowDetail(true);
  };

  const handleCloseResult = () => {
    setShowDetail(false);
  };

  return (
    <div>
      {showDetail ? (
        <DetailReportMonitor
          eventList={eventList}
          onClose={handleCloseResult}
        />
      ) : (
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
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>

              <div>
                <h1 className="text-2xl font-semibold">
                  Tra cứu ban cán sự tham gia sự kiện
                </h1>
                <p className="text-gray-500">
                  Bạn có thể tra cứu danh sách số lượng sinh viên theo lớp tham
                  gia các sự kiện tại đây
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-md bg-white p-4 shadow-md">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">
                BỘ LỌC DANH SÁCH
              </h2>
            </div>
            <hr className="my-4" />
            <p className="mt-2 text-gray-500">
              Các sự kiện/hội thảo mà bạn muốn tra cứu (vui lòng chọn ít nhất 1
              sự kiện)
            </p>

            <div className="my-2 flex items-center justify-between">
              <div>
                <label className="text-gray-500">Lọc sự kiện từ ngày</label>
                <br />
                <input
                  type="date"
                  className="rounded-md border-2 px-4 py-2"
                  onChange={(e) => setDayFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-500">Đến ngày</label>
                <br />
                <input
                  type="date"
                  className="rounded-md border-2 px-4 py-2"
                  onChange={(e) => setDayTo(e.target.value)}
                />
              </div>
            </div>

            <div className="my-2">
              <button
                className="rounded-md py-2 text-blue-500 underline hover:text-blue-700"
                onClick={handleCheckAll}
              >
                Bấm vào đây để chọn toàn bộ hội thảo bên dưới
              </button>
            </div>
            <div className="my-2 flex flex-wrap items-center">
              {eventList.map((item) => (
                <div
                  key={item._id}
                  className="m-2 cursor-pointer rounded-md bg-gray-100 p-2"
                >
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={item.checked}
                      onChange={() =>
                        setEventList(
                          eventList.map((event) =>
                            event._id === item._id
                              ? { ...event, checked: !event.checked }
                              : event,
                          ),
                        )
                      }
                    />
                    <div>
                      <span>{item.name}</span>
                      <div className="flex items-center justify-between text-sm text-gray-500">
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
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                          />
                        </svg>

                        {dayjs(item.date).format("DD/MM/YYYY")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleShowResult}
              className="flex w-full items-center justify-center gap-2 rounded-md p-3 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200 focus:outline-none sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m2.15-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
              Tra cứu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportMonitor;
