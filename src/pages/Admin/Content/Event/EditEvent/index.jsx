import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getEventById,
  updateEvent,
} from "../../../../../services/admin/eventService";
import { getTopics } from "../../../../../services/admin/topicService";
import { getCefTemplates } from "../../../../../services/admin/cefTemplateService";

// eslint-disable-next-line react/prop-types
const EditEvent = ({ onClose, id }) => {
  const [cerLayouts, setCerLayouts] = useState([]);
  const [cefLayoutPickerId, setCefLayoutPickerId] = useState("");
  const [topics, setTopics] = useState([]);
  const [name, setName] = useState("");
  const [hostBy, setHostBy] = useState("");
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState("");
  const [allowCheckin, setAllowCheckin] = useState(false);
  const [yearCode, setYearCode] = useState("");
  const [allowCertify, setAllowCertify] = useState(false);
  const [showTimeLimit, setShowTimeLimit] = useState(false);
  const [checkinStart, setCheckinStart] = useState(null);
  const [checkinEnd, setCheckinEnd] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [checkinLimitTime, setCheckinLimitTime] = useState(false);
  const [error, setError] = useState("");

  const handleShowTimeLimit = () => {
    const newValue = !checkinLimitTime;
    setCheckinLimitTime(newValue);
    setShowTimeLimit(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicsData = await getTopics();
        if (topicsData) {
          setTopics(topicsData);
        }
        const event = await getEventById(id);
        if (event) {
          setName(event.name);
          setHostBy(event.hostBy);
          setDate(event.date ? new Date(event.date) : null);
          setLocation(event.location);
          setAllowCheckin(event.allowCheckin);
          setYearCode(event.yearCode);
          setAllowCertify(event.allowCertify);
          setCheckinLimitTime(event.checkinLimitTime);
          setShowTimeLimit(event.checkinLimitTime);
          setCheckinStart(
            event.checkinStart ? new Date(event.checkinStart) : null,
          );
          setCheckinEnd(event.checkinEnd ? new Date(event.checkinEnd) : null);
          setSelectedTopics(event.topics || []);
          setCefLayoutPickerId(event.templateId || ""); // Set template ID from event data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Error loading data");
      }
    };
    fetchData();

    const fetchCefTemplates = async () => {
      const cefTemplates = await getCefTemplates();
      setCerLayouts(cefTemplates);
    };
    fetchCefTemplates();
  }, [id]);

  const handleUpdateEvent = async () => {
    try {
      const event = {
        name: name,
        hostBy: hostBy,
        date: date ? date.toISOString() : "",
        location: location,
        allowCheckin: allowCheckin,
        yearCode: yearCode,
        allowCertify: allowCertify,
        checkinStart: checkinStart ? checkinStart.toISOString() : "",
        checkinEnd: checkinEnd ? checkinEnd.toISOString() : "",
        topics: selectedTopics,
        checkinLimitTime: checkinLimitTime,
        templateId: cefLayoutPickerId,
      };
      await updateEvent(id, event);
      onClose();
    } catch (error) {
      setError(error);
    }
  };

  const handleSelectedTopics = (e) => {
    if (!e.target.selectedOptions) return;

    const selectedOptions = Array.from(e.target.selectedOptions || []).map(
      (option) => ({
        topicId: option.value,
        name: option.text,
      }),
    );
    setSelectedTopics(selectedOptions);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-50">
      <div className="w-1/2 rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Chỉnh sửa sự kiện</h1>
        <div className="mt-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên sự kiện
            </label>
            <input
              type="text"
              className="w-full rounded-md border-2 p-2"
              placeholder="Nhập tên sự kiện"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={hostBy}
              onChange={(e) => setHostBy(e.target.value)}
            />
          </div>
          {/* Chủ đề sự kiện (select có thể chọn nhiều chủ đề 1 lúc)  */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Chủ đề sự kiện
            </label>
            <select
              className="w-full rounded-md border-2 p-2"
              multiple
              value={selectedTopics.map((topic) => topic.topicId)}
              onChange={handleSelectedTopics}
            >
              {Array.isArray(topics) &&
                topics.map((topic) => (
                  <option key={topic._id} value={topic._id}>
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
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                dateFormat="Pp"
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          {/* mẫu xuất giấy chứng nhận, năm in phôi */}
          <div className="mb-4 flex items-center">
            <div className="mr-2 w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Mẫu xuất giấy chứng nhận
              </label>
              <select
                value={cefLayoutPickerId}
                onChange={(e) => setCefLayoutPickerId(e.target.value)}
                className="w-full rounded-md border-2 p-2"
              >
                {cerLayouts.map((layout) => (
                  <option key={layout._id} value={layout._id}>
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
                value={yearCode}
                onChange={(e) => setYearCode(e.target.value)}
              />
            </div>
          </div>
          {/* Cho phép xuất giấy chứng nhận (checkbox) */}
          <div className="mb-2 flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={allowCertify}
              onChange={(e) => setAllowCertify(e.target.checked)}
            />
            <label className="block text-sm font-medium text-gray-700">
              Cho phép xuất giấy chứng nhận
            </label>
          </div>
          {/* Cho phép checkin sự kiện này */}
          <div className="mb-2 flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={allowCheckin}
              onChange={(e) => setAllowCheckin(e.target.checked)}
            />
            <label className="block text-sm font-medium text-gray-700">
              Cho phép checkin sự kiện này
            </label>
          </div>
          {/* Giới hạn thời gian checkin sự kiện (checkbox) */}
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={checkinLimitTime}
              onChange={handleShowTimeLimit}
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
                <DatePicker
                  selected={checkinStart}
                  onChange={(date) => setCheckinStart(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full rounded-md border-2 p-2"
                />
              </div>
              <div className="ml-2 w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Thời gian kết thúc checkin
                </label>
                <DatePicker
                  selected={checkinEnd}
                  onChange={(date) => setCheckinEnd(date)}
                  showTimeSelect
                  dateFormat="Pp"
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
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
              onClick={handleUpdateEvent}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
