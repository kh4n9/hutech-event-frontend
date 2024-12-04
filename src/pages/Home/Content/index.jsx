import { useState } from "react";
import ListCert from "./ListCert";

const Content = () => {
  const [studentCode, setStudentCode] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSearch = () => {
    // nếu studentCode không đủ điều kiện (không phải là một chuỗi chứa số, ít hơn 10 hoặc nhiều hơn 10 lý tự) thì thông báo lỗi
    if (!/^\d+$/.test(studentCode) || studentCode.length !== 10) {
      alert("Mã số sinh viên không hợp lệ");
      setIsValid(false);
      return;
    }
    setIsValid(true);
  };

  return (
    <div className="flex-grow">
      {isValid ? (
        <ListCert studentCode={studentCode} setIsValid={setIsValid} />
      ) : (
        <>
          <div className="flex justify-center">
            <h1 className="mt-40 w-4/5 text-center text-4xl">
              Bạn có thể tra cứu giấy chứng nhận tại đây
            </h1>
          </div>
          <div className="mt-10 flex justify-center">
            <input
              className="w-1/2 rounded-md border border-gray-300 px-4 py-2"
              placeholder="Nhập mã số sinh viên"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              Tra cứu
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
