// eslint-disable-next-line react/prop-types
const DeleteCertificate = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-50">
      <div className="w-1/3 rounded-md bg-white p-6 shadow-md">
        <h1>Xóa chứng nhận</h1>
        <div className="mt-4">
          <p>Bạn có chắc chắn muốn xóa chứng nhận này không?</p>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="rounded-md bg-gray-200 px-4 py-2"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="button"
              className="ml-4 rounded-md bg-red-500 px-4 py-2 text-white"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCertificate;
