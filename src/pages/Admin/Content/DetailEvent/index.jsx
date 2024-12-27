import { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import dayjs from "dayjs";
import {
  getStudentEventsByEventId,
  createStudentEvent,
  updateStudentEvent,
} from "../../../../services/admin/studentEventService";
import { createCertify } from "../../../../services/admin/certifyService";
import {
  getStudentById,
  getStudents,
} from "../../../../services/admin/studentService";
import {
  getUserByToken,
  getUserById,
} from "../../../../services/admin/userService";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../../services/admin/eventService";
import EventRegistration from "./EventRegistration";

const DetailEvent = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [quantity, setQuantity] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("check-in");
  const [currentUser, setCurrentUser] = useState({});
  const tableRef = useRef(null);
  const [mssv, setMssv] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalCheckin, setTotalCheckin] = useState(0);
  const [totalCheckout, setTotalCheckout] = useState(0);
  const [event, setEvent] = useState({});
  const [eventIdRegis, setEventIdRegis] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserByToken();
      setCurrentUser(user);
      const studentEventsByEventId = await getStudentEventsByEventId(id);

      const response = await Promise.all(
        studentEventsByEventId.map(async (studentEvent) => {
          const student = await getStudentById(studentEvent.studentId);
          const user = await getUserById(studentEvent.userId);
          return {
            ...student,
            _id: studentEvent._id,
            checkIn: studentEvent.checkinTime,
            checkOut: studentEvent.checkoutTime,
            checkInBy: user.fullname,
          };
        }),
      );

      setData(response);
      setTotalCheckin(response.filter((item) => item.checkIn).length);
      setTotalCheckout(response.filter((item) => item.checkOut).length);
    };
    fetchData();

    const fetchEvent = async () => {
      const event = await getEventById(id);
      setEvent(event);
    };
    fetchEvent();
  }, [id, loading]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: event.name,
    sheet: "Users",
  });

  useEffect(() => {
    const filteredData = data.filter(
      (item) =>
        (item.studentName && item.studentName.includes(search)) ||
        (item.studentCode && item.studentCode.includes(search)) ||
        (item.className && item.className.includes(search)),
    );

    const pages = Math.ceil(filteredData.length / quantity);
    setTotalPage(pages);

    const startIndex = (page - 1) * quantity;
    const currentData = filteredData.slice(startIndex, startIndex + quantity);
    setTableData(currentData);
  }, [quantity, page, search, mode, data]);

  const handleNextPage = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const event = await getEventById(id);
      if (event.checkinLimitTime) {
        const currentTime = dayjs();
        const checkinStart = dayjs(event.checkinStart);
        const checkinEnd = dayjs(event.checkinEnd);
        if (
          currentTime.isBefore(checkinStart) ||
          currentTime.isAfter(checkinEnd)
        ) {
          setError("Thời gian check-in không hợp lệ");
          return;
        }
      }
      const students = await getStudents();
      const student = students.find((student) => student.studentCode === mssv);
      if (!student) {
        setError("Sinh viên không tồn tại");
        return;
      }
      await createStudentEvent({
        userId: currentUser._id,
        studentId: student._id,
        eventId: id,
      });
      await createCertify({
        studentId: student._id,
        eventId: id,
      });
      setError("");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const students = await getStudents();
      const student = students.find((student) => student.studentCode === mssv);
      if (!student) {
        setError("Sinh viên không tồn tại");
        return;
      }
      const studentEvents = await getStudentEventsByEventId(id);
      console.log(studentEvents);
      const studentEvent = studentEvents.find(
        (item) => item.studentId === student._id,
      );
      if (!studentEvent) {
        setError("Sinh viên chưa check-in");
        return;
      }
      console.log(studentEvent);
      await updateStudentEvent(studentEvent._id, {
        checkoutTime: dayjs().toISOString(),
      });
      setError("");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCheckOut = async (id) => {
    try {
      setLoading(true);
      await updateStudentEvent(id, {
        checkoutTime: null,
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout2 = async (id) => {
    try {
      setLoading(true);
      await updateStudentEvent(id, {
        checkoutTime: dayjs().toISOString(),
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnCloseEventRegis = () => {
    setEventIdRegis("");
  };

  return (
    <div>
      {eventIdRegis ? (
        <EventRegistration
          eventId={eventIdRegis}
          onClose={handleOnCloseEventRegis}
        />
      ) : (
        <>
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
                <h1 className="text-2xl font-semibold">{event.name}</h1>
                <p className="text-gray-500">Danh sách check-in, check-out</p>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex space-x-0">
              <button
                onClick={() => setMode("check-in")}
                className={`rounded-l-md px-4 py-2 shadow-md transition-all duration-300 ease-in-out ${
                  mode === "check-in"
                    ? "bg-gray-400"
                    : "bg-white hover:bg-blue-200"
                }`}
              >
                Chế độ checkin
              </button>
              <button
                onClick={() => setMode("check-out")}
                className={`rounded-r-md px-4 py-2 shadow-md transition-all duration-300 ease-in-out ${
                  mode === "check-out"
                    ? "bg-gray-400"
                    : "bg-white hover:bg-blue-200"
                }`}
              >
                Chế độ checkout
              </button>
            </div>
          </div>

          <div className="my-5 flex space-x-0 rounded-md text-lg shadow-md">
            <input
              value={mssv}
              onChange={(e) => setMssv(e.target.value)}
              type="text"
              placeholder={`Nhập mã sinh viên để ${mode === "check-in" ? "check-in" : "check-out"}`}
              className="w-full rounded-l-md p-2"
            />
            <div className="w-fit border-x-2 bg-white p-2 hover:bg-blue-200">
              <button
                onClick={mode === "check-in" ? handleCheckIn : handleCheckOut}
              >
                Nhập
              </button>
            </div>
            <div className="min-w-fit rounded-r-md bg-white p-2 hover:bg-blue-200">
              <button>Nhập hàng loạt</button>
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
              <h1 className="text-4xl font-semibold text-gray-700">
                {totalCheckin}
              </h1>
            </div>
            <div className="flex flex-grow items-center justify-between rounded-md bg-white p-2 shadow-md">
              <div>
                <h1 className="text-xl font-semibold text-gray-700">
                  Tổng số người đã check-out
                </h1>
                <span className="text-gray-500">
                  Tổng số người đã check-out
                </span>
              </div>
              <h1 className="text-4xl font-semibold text-gray-700">
                {totalCheckout}
              </h1>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-700">
                Danh sách {mode === "check-in" ? "check-in" : "check-out"}
              </h1>
              <div className="flex space-x-0">
                <button
                  onClick={() => setEventIdRegis(id)}
                  className="rounded-l-md bg-yellow-500 p-2 text-white hover:bg-yellow-700"
                >
                  Lấy danh sách đăng ký sự kiện
                </button>
                <button className="bg-blue-500 p-2 text-white hover:bg-blue-700">
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
                value={search}
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
                      key={item._id}
                      className="border-y-2 border-gray-200 hover:bg-gray-100"
                    >
                      <td className="max-w-2 overflow-hidden text-ellipsis whitespace-nowrap p-2">
                        {item._id}
                      </td>
                      <td className="p-2">{item.fullname}</td>
                      <td className="p-2">{item.studentCode}</td>
                      <td className="p-2">{item.className}</td>
                      <td className="p-2">{item.email}</td>
                      <td className="p-2">{item.phone}</td>
                      <td className="p-2">
                        {dayjs(item.checkIn).format("DD/MM/YYYY lúc HH:mm:ss")}
                      </td>
                      <td className="p-2">
                        {item.checkOut
                          ? dayjs(item.checkOut).format(
                              "DD/MM/YYYY lúc HH:mm:ss",
                            )
                          : "Chưa checkout"}
                      </td>
                      <td className="p-2">{item.checkInBy}</td>
                      <td className="p-2">
                        {!item.checkOut ? (
                          <button
                            onClick={() => handleCheckout2(item._id)}
                            className="rounded-md bg-green-500 p-2 text-white hover:bg-green-700"
                          >
                            Checkout
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRemoveCheckOut(item._id)}
                            className="rounded-md bg-red-500 p-2 text-white hover:bg-red-700"
                          >
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
        </>
      )}
    </div>
  );
};

export default DetailEvent;
