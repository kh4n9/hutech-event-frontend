import { useEffect, useRef, useState } from "react";
import {
  createCefTemplate,
  getCefTemplates,
  updateCefTemplate,
} from "../../../../../services/admin/cefTemplateService";
import "@fontsource/roboto"; // Font Roboto
import "@fontsource/open-sans"; // Font Open Sans
import "@fontsource/montserrat"; // Font Montserrat

// eslint-disable-next-line react/prop-types
const AddCefLayout = ({ onClose }) => {
  // ex data
  const titleEx =
    "Sự kiện 1 asd as d asd asd asd sa d ad as d as d asd as d sad";
  const hostEx = "Ban tổ chức 1";
  const studentNameEx = "Hoàng Minh Khang";
  const studentCodeEx = "2180603432";
  const cefNoEx = "Số 1";
  const cefDayEx = "01";
  const cefMonthEx = "01";
  const cefYearEx = "21";

  const [isDefault, setIsDefault] = useState(false);
  const [cefTemplateTitle, setCefTemplateTitle] = useState("");
  const [eventTitle, setEventTitle] = useState({});
  const [cefHost, setCefHost] = useState({});
  const [studentName, setStudentName] = useState({});
  const [studentCode, setStudentCode] = useState({});
  const [cefNo, setCefNo] = useState({});
  const [cefDay, setCefDay] = useState({});
  const [cefMonth, setCefMonth] = useState({});
  const [cefYear, setCefYear] = useState({});
  const [imageURL, setImageURL] = useState(
    "http://localhost:3000/api/public/image/sample.png",
  ); // URL hình ảnh kết quả
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 }); // Lưu kích thước ảnh
  const canvasRef = useRef(null);
  const [error, setError] = useState("");
  const [fontList] = useState([
    "Arial",
    "Tahoma",
    "Verdana",
    "Times New Roman",
    "Trebuchet MS",
    "Georgia",
    "Roboto",
    "Open Sans",
    "Lato",
    "Source Sans Pro",
    "PT Sans",
    "Noto Sans",
    "Ubuntu",
    "Montserrat",
  ]);

  // get image size
  const getImageSize = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
  };

  // vị trí và kích thước của các trường thông tin trên mẫu chứng nhận
  useEffect(() => {
    const fetchData = () => {
      setEventTitle({
        IsDisplay: true,
        Font: "Roboto",
        Color: "#000000",
        x: imageSize.width / 2,
        y: imageSize.height / 2 + (imageSize.height / 2) * 0.15,
        fontSize: 120,
      });
      setCefHost({
        IsDisplay: false,
        Font: "Roboto",
        Color: "#000000",
        x: imageSize.width / 2,
        y: imageSize.height / 2,
        fontSize: 60,
      });
      setStudentName({
        IsDisplay: true,
        Font: "Roboto",
        Color: "#0062cc",
        x: imageSize.width / 2,
        y: imageSize.height / 2 - (imageSize.height / 2) * 0.2,
        fontSize: 100,
      });
      setStudentCode({
        IsDisplay: true,
        Font: "Roboto",
        Color: "#000000",
        x: imageSize.width / 2,
        y: imageSize.height / 2 - (imageSize.height / 2) * 0.07,
        fontSize: 100,
      });
      setCefNo({
        IsDisplay: true,
        Font: "Roboto",
        Color: "#000000",
        x: imageSize.width / 2 - (imageSize.width / 2) * 0.85,
        y: imageSize.height / 2 + (imageSize.height / 2) * 0.85,
        fontSize: 60,
      });
      setCefDay({
        IsDisplay: true,
        Font: "Roboto",
        Color: "#000000",
        x: imageSize.width / 2 + (imageSize.width / 2) * 0.545,
        y: imageSize.height / 2 + (imageSize.height / 2) * 0.39,
        fontSize: 50,
      });
      setCefMonth({
        IsDisplay: true,
        Font: "Roboto",
        Color: "#000000",
        x: imageSize.width / 2 + (imageSize.width / 2) * 0.655,
        y: imageSize.height / 2 + (imageSize.height / 2) * 0.39,
        fontSize: 50,
      });
      setCefYear({
        IsDisplay: true,
        Font: "Roboto",
        Color: "#000000",
        x: imageSize.width / 2 + (imageSize.width / 2) * 0.788,
        y: imageSize.height / 2 + (imageSize.height / 2) * 0.39,
        fontSize: 50,
      });
    };
    fetchData();
  }, [imageSize]);

  useEffect(() => {
    getImageSize(imageURL);
  }, [imageURL]);

  // vẽ mẫu chứng nhận
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    // Tải ảnh nền từ API
    const background = new Image();
    background.crossOrigin = "anonymous"; // Cần thiết nếu ảnh từ server khác
    background.src = imageURL; // URL ảnh từ API

    // Vẽ ảnh nền
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      // Vẽ các trường thông tin
      // Vẽ tiêu đề sự kiện
      if (eventTitle.IsDisplay) {
        drawText(
          ctx,
          titleEx.toUpperCase().trim(),
          eventTitle.x,
          eventTitle.y,
          eventTitle.Font,
          eventTitle.Color,
          eventTitle.fontSize,
          canvas.width * 0.9,
          eventTitle.fontSize * 1.2,
        );
      }
      // Vẽ tên người tổ chức
      if (cefHost.IsDisplay) {
        ctx.font = `${cefHost.fontSize}px ${cefHost.Font}`;
        ctx.fillStyle = cefHost.Color;
        ctx.textAlign = "center";
        ctx.fillText(hostEx, cefHost.x, cefHost.y);
      }
      // Vẽ tên sinh viên
      if (studentName.IsDisplay) {
        ctx.font = `${studentName.fontSize}px ${studentName.Font}`;
        ctx.fillStyle = studentName.Color;
        ctx.textAlign = "center";
        ctx.fillText(studentNameEx, studentName.x, studentName.y);
      }
      // Vẽ mã sinh viên
      if (studentCode.IsDisplay) {
        ctx.font = `${studentCode.fontSize}px ${studentCode.Font}`;
        ctx.fillStyle = studentCode.Color;
        ctx.textAlign = "center";
        ctx.fillText(studentCodeEx, studentCode.x, studentCode.y);
      }
      // Vẽ số chứng nhận
      if (cefNo.IsDisplay) {
        ctx.font = `${cefNo.fontSize}px ${cefNo.Font}`;
        ctx.fillStyle = cefNo.Color;
        ctx.textAlign = "center";
        ctx.fillText(cefNoEx, cefNo.x, cefNo.y);
      }
      // Vẽ ngày
      if (cefDay.IsDisplay) {
        ctx.font = `italic ${cefDay.fontSize}px ${cefDay.Font}`;
        ctx.fillStyle = cefDay.Color;
        ctx.textAlign = "center";
        ctx.fillText(cefDayEx, cefDay.x, cefDay.y);
      }
      // Vẽ tháng
      if (cefMonth.IsDisplay) {
        ctx.font = `italic ${cefMonth.fontSize}px ${cefMonth.Font}`;
        ctx.fillStyle = cefMonth.Color;
        ctx.textAlign = "center";
        ctx.fillText(cefMonthEx, cefMonth.x, cefMonth.y);
      }
      // Vẽ năm
      if (cefYear.IsDisplay) {
        ctx.font = `italic ${cefYear.fontSize}px ${cefYear.Font}`;
        ctx.fillStyle = cefYear.Color;
        ctx.textAlign = "center";
        ctx.fillText(cefYearEx, cefYear.x, cefYear.y);
      }
    };

    // lỗi khi không thể tải ảnh
    background.onerror = () => {
      alert("Không thể tải ảnh từ URL này!!!");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    eventTitle,
    cefHost,
    studentName,
    studentCode,
    cefNo,
    cefDay,
    cefMonth,
    cefYear,
  ]);

  const handleImageUrl = (e) => {
    if (e.target.value.startsWith("http") && e.target.value !== "")
      setImageURL(e.target.value);
  };

  const handleAddCefLayout = async () => {
    try {
      if (isDefault) {
        // set all cefTemplate to isDefault = false
        const cefTemplates = await getCefTemplates();
        cefTemplates.forEach(async (cefTemplate) => {
          await updateCefTemplate(cefTemplate._id, { isDefault: false });
        });
      }
      const cefTemplate = {
        name: cefTemplateTitle,
        data: {
          EventTitle: eventTitle,
          CefHost: cefHost,
          StudentName: studentName,
          StudentCode: studentCode,
          CefNo: cefNo,
          CefDay: cefDay,
          CefMonth: cefMonth,
          CefYear: cefYear,
        },
        img: imageURL,
        isDefault,
      };
      await createCefTemplate(cefTemplate);
      onClose();
    } catch (error) {
      setError(error);
    }
  };

  const drawText = (
    ctx,
    text,
    x,
    y,
    font,
    color,
    fontSize,
    maxWidth,
    lineHeight,
  ) => {
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    const words = text.split(" ");
    let line = "";
    let lines = [];

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        lines.push(line.trim());
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    // Ensure y and lineHeight are numbers
    const yPos = parseFloat(y);
    const lineHt = parseFloat(lineHeight);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, yPos + i * lineHt);
    }
  };

  return (
    <div className="fixed inset-0 flex max-h-screen items-center justify-center overflow-auto bg-gray-500 bg-opacity-50">
      <div className="w-10/12 rounded-md bg-white p-6 shadow-md">
        <div className="flex items-center space-x-1 rounded-md bg-gray-200 p-2 shadow-md">
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>

          <div>
            <h1 className="text-2xl font-semibold">Thêm mẫu chứng nhận mới</h1>
            <p className="text-gray-500">Tạo mẫu chứng nhận mới dưới đây</p>
          </div>
        </div>

        <div className="mt-4 rounded-md bg-gray-200 p-4 shadow-md">
          <h1 className="text-2xl font-semibold">THÔNG TIN MẪU CHỨNG NHẬN</h1>
          <label className="block text-sm font-medium text-gray-700">
            Tên mẫu chứng nhận
          </label>
          <input
            onChange={(e) => setCefTemplateTitle(e.target.value)}
            value={cefTemplateTitle}
            type="text"
            className="w-full rounded-md border-2 p-2"
            placeholder="Nhập tên mẫu chứng nhận"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nguồn ảnh của mẫu
              </label>
              <input
                onChange={handleImageUrl}
                type="text"
                className="w-full rounded-md border-2 p-2"
                placeholder="Nhập đường dẫn ảnh"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tải lên ảnh của mẫu
              </label>
              <input type="file" className="w-full rounded-md border-2 p-2" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="h-auto max-h-[700px] w-full rounded-md border"
              ></canvas>
            </div>

            <div>
              {/* EventTitle */}
              <div>
                <div>
                  <input
                    checked={eventTitle.IsDisplay}
                    onChange={(e) =>
                      setEventTitle({
                        ...eventTitle,
                        IsDisplay: e.target.checked,
                      })
                    }
                    type="checkbox"
                    id="eventTitle"
                    className="mx-2 rounded-md border-2 p-2"
                  />
                  <label htmlFor="eventTitle">Tiêu đề sự kiện</label>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-4">
                  <input
                    onChange={(e) =>
                      setEventTitle({ ...eventTitle, x: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.width}
                    step="1"
                    value={eventTitle.x}
                  />
                  <input
                    onChange={(e) =>
                      setEventTitle({ ...eventTitle, y: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.height}
                    step="1"
                    value={eventTitle.y}
                  />
                  <input
                    onChange={(e) =>
                      setEventTitle({ ...eventTitle, fontSize: e.target.value })
                    }
                    type="range"
                    min="0"
                    max="300"
                    step="1"
                    value={eventTitle.fontSize}
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={(e) =>
                        setEventTitle({ ...eventTitle, Color: e.target.value })
                      }
                      type="color"
                      value={eventTitle.Color}
                      className="rounded-md border-2"
                    />

                    <input
                      type="text"
                      value={eventTitle.Color}
                      onChange={(e) =>
                        setEventTitle({ ...eventTitle, Color: e.target.value })
                      }
                      className="rounded-md border-2 p-2"
                    />
                  </div>
                  <select
                    onChange={(e) =>
                      setEventTitle({ ...eventTitle, Font: e.target.value })
                    }
                    value={eventTitle.Font}
                    className="rounded-md border-2 p-2"
                  >
                    {fontList.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                  {/* <input
                    type="font"
                    value={eventTitle.Font}
                    onChange={(e) =>
                      setEventTitle({ ...eventTitle, Font: e.target.value })
                    }
                    className="rounded-md border-2 p-2"
                  /> */}
                </div>
              </div>

              {/* CefHost */}
              <div>
                <div>
                  <input
                    checked={cefHost.IsDisplay}
                    onChange={(e) =>
                      setCefHost({ ...cefHost, IsDisplay: e.target.checked })
                    }
                    type="checkbox"
                    id="cefHost"
                    className="mx-2 rounded-md border-2 p-2"
                  />
                  <label htmlFor="cefHost">Người tổ chức</label>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-4">
                  <input
                    onChange={(e) =>
                      setCefHost({ ...cefHost, x: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.width}
                    step="1"
                    value={cefHost.x}
                  />
                  <input
                    onChange={(e) =>
                      setCefHost({ ...cefHost, y: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.height}
                    step="1"
                    value={cefHost.y}
                  />
                  <input
                    onChange={(e) =>
                      setCefHost({ ...cefHost, fontSize: e.target.value })
                    }
                    type="range"
                    min="0"
                    max="300"
                    step="1"
                    value={cefHost.fontSize}
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={(e) =>
                        setCefHost({ ...cefHost, Color: e.target.value })
                      }
                      type="color"
                      value={cefHost.Color}
                      className="rounded-md border-2"
                    />

                    <input
                      type="text"
                      value={cefHost.Color}
                      onChange={(e) =>
                        setCefHost({ ...cefHost, Color: e.target.value })
                      }
                      className="rounded-md border-2 p-2"
                    />
                  </div>

                  <input
                    type="font"
                    value={cefHost.Font}
                    onChange={(e) =>
                      setCefHost({ ...cefHost, Font: e.target.value })
                    }
                    className="rounded-md border-2 p-2"
                  />
                </div>
              </div>

              {/* StudentName */}
              <div>
                <div>
                  <input
                    checked={studentName.IsDisplay}
                    onChange={(e) =>
                      setStudentName({
                        ...studentName,
                        IsDisplay: e.target.checked,
                      })
                    }
                    type="checkbox"
                    id="studentName"
                    className="mx-2 rounded-md border-2 p-2"
                  />
                  <label htmlFor="studentName">Tên sinh viên</label>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-4">
                  <input
                    onChange={(e) =>
                      setStudentName({ ...studentName, x: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.width}
                    step="1"
                    value={studentName.x}
                  />
                  <input
                    onChange={(e) =>
                      setStudentName({ ...studentName, y: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.height}
                    step="1"
                    value={studentName.y}
                  />
                  <input
                    onChange={(e) =>
                      setStudentName({
                        ...studentName,
                        fontSize: e.target.value,
                      })
                    }
                    type="range"
                    min="0"
                    max="300"
                    step="1"
                    value={studentName.fontSize}
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={(e) =>
                        setStudentName({
                          ...studentName,
                          Color: e.target.value,
                        })
                      }
                      type="color"
                      value={studentName.Color}
                      className="rounded-md border-2"
                    />

                    <input
                      type="text"
                      value={studentName.Color}
                      onChange={(e) =>
                        setStudentName({
                          ...studentName,
                          Color: e.target.value,
                        })
                      }
                      className="rounded-md border-2 p-2"
                    />
                  </div>

                  <input
                    type="font"
                    value={studentName.Font}
                    onChange={(e) =>
                      setStudentName({ ...studentName, Font: e.target.value })
                    }
                    className="rounded-md border-2 p-2"
                  />
                </div>
              </div>

              {/* StudentCode */}
              <div>
                <div>
                  <input
                    checked={studentCode.IsDisplay}
                    onChange={(e) =>
                      setStudentCode({
                        ...studentCode,
                        IsDisplay: e.target.checked,
                      })
                    }
                    type="checkbox"
                    id="studentCode"
                    className="mx-2 rounded-md border-2 p-2"
                  />
                  <label htmlFor="studentCode">Mã sinh viên</label>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-4">
                  <input
                    onChange={(e) =>
                      setStudentCode({ ...studentCode, x: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.width}
                    step="1"
                    value={studentCode.x}
                  />
                  <input
                    onChange={(e) =>
                      setStudentCode({ ...studentCode, y: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.height}
                    step="1"
                    value={studentCode.y}
                  />
                  <input
                    onChange={(e) =>
                      setStudentCode({
                        ...studentCode,
                        fontSize: e.target.value,
                      })
                    }
                    type="range"
                    min="0"
                    max="300"
                    step="1"
                    value={studentCode.fontSize}
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={(e) =>
                        setStudentCode({
                          ...studentCode,
                          Color: e.target.value,
                        })
                      }
                      type="color"
                      value={studentCode.Color}
                      className="rounded-md border-2"
                    />

                    <input
                      type="text"
                      value={studentCode.Color}
                      onChange={(e) =>
                        setStudentCode({
                          ...studentCode,
                          Color: e.target.value,
                        })
                      }
                      className="rounded-md border-2 p-2"
                    />
                  </div>

                  <input
                    type="font"
                    value={studentCode.Font}
                    onChange={(e) =>
                      setStudentCode({ ...studentCode, Font: e.target.value })
                    }
                    className="rounded-md border-2 p-2"
                  />
                </div>
              </div>

              {/* CefNo */}
              <div>
                <div>
                  <input
                    checked={cefNo.IsDisplay}
                    onChange={(e) =>
                      setCefNo({ ...cefNo, IsDisplay: e.target.checked })
                    }
                    type="checkbox"
                    id="cefNo"
                    className="mx-2 rounded-md border-2 p-2"
                  />
                  <label htmlFor="cefNo">Số chứng nhận</label>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-4">
                  <input
                    onChange={(e) => setCefNo({ ...cefNo, x: e.target.value })}
                    type="range"
                    min="0"
                    max={imageSize.width}
                    step="1"
                    value={cefNo.x}
                  />
                  <input
                    onChange={(e) => setCefNo({ ...cefNo, y: e.target.value })}
                    type="range"
                    min="0"
                    max={imageSize.height}
                    step="1"
                    value={cefNo.y}
                  />
                  <input
                    onChange={(e) =>
                      setCefNo({ ...cefNo, fontSize: e.target.value })
                    }
                    type="range"
                    min="0"
                    max="300"
                    step="1"
                    value={cefNo.fontSize}
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={(e) =>
                        setCefNo({ ...cefNo, Color: e.target.value })
                      }
                      type="color"
                      value={cefNo.Color}
                      className="rounded-md border-2"
                    />

                    <input
                      type="text"
                      value={cefNo.Color}
                      onChange={(e) =>
                        setCefNo({ ...cefNo, Color: e.target.value })
                      }
                      className="rounded-md border-2 p-2"
                    />
                  </div>

                  <input
                    type="font"
                    value={cefNo.Font}
                    onChange={(e) =>
                      setCefNo({ ...cefNo, Font: e.target.value })
                    }
                    className="rounded-md border-2 p-2"
                  />
                </div>
              </div>

              {/* CefDay */}
              <div>
                <div>
                  <input
                    checked={cefDay.IsDisplay}
                    onChange={(e) =>
                      setCefDay({ ...cefDay, IsDisplay: e.target.checked })
                    }
                    type="checkbox"
                    id="cefDay"
                    className="mx-2 rounded-md border-2 p-2"
                  />
                  <label htmlFor="cefDay">Ngày</label>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-4">
                  <input
                    onChange={(e) =>
                      setCefDay({ ...cefDay, x: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.width}
                    step="1"
                    value={cefDay.x}
                  />
                  <input
                    onChange={(e) =>
                      setCefDay({ ...cefDay, y: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.height}
                    step="1"
                    value={cefDay.y}
                  />
                  <input
                    onChange={(e) =>
                      setCefDay({ ...cefDay, fontSize: e.target.value })
                    }
                    type="range"
                    min="0"
                    max="300"
                    step="1"
                    value={cefDay.fontSize}
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={(e) =>
                        setCefDay({ ...cefDay, Color: e.target.value })
                      }
                      type="color"
                      value={cefDay.Color}
                      className="rounded-md border-2"
                    />

                    <input
                      type="text"
                      value={cefDay.Color}
                      onChange={(e) =>
                        setCefDay({ ...cefDay, Color: e.target.value })
                      }
                      className="rounded-md border-2 p-2"
                    />
                  </div>

                  <input
                    type="font"
                    value={cefDay.Font}
                    onChange={(e) =>
                      setCefDay({ ...cefDay, Font: e.target.value })
                    }
                    className="rounded-md border-2 p-2"
                  />
                </div>
              </div>

              {/* CefMonth */}
              <div>
                <div>
                  <input
                    checked={cefMonth.IsDisplay}
                    onChange={(e) =>
                      setCefMonth({ ...cefMonth, IsDisplay: e.target.checked })
                    }
                    type="checkbox"
                    id="cefMonth"
                    className="mx-2 rounded-md border-2 p-2"
                  />
                  <label htmlFor="cefMonth">Tháng</label>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-4">
                  <input
                    onChange={(e) =>
                      setCefMonth({ ...cefMonth, x: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.width}
                    step="1"
                    value={cefMonth.x}
                  />
                  <input
                    onChange={(e) =>
                      setCefMonth({ ...cefMonth, y: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.height}
                    step="1"
                    value={cefMonth.y}
                  />
                  <input
                    onChange={(e) =>
                      setCefMonth({ ...cefMonth, fontSize: e.target.value })
                    }
                    type="range"
                    min="0"
                    max="300"
                    step="1"
                    value={cefMonth.fontSize}
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={(e) =>
                        setCefMonth({ ...cefMonth, Color: e.target.value })
                      }
                      type="color"
                      value={cefMonth.Color}
                      className="rounded-md border-2"
                    />

                    <input
                      type="text"
                      value={cefMonth.Color}
                      onChange={(e) =>
                        setCefMonth({ ...cefMonth, Color: e.target.value })
                      }
                      className="rounded-md border-2 p-2"
                    />
                  </div>

                  <input
                    type="font"
                    value={cefMonth.Font}
                    onChange={(e) =>
                      setCefMonth({ ...cefMonth, Font: e.target.value })
                    }
                    className="rounded-md border-2 p-2"
                  />
                </div>
              </div>

              {/* CefYear */}
              <div>
                <div>
                  <input
                    checked={cefYear.IsDisplay}
                    onChange={(e) =>
                      setCefYear({ ...cefYear, IsDisplay: e.target.checked })
                    }
                    type="checkbox"
                    id="cefYear"
                    className="mx-2 rounded-md border-2 p-2"
                  />
                  <label htmlFor="cefYear">Năm</label>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-4">
                  <input
                    onChange={(e) =>
                      setCefYear({ ...cefYear, x: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.width}
                    step="1"
                    value={cefYear.x}
                  />
                  <input
                    onChange={(e) =>
                      setCefYear({ ...cefYear, y: e.target.value })
                    }
                    type="range"
                    min="0"
                    max={imageSize.height}
                    step="1"
                    value={cefYear.y}
                  />
                  <input
                    onChange={(e) =>
                      setCefYear({ ...cefYear, fontSize: e.target.value })
                    }
                    type="range"
                    min="0"
                    max="300"
                    step="1"
                    value={cefYear.fontSize}
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={(e) =>
                        setCefYear({ ...cefYear, Color: e.target.value })
                      }
                      type="color"
                      value={cefYear.Color}
                      className="rounded-md border-2"
                    />

                    <input
                      type="text"
                      value={cefYear.Color}
                      onChange={(e) =>
                        setCefYear({ ...cefYear, Color: e.target.value })
                      }
                      className="rounded-md border-2 p-2"
                    />
                  </div>

                  <input
                    type="font"
                    value={cefYear.Font}
                    onChange={(e) =>
                      setCefYear({ ...cefYear, Font: e.target.value })
                    }
                    className="rounded-md border-2 p-2"
                  />
                </div>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                onChange={(e) => setIsDefault(e.target.checked)}
                checked={isDefault}
                type="checkbox"
              />
              <label>Chọn làm mặc định</label>
            </div>
            <div className="space-x-2">
              <button
                onClick={onClose}
                className="rounded-md bg-red-500 p-2 text-white hover:bg-red-700"
              >
                Hủy
              </button>
              <button
                onClick={handleAddCefLayout}
                className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-700"
              >
                Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCefLayout;
