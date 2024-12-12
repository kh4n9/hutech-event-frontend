import { useEffect, useState } from "react";
import {
  updateTopic,
  getTopicById,
} from "../../../../../services/admin/topicService";

// eslint-disable-next-line react/prop-types
const EditTopic = ({ id, onClose }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu chủ đề theo id
        // eslint-disable-next-line no-shadow
        const { name } = await getTopicById(id);
        setName(name);
      } catch (error) {
        console.log("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await updateTopic(id, { name });
      onClose();
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Chỉnh sửa chủ đề</h1>
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên chủ đề
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập tên chủ đề"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="rounded-md bg-gray-200 px-4 py-2"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTopic;
