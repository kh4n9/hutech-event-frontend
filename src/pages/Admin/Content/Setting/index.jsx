const Setting = () => {
  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Cài đặt hệ thống
      </h1>
      {/* Cài đặt Email */}
      <div className="rounded-lg p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Cài Đặt Email
        </h2>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="emailEnable"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
            />
            <span className="ml-2 text-gray-700">
              Kích hoạt thông báo qua email
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="emailNotificationForCheckin"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
            />
            <span className="ml-2 text-gray-700">
              Thông báo qua email cho sinh viên khi checkin sự kiện
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="emailRequiredForCertificate"
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
            />
            <span className="ml-2 text-gray-700">
              Bắt buộc sinh viên đăng nhập/xác thực email để lấy chứng nhận
            </span>
          </label>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Email Settings Fields */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Tên tài khoản Email chính
            </label>
            <input
              type="text"
              name="emailUsername"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Mật khẩu Email chính
            </label>
            <input
              type="password"
              name="emailPassword"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          {/* Backup Email */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Tên tài khoản Email dự phòng
            </label>
            <input
              type="text"
              name="emailBackupUsername"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Mật khẩu Email dự phòng
            </label>
            <input
              type="password"
              name="emailBackupPassword"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
      </div>

      {/* Cài đặt Imgur */}
      <div className="rounded-lg p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Cài Đặt Imgur
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              API Link của Imgur
            </label>
            <input
              type="text"
              name="imgurLink"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Token của Imgur
            </label>
            <input
              type="text"
              name="imgurToken"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="rounded-lg p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Các Cài Đặt Khác
        </h2>
        {/* Database Backup */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Database Backup Frequency
            </label>
            <input
              type="number"
              name="backupFrequency"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Database Backup Email Target
            </label>
            <input
              type="text"
              name="backupEmail"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* API Settings */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              API Key for Mobile App
            </label>
            <input
              type="text"
              name="apiKey"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              White List IP Call API
            </label>
            <input
              type="text"
              name="apiWhiteList"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Mobile App Content */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Nội dung khi đăng nhập thành công trên mobile app
          </label>
          <textarea
            name="mobileSuccessContent"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="rounded-md p-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200">
          Lưu Cài Đặt
        </button>
      </div>
    </div>
  );
};

export default Setting;
