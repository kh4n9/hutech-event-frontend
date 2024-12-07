import { useState } from "react";

const Setting = () => {
  const [settings, setSettings] = useState({
    emailEnable: false,
    emailNotificationForCheckin: false,
    emailRequiredForCertificate: false,
    renderImage: true,
    emailUsername: "",
    emailPassword: "",
    emailBackupUsername: "",
    emailBackupPassword: "",
    validateStudentCodeRegex: "^\\d{10,11}$",
    imgurLink: "",
    imgurToken: "",
    facebookAppId: "",
    facebookAppSecret: "",
    backupFrequency: 0,
    backupEmail: "",
    apiKey: "",
    apiWhiteList: "",
    mobileSuccessContent: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    const currentDateTime = new Date().toLocaleString();
    alert(`Cài đặt đã được lưu vào lúc: ${currentDateTime}`);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cài Đặt Hệ Thống</h1>
      <form className="space-y-8">
        {/* Cài đặt Email */}
        <section className="p-6 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Cài Đặt Email</h2>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="emailEnable"
                checked={settings.emailEnable}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <span className="ml-2 text-gray-700">Kích hoạt thông báo qua email</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="emailNotificationForCheckin"
                checked={settings.emailNotificationForCheckin}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <span className="ml-2 text-gray-700">Thông báo qua email cho sinh viên khi checkin sự kiện</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="emailRequiredForCertificate"
                checked={settings.emailRequiredForCertificate}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <span className="ml-2 text-gray-700">Bắt buộc sinh viên đăng nhập/xác thực email để lấy chứng nhận</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Settings Fields */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tên tài khoản Email chính</label>
              <input
                type="text"
                name="emailUsername"
                value={settings.emailUsername}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Mật khẩu Email chính</label>
              <input
                type="password"
                name="emailPassword"
                value={settings.emailPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            {/* Backup Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tên tài khoản Email dự phòng</label>
              <input
                type="text"
                name="emailBackupUsername"
                value={settings.emailBackupUsername}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Mật khẩu Email dự phòng</label>
              <input
                type="password"
                name="emailBackupPassword"
                value={settings.emailBackupPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </section>

        {/* Cài đặt Imgur */}
        <section className="p-6 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Cài Đặt Imgur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">API Link của Imgur</label>
              <input
                type="text"
                name="imgurLink"
                value={settings.imgurLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Token của Imgur</label>
              <input
                type="text"
                name="imgurToken"
                value={settings.imgurToken}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </section>

        {/* Additional Settings */}
        <section className="p-6 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Các Cài Đặt Khác</h2>
          {/* Database Backup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Database Backup Frequency</label>
              <input
                type="number"
                name="backupFrequency"
                value={settings.backupFrequency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Database Backup Email Target</label>
              <input
                type="text"
                name="backupEmail"
                value={settings.backupEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* API Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">API Key for Mobile App</label>
              <input
                type="text"
                name="apiKey"
                value={settings.apiKey}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">White List IP Call API</label>
              <input
                type="text"
                name="apiWhiteList"
                value={settings.apiWhiteList}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Mobile App Content */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nội dung khi đăng nhập thành công trên mobile app
            </label>
            <textarea
              name="mobileSuccessContent"
              value={settings.mobileSuccessContent}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-white px-4 py-2 shadow-md border border-gray-400 transition-all duration-300 ease-in-out hover:bg-blue-200 hover:border-blue-500"
          >
            Lưu Cài Đặt
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
