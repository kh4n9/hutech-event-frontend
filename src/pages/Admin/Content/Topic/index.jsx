import { useEffect, useState } from "react";
import AddTopic from "./AddTopic";
import EditTopic from "./EditTopic";
import DeleteTopic from "./DeleteTopic";
import { getTopics } from "../../../../services/admin/topicService";

const Topic = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [quantity, setQuantity] = useState(10); // Số bản ghi trên mỗi trang
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPage, setTotalPage] = useState(1); // Tổng số trang
  const [search, setSearch] = useState(""); // Từ khóa tìm kiếm
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [topicIdEdit, setTopicIdEdit] = useState("");
  const [topicIdDelete, setTopicIdDelete] = useState("");

  // Lấy dữ liệu chủ đề
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTopics();
        setData(response);
      } catch (error) {
        console.log("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [showAddTopic, topicIdEdit, topicIdDelete]);

  // Xử lý phân trang và tìm kiếm
  useEffect(() => {
    // Lọc theo từ khóa
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );

    // Tính tổng số trang
    const pages = Math.ceil(filteredData.length / quantity);
    setTotalPage(pages);

    // Lấy dữ liệu trang hiện tại
    const startIndex = (page - 1) * quantity;
    const currentData = filteredData.slice(startIndex, startIndex + quantity);
    setTableData(currentData);
  }, [quantity, page, search, data]);

  // Xử lý chuyển trang
  const handleNextPage = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Xử lý thêm mới chủ đề
  const handleAddTopic = () => {
    setShowAddTopic(true);
  };

  const handleCloseAddTopic = () => {
    setShowAddTopic(false);
  };

  // Xử lý sửa chủ đề
  const handleEditTopic = (id) => {
    setTopicIdEdit(id);
  };

  const handleCloseEditTopic = () => {
    setTopicIdEdit("");
  };

  // Xử lý xóa chủ đề
  const handleDeleteTopic = (id) => {
    setTopicIdDelete(id);
  };

  const handleCloseDeleteTopic = () => {
    setTopicIdDelete("");
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-20 rounded-md border-2 p-2 shadow-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6h.008v.008H6V6Z"
            />
          </svg>

          <div>
            <h1 className="text-2xl font-semibold">Danh sách chủ đề</h1>
            <p className="text-gray-500">
              Bạn có thể tạo hoặc xóa chủ đề của sự kiện/hội thảo tại đây
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={handleAddTopic}
            className="rounded-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
          >
            Thêm mới chủ đề
          </button>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">
          DANH SÁCH CHỦ ĐỀ
        </h1>
        <hr className="my-2" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Xem</span>
            <select
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="rounded-md border-2 p-2 text-gray-500 hover:border-gray-700"
              defaultValue={10}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            <span className="text-gray-500">bản ghi</span>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Tìm kiếm chủ đề"
            className="rounded-md border-2 p-2"
          />
        </div>
        <table className="mt-4 w-full">
          <thead>
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Tên chủ đề</th>
              <th className="text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr
                key={item._id}
                className="border-y-2 border-gray-200 hover:bg-gray-100"
              >
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>
                  <button
                    onClick={() => handleEditTopic(item._id)}
                    className="rounded-md bg-blue-500 p-1 text-white transition-all duration-300 ease-in-out hover:bg-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteTopic(item._id)}
                    className="ml-2 rounded-md bg-red-500 p-1 text-white transition-all duration-300 ease-in-out hover:bg-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex">
          {page > 1 && (
            <button
              onClick={handlePreviousPage}
              className="rounded-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
            >
              Trang trước
            </button>
          )}
          <div className="mx-2 rounded-md bg-white px-4 py-2 shadow-md">
            <span>{page}</span>
          </div>
          {page < totalPage && (
            <button
              onClick={handleNextPage}
              className="rounded-md bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200"
            >
              Trang sau
            </button>
          )}
        </div>
      </div>
      {/* Thêm mới chủ đề */}
      {showAddTopic && <AddTopic onClose={handleCloseAddTopic} />}
      {/* Sửa chủ đề */}
      {topicIdEdit && (
        <EditTopic id={topicIdEdit} onClose={handleCloseEditTopic} />
      )}
      {/* Xóa chủ đề */}
      {topicIdDelete && (
        <DeleteTopic id={topicIdDelete} onClose={handleCloseDeleteTopic} />
      )}
    </div>
  );
};

export default Topic;
