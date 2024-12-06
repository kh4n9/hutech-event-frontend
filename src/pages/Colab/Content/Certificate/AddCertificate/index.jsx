import { useState } from "react";

// eslint-disable-next-line react/prop-types
const AddCerficate = ({ onClose }) => {
  const [modeUpload, setModeUpload] = useState("link");
  const [imageURL, setImageURL] = useState("");

  const handleChangeModeUpload = (mode) => {
    setModeUpload(mode);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-2/3 rounded-md bg-white p-6 shadow-md">
        <h1>Tạo chứng nhận mới</h1>
        <div className="grid grid-cols-2 gap-4">
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
            {/* Mã số sinh viên  */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Mã số sinh viên
              </label>
              <input
                type="text"
                className="w-full rounded-md border-2 p-2"
                placeholder="Nhập mã số sinh viên"
              />
            </div>
            {/* Hình ảnh chứng nhận có thể nhập link hoặc tải file lên  */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Hình ảnh chứng nhận
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`rounded-md px-4 py-2 ${
                    modeUpload === "link"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleChangeModeUpload("link")}
                >
                  Đường dẫn
                </button>
                <button
                  type="button"
                  className={`rounded-md px-4 py-2 ${
                    modeUpload === "file"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleChangeModeUpload("file")}
                >
                  Tải lên
                </button>
              </div>
              {modeUpload === "link" && (
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border-2 p-2"
                  placeholder="Nhập đường dẫn hình ảnh"
                  onChange={(e) => setImageURL(e.target.value)}
                />
              )}
              {modeUpload === "file" && (
                <input
                  type="file"
                  className="mt-2 w-full rounded-md border-2 p-2"
                />
              )}
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
          {/* hiển thị trước hình ảnh */}
          <div className="flex content-center justify-center">
            {imageURL ? (
              <img
                src={imageURL}
                alt="Đường dẫn hình ảnh chưa chính xác hoặc không đúng định dạng"
                className="rounded-md"
              />
            ) : (
              <div className="flex w-full items-center justify-center rounded-md bg-gray-200">
                <h1 className="text-xl">Chưa có hình ảnh</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCerficate;