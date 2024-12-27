/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudents } from "../../../services/guest/studentService";
import { getEventById } from "../../../services/guest/eventService";
import { createEventRegistration } from "../../../services/guest/eventRegistrationService";
import dayjs from "dayjs";

const Content = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [event, setEvent] = useState({});
  const [studentCode, setStudentCode] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventById(id);
        !event && navigate("/");
        setEvent(event);
      } catch (error) {
        setError(error);
      }
    };
    fetchEvent();
    const fetchStudents = async () => {
      try {
        const students = await getStudents();
        setStudents(students);
      } catch (error) {
        setError(error);
      }
    };
    fetchStudents();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const student = students.find(
        (student) => student.studentCode === studentCode,
      );
      if (!student) {
        setError("Sinh viên không tồn tại");
        return;
      }
      const registration = {
        eventId: event._id,
        studentId: student._id,
        query,
      };
      const req = await createEventRegistration(registration);
      req && alert("Đăng ký thành công");
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex-grow bg-slate-100">
      <div className="m-4 flex h-full items-center justify-center rounded-md bg-white p-4 shadow-md">
        <div className="w-2/3">
          <div>
            <h1 className="mb-4 text-center text-2xl font-semibold">
              Đăng ký sự kiện
            </h1>
            <div>
              <h1 className="mb-4 text-center text-2xl font-semibold">
                {event.name}
              </h1>
              <p className="mb-4 text-center text-gray-500">
                Sự kiện {event.name} sẽ diễn ra vào lúc{" "}
                {dayjs(event.date).format("HH:mm DD/MM/YYYY")} tại{" "}
                {event.location} để đăng ký tham gia sự kiện vui lòng điền thông
                tin bên dưới
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Mã số sinh viên
              </label>
              <input
                type="text"
                className="w-full rounded-md border-2 p-2"
                placeholder="Nhập mã số sinh viên"
                onChange={(e) => setStudentCode(e.target.value)}
              />
            </div>
            {/* câu hỏi cho chương trình */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Câu hỏi cho chương trình
              </label>
              <textarea
                type="text"
                className="w-full rounded-md border-2 p-2"
                placeholder="Nhập câu hỏi"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <button
              className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Đăng ký
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
