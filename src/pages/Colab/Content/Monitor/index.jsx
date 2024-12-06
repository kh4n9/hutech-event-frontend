import { useState } from "react";

const MonitorList = () => {
  const [monitorIds, setMonitorIds] = useState(""); // State để lưu danh sách ID

  const handleInputChange = (e) => {
    setMonitorIds(e.target.value);
  };

  const handleSave = () => {
    const ids = monitorIds
      .split("\n") // Tách các ID theo dòng
      .map((id) => id.trim())
      .filter((id) => id !== ""); // Loại bỏ các dòng trống
    console.log("Danh sách ban cán sự:", ids);
    alert("Lưu thành công!");
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
            className="size-20 rounded-md border-2 bg-white p-2 shadow-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <div>
            <h1 className="text-2xl font-semibold">Danh sách ban cán sự</h1>
            <p className="text-gray-500">
            Bạn có thể cập nhật danh sách ban cán sự lớp tại đây. Ban cán sự lớp có quyền tải danh sách chứng nhận của sinh viên trong lớp.
            </p>
          </div>
        </div>
        
      </div>
      <div className="mt-4 rounded-md bg-white p-4 shadow-md">
        <h5 className="text-2xl font-semibold text-gray-700">
         DANH SÁCH BAN CÁN SỰ
        </h5>
        <hr className="my-2" />
        <table className="mt-4 w-full">
        <p className="text-sm text-gray-500 mb-2">
        Mỗi dòng là 01 (một) mã số sinh viên, bạn có thể cập nhật danh sách ban cán sự lớp tại đây hoặc tại menu <a className="text-blue-500" href="/admin/studen">Sinh Viên</a>
        </p>
        <p className="text-sm text-gray-500 mb-2">Mã số sinh viên phải hợp lệ như thiết lập của hệ thống. Mã số sinh viên không hợp lệ sẽ bị bỏ qua. Mã số sinh viên chưa có thông tin sẽ được hệ thống tạo thông tin tự động.</p>
        <textarea
          id="monitorIds"
          value={monitorIds}
          onChange={handleInputChange}
          placeholder="Nhập mã số sinh viên, mỗi mã trên một dòng..."
          className="w-full h-40 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
        ></textarea>
        <button
          onClick={handleSave}
          className="rounded-md bg-white px-4 py-2 shadow-md border border-gray-400 transition-all duration-300 ease-in-out hover:bg-blue-200 hover:border-blue-500"
        >
          Lưu lại
        </button>

    
        </table>
        
      </div>

    </div>
  );
};

export default MonitorList;

