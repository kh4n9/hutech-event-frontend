import { useState, useRef, useEffect } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { getStudents } from "../../../../../services/colab/studentService";
import { getStudentEventsByStudentId } from "../../../../../services/colab/studentEventService";

// eslint-disable-next-line react/prop-types
const DetailReportStudent = ({ studentCodeList, eventList, onClose }) => {
  const [eventCheckeds, setEventCheckeds] = useState([]);
  const [studentInList, setStudentInList] = useState([]);
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "DanhSachSinhVien ",
    sheet: "Students",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      // eslint-disable-next-line react/prop-types
      const checkedEvents = eventList.filter((event) => event.checked);
      setEventCheckeds(checkedEvents);
    };
    fetchEvents();
  }, [eventList]);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await getStudents();
      const studentsInList = students.filter((student) =>
        // eslint-disable-next-line react/prop-types
        studentCodeList.includes(student.studentCode),
      );
      setStudentInList(studentsInList);
    };
    fetchStudents();
  }, [studentCodeList]);

  useEffect(() => {
    const fetchTableData = async () => {
      const data = [];
      for (const student of studentInList) {
        student.events = [];
        const studentEvents = await getStudentEventsByStudentId(student._id);
        for (const eventChecked of eventCheckeds) {
          const event = studentEvents.find(
            (studentEvent) => studentEvent.eventId === eventChecked._id,
          );
          student.events.push(event || null);
        }
        data.push(student);
      }
      setTableData(data);
    };
    if (studentInList.length && eventCheckeds.length) {
      fetchTableData();
    }
  }, [studentInList, eventCheckeds]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10 rounded-md border-2 p-2 shadow-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <div>
            <h1 className="text-2xl font-semibold">
              Tra cứu sinh viên tham gia sự kiện
            </h1>
            <p className="text-gray-500">
              Bạn có thể tra cứu danh sách sinh viên tham gia các sự kiện tại
              đây
            </p>
          </div>
        </div>
      </div>

      <div className="my-2 flex items-center space-x-2">
        <div className="flex items-center space-x-2 rounded-md bg-green-300 p-2">
          Ký hiệu X: Có check-in và check-out
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-blue-300 p-2">
          Ký hiệu O: Có check-in, chưa check-out
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full border border-gray-200">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">MSSV</th>
              <th className="border px-4 py-2">Họ và tên</th>
              <th className="border px-4 py-2">Lớp</th>
              {eventCheckeds.map((event) => (
                <th key={event._id} className="border px-4 py-2">
                  {event.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((student) => (
              <tr key={student._id} className="hover:bg-gray-100">
                <td className="max-w-2 overflow-hidden border px-4 py-2">
                  {student._id}
                </td>
                <td className="border px-4 py-2">{student.studentCode}</td>
                <td className="border px-4 py-2">{student.fullname}</td>
                <td className="border px-4 py-2">{student.class}</td>
                {student.events.map((event, index) => (
                  <td key={index} className="border px-4 py-2">
                    <div className="flex items-center justify-center">
                      {event === null ? "" : event.checkoutTime ? "X" : "O"}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export and Back buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="mt-4 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-700"
        >
          Trở lại
        </button>
        <div className="mt-4 flex items-center space-x-2">
          <button
            onClick={onDownload}
            className="rounded-md bg-green-500 p-2 text-white hover:bg-green-700"
          >
            Xuất file excel
          </button>
          <button className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-700">
            Quét lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailReportStudent;
