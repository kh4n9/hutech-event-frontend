import { useState } from "react";
import { createStudent } from "../../../../../services/admin/studentService";

// eslint-disable-next-line react/prop-types
const AddStudent = ({ onClose }) => {
  const [studentCode, setStudentCode] = useState("");
  const [fullname, setFullname] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [isMonitor, setIsMonitor] = useState(false);
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      // Validate student code
      if (!/^\d{10,11}$/.test(studentCode)) {
        setError("Mã sinh viên phải là số và có độ dài từ 10-11 ký tự");
        return;
      }

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Email không hợp lệ");
        return;
      }

      // Validate facebook link
      if (facebook && !/^https?:\/\/(www\.)?facebook.com\/.*/.test(facebook)) {
        setError(
          "Link Facebook không hợp lệ. Vui lòng nhập link profile Facebook hoặc để trống",
        );
        return;
      }

      // Validate phone number (Vietnamese format)
      if (phone && !/^(0|84)(3|5|7|8|9)\d{8}$/.test(phone)) {
        setError("Số điện thoại không hợp lệ");
        return;
      }

      await createStudent({
        studentCode,
        fullname,
        class: studentClass,
        isMonitor,
        email,
        facebook,
        phone,
      });
      onClose();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Tạo mới sinh viên</h1>
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mã sinh viên
            </label>
            <input
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nhập mã sinh viên"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Họ tên
            </label>
            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nhập họ tên"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Lớp
            </label>
            <input
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nhập lớp"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={isMonitor}
              onChange={() => setIsMonitor(!isMonitor)}
            />
            <label className="block text-sm font-medium text-gray-700">
              Là ban cán sự
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nhập email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Facebook
            </label>
            <input
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nhập facebook"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nhập số điện thoại"
            />
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
              Tạo mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
