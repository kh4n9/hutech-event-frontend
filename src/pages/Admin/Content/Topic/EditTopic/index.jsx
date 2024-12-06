// eslint-disable-next-line react/prop-types
const EditTopic = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Chỉnh sửa chủ đề</h1>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên chủ đề
            </label>
            <input
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập tên chủ đề"
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

export default EditTopic;
