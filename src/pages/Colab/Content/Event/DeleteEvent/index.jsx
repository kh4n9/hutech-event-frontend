// eslint-disable-next-line react/prop-types
const DeleteEvent = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/4 rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Xóa sự kiện</h1>
        <p className="mt-4">Bạn có chắc chắn muốn xóa sự kiện này không?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            Hủy
          </button>
          <button className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white">
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEvent;