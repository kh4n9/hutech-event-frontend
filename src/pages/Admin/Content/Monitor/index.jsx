const MonitorList = () => {
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <div>
            <h1 className="text-2xl font-semibold">Danh sách ban cán sự</h1>
            <p className="text-gray-500">
              Bạn có thể cập nhật danh sách ban cán sự lớp tại đây. Ban cán sự
              lớp có quyền tải danh sách chứng nhận của sinh viên trong lớp.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-white p-4 shadow-md">
        <h5 className="text-2xl font-semibold text-gray-700">
          DANH SÁCH BAN CÁN SỰ
        </h5>
        <hr className="my-2" />
        <p className="mb-2 text-sm text-gray-500">
          Mỗi dòng là 01 (một) mã số sinh viên, bạn có thể cập nhật danh sách
          ban cán sự lớp tại đây hoặc tại menu{" "}
          <a className="text-blue-500" href="/admin/studen">
            Sinh Viên
          </a>
        </p>
        <p className="mb-2 text-sm text-gray-500">
          Mã số sinh viên phải hợp lệ như thiết lập của hệ thống. Mã số sinh
          viên không hợp lệ sẽ bị bỏ qua. Mã số sinh viên chưa có thông tin sẽ
          được hệ thống tạo thông tin tự động.
        </p>
        <textarea
          id="monitorIds"
          placeholder="Nhập mã số sinh viên, mỗi mã trên một dòng..."
          className="h-40 w-full rounded-lg border border-gray-400 p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
        <button className="rounded-md border border-gray-400 bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-200">
          Lưu lại
        </button>
      </div>
    </div>
  );
};

export default MonitorList;
