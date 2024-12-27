/* eslint-disable react/prop-types */

import { useEffect, useState, useRef } from "react";
import { getEventRegistrations } from "../../../../../services/admin/eventRegistrationService";
import { getStudentById } from "../../../../../services/admin/studentService";
import { getEventById } from "../../../../../services/admin/eventService";
import { useDownloadExcel } from "react-export-table-to-excel";

const EventRegistration = ({ eventId, onClose }) => {
  const [tableData, setTableData] = useState([]);
  const [event, setEvent] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEventById(eventId);
      setEvent(event);
    };
    fetchEvent();
    const fetchEventRegistrations = async () => {
      const eventRegistrations = await getEventRegistrations();
      const eventRegistration = eventRegistrations.filter(
        (eventRegistration) => eventRegistration.eventId === eventId,
      );
      const data = await Promise.all(
        eventRegistration.map(async (item) => {
          const student = await getStudentById(item.studentId);
          return {
            student,
            ...item,
          };
        }),
      );
      setTableData(data);
    };
    fetchEventRegistrations();
  }, [eventId]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: event.name,
    sheet: "Registrations",
  });

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-50">
      <div className="w-2/3 rounded-md bg-white p-6 shadow-md">
        <button
          type="button"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={onClose}
        >
          Trở lại
        </button>
        <h1 className="text-center text-2xl font-bold">{event.name}</h1>
        <button
          onClick={onDownload}
          className="rounded-md bg-green-500 p-2 text-white hover:bg-green-700"
        >
          Tải file excel
        </button>
        <div className="overflow-x-auto">
          <table ref={tableRef} className="w-full border border-gray-200">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Họ và tên</th>
                <th className="border px-4 py-2">MSSV</th>
                <th className="border px-4 py-2">Câu hỏi đến chương trình</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={data._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{data.student.fullname}</td>
                  <td className="border px-4 py-2">
                    {data.student.studentCode}
                  </td>
                  <td className="border px-4 py-2">{data.query}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
