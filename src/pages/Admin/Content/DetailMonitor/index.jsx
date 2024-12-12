import { useState,  useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
const DetailMonitor = () => {
  const data = [
    {
      id: 1,
      studentCode: "2180603432",
      studentName: "Hoàng Minh Khang",
      className: "21DTHB1",
      eventName: [
        { id: 1, title: "Event 1", isJoined: true },
        { id: 2, title: "Event 2", isJoined: false },
        { id: 3, title: "Event 3", isJoined: true },
        { id: 4, title: "Event 4", isJoined: true },
      ],
    },
    {
      id: 2,
      studentCode: "2180603456",
      studentName: "Nguyễn Văn A",
      className: "21DTHB2",
      eventName: [
        { id: 1, title: "Event 1", isJoined: true },
        { id: 2, title: "Event 2", isJoined: true },
        { id: 3, title: "Event 3", isJoined: false },
        { id: 4, title: "Event 4", isJoined: true },
      ],
    },
  ];
  
  const tableRef = useRef(null);
  const [tableData] = useState(data);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "DanhSachSinhVien ",
    sheet: "Students",
  });
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
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
            <h1 className="text-2xl font-semibold">Tra cứu ban cán sự lớp tham gia sự kiện</h1>
            <p className="text-gray-500">
            Bạn có thể tra cứu danh sách ban cán sự tham gia các sự kiện tại đây
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef}  className="w-full border border-gray-200">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">MSSV</th>
              <th className="border px-4 py-2">Họ và tên</th>
              <th className="border px-4 py-2">Lớp</th>
              <th className="border px-4 py-2">Event 1</th>
              <th className="border px-4 py-2">Event 2</th>
              <th className="border px-4 py-2">Event 3</th>
              <th className="border px-4 py-2">Event 4</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{student.id}</td>
                <td className="border px-4 py-2">{student.studentCode}</td>
                <td className="border px-4 py-2">{student.studentName}</td>
                <td className="border px-4 py-2">{student.className}</td>
                {student.eventName.map((event) => (
                  <td key={event.id} className="border px-4 py-2">
                    {event.isJoined ? "✅" : "❌"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export and Back buttons */}
      <div className="mt-4 flex items-center space-x-2">
            <button
              onClick={onDownload}
              className="rounded-r-md bg-green-500 p-2 text-white hover:bg-green-700"
            >
              Xuất file excel
            </button>
          <button className="rounded-l-md bg-blue-500 p-2 text-white hover:bg-blue-700">
            Quét lại danh sách
          </button>
      </div>
    </div>
  );
};

export default DetailMonitor;
