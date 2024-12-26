import {
  deleteCertify,
  getCertifyById,
} from "../../../../../services/admin/certifyService";
import {
  getStudentEventsByEventId,
  deleteStudentEvent,
} from "../../../../../services/admin/studentEventService";

// eslint-disable-next-line react/prop-types
const DeleteCertificate = ({ onClose, id }) => {
  const handleDeleteCertificate = async () => {
    const certify = await getCertifyById(id);
    // nếu không có eventId thì không xoá checkin
    if (!certify.eventId) {
      await deleteCertify(id);
      onClose();
      return;
    }
    const studentEventsByEventId = await getStudentEventsByEventId(
      certify.eventId,
    );
    // chỉ xoá studentEvent nào có eventId trùng với certify.eventId và studentId trùng với certify.studentId
    const studentEventsDelete = studentEventsByEventId.filter(
      (studentEvent) =>
        studentEvent.eventId === certify.eventId &&
        studentEvent.studentId === certify.studentId,
    );
    for (const studentEvent of studentEventsDelete) {
      await deleteStudentEvent(studentEvent._id);
    }
    await deleteCertify(id);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-50">
      <div className="w-1/3 rounded-md bg-white p-6 shadow-md">
        <h1>Xóa chứng nhận</h1>
        <div className="mt-4">
          <p>
            Khi xoá chứng nhận đồng thời sẽ huỷ checkin của sinh viên này (nếu
            có), bạn có chắc chắn muốn xóa chứng nhận này không?
          </p>
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
              onClick={() => handleDeleteCertificate(id)}
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
