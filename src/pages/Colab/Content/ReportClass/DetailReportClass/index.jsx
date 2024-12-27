import { useState, useRef, useEffect } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { getStudents } from "../../../../../services/colab/studentService";
import { getStudentEventsByStudentId } from "../../../../../services/colab/studentEventService";

// eslint-disable-next-line react/prop-types
const DetailReportClass = ({ eventList, onClose }) => {
  const [classList, setClassList] = useState([]);
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]);
  const [eventCheckeds, setEventCheckeds] = useState([]);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "DanhSachSVTheoLop ",
    sheet: "Students-Class",
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
      const classList = students.reduce((acc, student) => {
        if (!acc.includes(student.class)) {
          acc.push(student.class);
        }
        return acc;
      }, []);
      setClassList(classList);
    };
    if (eventCheckeds.length > 0) {
      fetchStudents();
    }
  }, [eventCheckeds]);

  // duyệt qua từng lớp, lấy số lượng sinh viên tham gia sự kiện để hiển thị trên bảng
  useEffect(() => {
    const fetchTableData = async () => {
      const data = [];
      for (const classItem of classList) {
        const classData = {
          class: classItem,
          events: [],
        };
        for (const eventChecked of eventCheckeds) {
          // lấy số lượng sinh viên tham gia sự kiện
          const students = await getStudents();
          const studentInClass = students.filter(
            (student) => student.class === classItem,
          );
          let eventCount = 0;
          for (const student of studentInClass) {
            const studentEvents = await getStudentEventsByStudentId(
              student._id,
            );
            const event = studentEvents.filter(
              (studentEvent) => studentEvent.eventId === eventChecked._id,
            );
            eventCount += event.length;
          }
          classData.events.push(eventCount);
        }
        data.push(classData);
      }
      setTableData(data);
    };
    if (classList.length && eventCheckeds.length) {
      fetchTableData();
    }
  }, [classList, eventCheckeds]);

  return (
    <div>
      {/* Header */}
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
              Tra cứu số lượng SV theo lớp tham gia sự kiện
            </h1>
            <p className="text-gray-500">
              Bạn có thể tra cứu danh sách số lượng sinh viên theo lớp tham gia
              các sự kiện tại đây
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full border border-gray-200">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Lớp</th>
              {eventCheckeds.map((event) => (
                <th key={event._id} className="border px-4 py-2">
                  {event.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((classData, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{classData.class}</td>
                {classData.events.map((event, index) => (
                  <td key={index} className="border px-4 py-2">
                    {event}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export and Back buttons */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="rounded-md bg-red-500 p-2 text-white hover:bg-red-700"
        >
          Quay lại
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

export default DetailReportClass;
