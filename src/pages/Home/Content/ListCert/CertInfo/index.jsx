import { toPng } from "html-to-image";
import { useState, useEffect, useRef } from "react";
import bgCert from "../../../../../assets/images/sample.png";

const CertInfo = ({ certId, setIsShowModal }) => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [scale, setScale] = useState(1); // Độ phân giải mặc định cao
  const captureAreaRef = useRef(null); // Tham chiếu đến khu vực cần chụp

  const handleCapture = async () => {
    const captureArea = captureAreaRef.current;
    if (!captureArea) {
      alert("Không tìm thấy khu vực cần chụp!");
      return;
    }
    try {
      const dataUrl = await toPng(captureArea, {
        quality: 1, // Chất lượng cao
        pixelRatio: scale, // Tùy chỉnh độ phân giải
      });

      setGeneratedImage(dataUrl); // Lưu URL của ảnh để thay thế nội dung
    } catch (error) {
      console.error("Lỗi khi chụp ảnh:", error);
    }
  };

  // Khi độ phân giải thay đổi, render lại ảnh
  const handleChangeScale = (e) => {
    setGeneratedImage(null); // Xóa ảnh cũ
    const value = e.target.value;
    setScale(value === "low" ? 1 : 3);
  };

  useEffect(() => {
    if (scale) {
      handleCapture(); // Render lại ảnh khi thay đổi độ phân giải
    }
  }, [scale]); // Mỗi khi scale thay đổi, gọi lại handleCapture

  const handleDownload = () => {
    if (!generatedImage) {
      alert("Chưa có ảnh để tải xuống!");
      return;
    }

    const link = document.createElement("a");
    link.download = "cert.png";
    link.href = generatedImage;
    link.click();
  };

  return (
    <div className="m-5">
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => setIsShowModal(false)}
      >
        Trở lại
      </button>

      <div ref={captureAreaRef} className="flex items-center justify-center">
        {generatedImage ? (
          // Hiển thị ảnh đã được chụp
          <img src={generatedImage} alt="Giấy chứng nhận" className="w-800" />
        ) : (
          // Hiển thị khu vực cần chụp ban đầu
          <div
            className="relative h-[517px] w-[720px] bg-cover"
            style={{
              backgroundImage: `url(${bgCert})`,
            }}
          >
            <div className="absolute left-[58px] top-[180px] w-[598px]">
              <div className="text-center text-[23px] text-blue-700">
                Hoàng Minh Khang
              </div>
            </div>
            <div className="absolute left-[58px] top-[215px] w-[598px]">
              <div className="text-center text-[23px]">MSSV: 2180603432</div>
            </div>
            <div className="absolute left-[58px] top-[275px] w-[598px]">
              <div className="text-center text-[23px]">
                EVENT 1 EVENT 1 EVENT 1 EVENT 1 EVENT 1
              </div>
            </div>
            <div className="absolute left-[550px] top-[348px]">
              <div className="text-center text-[10px] italic">01</div>
            </div>
            <div className="absolute left-[590px] top-[348px]">
              <div className="text-center text-[10px] italic">01</div>
            </div>
            <div className="absolute left-[638px] top-[348px]">
              <div className="text-center text-[10px] italic">24</div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <select
          onChange={handleChangeScale}
          className="rounded-md border border-gray-300 p-2"
        >
          <option value="low">Độ phân giải thấp</option>
          <option value="high">Độ phân giải cao</option>
        </select>
        <button
          onClick={handleDownload}
          className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Tải xuống
        </button>
      </div>
    </div>
  );
};

export default CertInfo;
