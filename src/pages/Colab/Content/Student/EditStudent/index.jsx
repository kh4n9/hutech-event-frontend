/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  getStudentById,
  updateStudent,
} from "../../../../../services/colab/studentService";
import { getEventById } from "../../../../../services/colab/eventService";
import { getStudentEventsByStudentId } from "../../../../../services/colab/studentEventService";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";

const EditStudent = ({ onClose, id }) => {
  const [student, setStudent] = useState({
    studentCode: "",
    fullname: "",
    class: "",
    isMonitor: false,
    email: "",
    facebook: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [showHistoryJoin, setShowHistoryJoin] = useState(false);
  const [numberItemShow, setNumberItemShow] = useState(10);
  const [search, setSearch] = useState("");
  const [studentEvents, setStudentEvents] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentData = await getStudentById(id);
        if (studentData) setStudent(studentData);
      } catch (error) {
        setError(error);
      }
    };

    const fetchStudentEvents = async () => {
      try {
        const events = await getStudentEventsByStudentId(id);
        setStudentEvents(events);
      } catch (error) {
        setError(error);
      }
    };

    fetchStudent();
    fetchStudentEvents();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all(
          studentEvents.map(async (item) => {
            const event = await getEventById(item.eventId);
            return {
              eventId: item.eventId,
              eventdate: event.date,
              eventname: event.name,
              checkinTime: item.checkinTime,
              checkoutTime: item.checkoutTime,
            };
          }),
        );
        setTableData(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [studentEvents]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const studentCode = searchParams.get("studentCode");
    if (studentCode) {
      setSearch(studentCode);
    }
  }, [location.search]);

  const handleSubmit = async () => {
    try {
      const { studentCode, email, facebook, phone } = student;

      if (!/^\d{10,11}$/.test(studentCode)) {
        setError("Mã sinh viên phải là số và có độ dài từ 10-11 ký tự");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Email không hợp lệ");
        return;
      }

      if (facebook && !/^https?:\/\/(www\.)?facebook.com\/.*/.test(facebook)) {
        setError(
          "Link Facebook không hợp lệ. Vui lòng nhập link profile Facebook hoặc để trống",
        );
        return;
      }

      if (phone && !/^(0|84)(3|5|7|8|9)\d{8}$/.test(phone)) {
        setError("Số điện thoại không hợp lệ");
        return;
      }

      await updateStudent(id, student);
      onClose();
    } catch (error) {
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToEvent = (eventId) => {
    navigate(`/colab/event/${eventId}`);
  };

  const filteredData = tableData
    .filter((item) =>
      item.eventname.toLowerCase().includes(search.toLowerCase()),
    )
    .slice((page - 1) * numberItemShow, page * numberItemShow);

  const totalPages = Math.ceil(
    tableData.filter((item) =>
      item.eventname.toLowerCase().includes(search.toLowerCase()),
    ).length / numberItemShow,
  );

  const handleToCefList = () => {
    navigate("/colab/certificate?studentCode=" + student.studentCode);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 rounded-md bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <button
            className={
              showHistoryJoin ? "" : "border-x-2 border-t-2 p-2 text-blue-500"
            }
            onClick={() => setShowHistoryJoin(false)}
          >
            Thông tin sinh viên
          </button>
          <button
            className={
              showHistoryJoin ? "border-x-2 border-t-2 p-2 text-blue-500" : ""
            }
            onClick={() => setShowHistoryJoin(true)}
          >
            Lịch sử tham gia hội thảo
          </button>
          <button onClick={handleToCefList}>Danh sách chứng nhận</button>
        </div>

        {showHistoryJoin ? (
          <div className="mt-4 rounded-md shadow-md">
            <h1>DANH SÁCH SINH VIÊN THAM GIA</h1>
            <hr />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label>Xem</label>
                <select
                  value={numberItemShow}
                  onChange={(e) => setNumberItemShow(Number(e.target.value))}
                  className="rounded-md border p-2"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <label>Bản ghi</label>
              </div>
              <div className="flex items-center gap-2">
                <label>Tìm kiếm:</label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="rounded-md border p-2"
                  placeholder="Nhập tên sự kiện"
                />
              </div>
            </div>

            <table className="mt-4 w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên sự kiện</th>
                  <th>Ngày tổ chức</th>
                  <th>Check in</th>
                  <th>Check out</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{(page - 1) * numberItemShow + index + 1}</td>
                    <td>{item.eventname}</td>
                    <td>
                      {dayjs(item.eventdate).format("DD-MM-YYYY lúc HH:mm:ss")}
                    </td>
                    <td>
                      {dayjs(item.checkinTime).format(
                        "DD-MM-YYYY lúc HH:mm:ss",
                      )}
                    </td>
                    <td>
                      {item.checkoutTime
                        ? dayjs(item.checkoutTime).format(
                            "DD-MM-YYYY lúc HH:mm:ss",
                          )
                        : null}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToEvent(item.eventId)}
                        className="rounded-md bg-green-300 p-2 shadow-md"
                      >
                        Danh sách tham gia
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between">
              <button
                className="mt-2 rounded-md px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
                onClick={onClose}
              >
                Đóng
              </button>

              <div className="flex items-center gap-2">
                <button
                  className="rounded-md px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Trước
                </button>
                <label>{page}</label>
                <button
                  className="rounded-md px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            {[
              { label: "Mã sinh viên", name: "studentCode", type: "text" },
              { label: "Họ tên", name: "fullname", type: "text" },
              { label: "Lớp", name: "class", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Facebook", name: "facebook", type: "text" },
              { label: "Số điện thoại", name: "phone", type: "text" },
            ].map(({ label, name, type }) => (
              <div className="mb-4" key={name}>
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  name={name}
                  value={student[name]}
                  onChange={handleChange}
                  type={type}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder={`Nhập ${label.toLowerCase()}`}
                />
              </div>
            ))}
            <div className="mb-4 flex items-center gap-2">
              <input
                name="isMonitor"
                type="checkbox"
                className="mt-1"
                checked={student.isMonitor}
                onChange={handleChange}
              />
              <label className="block text-sm font-medium text-gray-700">
                Là ban cán sự
              </label>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4 flex items-center justify-end gap-2">
              <button
                className="rounded-md px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-md px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
              >
                Lưu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditStudent;
