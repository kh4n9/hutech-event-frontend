import {
  deleteCefTemplate,
  getCefTemplateById,
} from "../../../../../services/admin/cefTemplateService";

// eslint-disable-next-line react/prop-types
const DeleteCefLayout = ({ id, onClose }) => {
  const handleDelete = async () => {
    try {
      const template = await getCefTemplateById(id);
      if (template.isDefault) {
        alert("Không thể xóa mẫu chứng nhận mặc định");
        return;
      }
      // eslint-disable-next-line react/prop-types
      await deleteCefTemplate(id);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 rounded-lg bg-white p-8">
        <h3 className="mb-4 text-center text-2xl font-bold">Xác nhận</h3>
        <p className="mb-8 text-center">
          Bạn có chắc chắn muốn xóa mẫu chứng nhận này?
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            className="mr-4 rounded-lg bg-red-500 px-4 py-2 text-white"
            onClick={handleDelete}
          >
            Xóa
          </button>
          <button
            type="button"
            className="rounded-lg bg-gray-300 px-4 py-2 text-gray-800"
            onClick={onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCefLayout;
