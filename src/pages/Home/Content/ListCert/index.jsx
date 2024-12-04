import { Link } from "react-router-dom";
import CertItem from "./CertItem";
import { useState } from "react";
import CertInfo from "./CertInfo";

const ListCert = ({ studentCode, setIsValid }) => {
  const data = [
    {
      id: 1,
      name: "Cert 1",
      background: "sample.jpg",
    },
    {
      id: 2,
      name: "Cert 2",
      background: "sample.jpg",
    },
    {
      id: 3,
      name: "Cert 3",
      background: "sample.jpg",
    },
    {
      id: 4,
      name: "Cert 4",
      background: "sample.jpg",
    },
    {
      id: 5,
      name: "Cert 5",
      background: "sample.jpg",
    },
    {
      id: 6,
      name: "Cert 6",
      background: "sample.jpg",
    },
    {
      id: 7,
      name: "Cert 7",
      background: "sample.jpg",
    },
    {
      id: 8,
      name: "Cert 8",
      background: "sample.jpg",
    },
    {
      id: 9,
      name: "Cert 9",
      background: "sample.jpg",
    },
    {
      id: 10,
      name: "Cert 10",
      background: "sample.jpg",
    },
  ];
  const [certSelected, setCertSelected] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div>
      {isShowModal ? (
        <>
          <CertInfo certId={certSelected.id} setIsShowModal={setIsShowModal} />
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
              <input className="text-xl" type="date" />
            </div>
            <div className="flex gap-10">
              {/* filter ngày kết thúc */}
              <h1 className="text-2xl">Đến ngày</h1>
              <input className="text-xl" type="date" />
            </div>
          </div>
          <div className="mx-32 flex flex-wrap justify-between">
            {data.map((item) => (
              <Link
                key={item.id}
                className="my-10"
                onClick={() => {
                  setCertSelected(item);
                  setIsShowModal(true);
                }}
              >
                <CertItem CertId={item.id} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListCert;
