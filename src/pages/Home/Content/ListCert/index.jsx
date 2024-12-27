import { Link } from "react-router-dom";
import CertItem from "./CertItem";
import { useEffect, useState } from "react";
import CertInfo from "./CertInfo";
import { getCertifies } from "../../../../services/guest/certifyService";

// eslint-disable-next-line react/prop-types
const ListCert = ({ student, setIsValid }) => {
  const [data, setData] = useState([]);
  const [fillterData, setFillterData] = useState([]);
  const [certSelected, setCertSelected] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    const fetchCertifies = async () => {
      const certifies = await getCertifies();
      // tìm tất cả các chứng nhận mà sinh viên đã tham gia
      const data = certifies.filter((certify) => {
        // eslint-disable-next-line react/prop-types
        return certify.studentId === student._id;
      });
      setData(data);
    };
    fetchCertifies();
  }, [student]);

  // lọc chứng nhận theo ngày
  useEffect(() => {
    if (startDate === "" && endDate === "") {
      setFillterData(data);
    } else {
      const fillterData = data.filter((certify) => {
        const date = new Date(certify.dateCreated);
        console.log(date);
        if (startDate === "" && endDate !== "") {
          return date <= new Date(endDate);
        } else if (startDate !== "" && endDate === "") {
          return date >= new Date(startDate);
        } else {
          return date >= new Date(startDate) && date <= new Date(endDate);
        }
      });
      setFillterData(fillterData);
    }
  }, [data, startDate, endDate]);

  return (
    <div>
      {isShowModal ? (
        <>
          <CertInfo
            certSelected={certSelected}
            setIsShowModal={setIsShowModal}
          />
        </>
      ) : (
        <>
          <div className="flex items-center">
            <button
              onClick={() => setIsValid(false)}
              className="m-16 rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              Trở lại
            </button>
            <h1 className="text-4xl">Danh sách giấy chứng nhận</h1>
          </div>
          <div className="flex items-center justify-around">
            <div className="flex gap-10">
              {/* filter ngày bắt đầu */}
              <h1 className="text-2xl">Từ ngày</h1>
              <input
                onChange={(e) => setStartDate(e.target.value)}
                className="text-xl"
                type="date"
              />
            </div>
            <div className="flex gap-10">
              {/* filter ngày kết thúc */}
              <h1 className="text-2xl">Đến ngày</h1>
              <input
                onChange={(e) => setEndDate(e.target.value)}
                className="text-xl"
                type="date"
              />
            </div>
          </div>
          <div className="mx-32 flex flex-wrap justify-between">
            {fillterData.map((item) => (
              <Link
                key={item._id}
                className="my-10"
                onClick={() => {
                  setCertSelected(item);
                  setIsShowModal(true);
                }}
              >
                <CertItem certify={item} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListCert;
