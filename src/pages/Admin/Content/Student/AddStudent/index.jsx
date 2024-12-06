// eslint-disable-next-line react/prop-types
const AddStudent = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Tạo mới sinh viên</h1>
        <form className="mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mã số sinh viên
            </label>
            <input
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập mã số sinh viên"
              maxLength={10}
              pattern="\d{10}"
              title="Mã số sinh viên phải là 10 chữ số"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Họ tên sinh viên
            </label>
            <input
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập họ tên"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Lớp
            </label>
            <input
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập lớp"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Ban cán sự
            </label>
            <input
              type="checkbox"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Facebook
            </label>
            <input
              type="text"
              className="w-full rounded-md border-2 p-2"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="rounded-md bg-gray-200 px-4 py-2"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
