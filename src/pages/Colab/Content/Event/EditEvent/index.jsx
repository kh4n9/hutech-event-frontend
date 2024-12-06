import { useState } from "react";

const EditEvent = ({ onClose }) => {
  const topics = [
    { id: 1, name: "Chủ đề 1" },
    { id: 2, name: "Chủ đề 2" },
    { id: 3, name: "Chủ đề 3" },
  ];

  const cerLayouts = [
    { id: 1, name: "Layout 1" },
    { id: 2, name: "Layout 2" },
    { id: 3, name: "Layout 3" },
  ];

  const [showTimeLimit, setShowTimeLimit] = useState(false);

  const handleShowTimeLimit = () => {
    setShowTimeLimit(!showTimeLimit);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Chỉnh sửa sự kiện</h1>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên sự kiện
            </label>
            <input
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập tên sự kiện"
            />
          </div>
          {/* Đơn vị tổ chức  */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Đơn vị tổ chức
            </label>
            <input
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập đơn vị tổ chức"
            />
          </div>
          {/* Chủ đề sự kiện (select có thể chọn nhiều chủ đề 1 lúc)  */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Chủ đề sự kiện
            </label>
            <select className="w-full rounded-md border-2 p-2" multiple>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
          {/* Thời gian bắt đầu, địa điểm */}
          <div className="mb-4 flex items-center">
            <div className="mr-2 w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Thời gian bắt đầu
              </label>
              <input
                type="datetime-local"
                className="w-full rounded-md border-2 p-2"
              />
            </div>
            <div className="ml-2 w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Địa điểm
              </label>
              <input
                type="text"
                className="w-full rounded-md border-2 p-2"
                placeholder="Nhập địa điểm"
              />
            </div>
          </div>
          {/* mẫu xuất giấy chứng nhận, năm in phôi */}
          <div className="mb-4 flex items-center">
            <div className="mr-2 w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Mẫu xuất giấy chứng nhận
              </label>
              <select className="w-full rounded-md border-2 p-2">
                {cerLayouts.map((layout) => (
                  <option key={layout.id} value={layout.id}>
                    {layout.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-2 w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Năm in phôi
              </label>
              <input
                type="number"
                className="w-full rounded-md border-2 p-2"
                placeholder="Nhập năm in phôi"
              />
            </div>
          </div>
          {/* Cho phép xuất giấy chứng nhận (checkbox) */}
          <div className="mb-2 flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4" />
            <label className="block text-sm font-medium text-gray-700">
              Cho phép xuất giấy chứng nhận
            </label>
          </div>
          {/* Cho phép checkin sự kiện này */}
          <div className="mb-2 flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4" />
            <label className="block text-sm font-medium text-gray-700">
              Cho phép checkin sự kiện này
            </label>
          </div>
          {/* Giới hạn thời gian checkin sự kiện (checkbox) */}
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              onClick={handleShowTimeLimit}
            />
            <label className="block text-sm font-medium text-gray-700">
              Giới hạn thời gian checkin sự kiện
            </label>
          </div>
          {/* Thời gian checkin sự kiện thời gian bắt đầu và thời gian kết thúc */}
          {showTimeLimit && (
            <div className="mb-4 flex items-center">
              <div className="mr-2 w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Thời gian bắt đầu checkin
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded-md border-2 p-2"
                />
              </div>
              <div className="ml-2 w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Thời gian kết thúc checkin
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded-md border-2 p-2"
                />
              </div>
            </div>
          )}
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

export default EditEvent;
