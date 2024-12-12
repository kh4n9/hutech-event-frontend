import { deleteStudent } from "../../../../../services/admin/studentService";
// eslint-disable-next-line react/prop-types
const DeleteStudent = ({ onClose, id }) => {
  const handleDelete = async () => {
    try {
      await deleteStudent(id);
      onClose();
    } catch (error) {
      console.log("Failed to delete student:", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Xóa Sinh Viên</h1>
        <p className="mt-4">Bạn có thực sự muốn xóa sinh viên này không?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            className="rounded-md bg-gray-200 px-4 py-2"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudent;
