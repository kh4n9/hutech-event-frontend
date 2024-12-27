/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { getCefTemplateById } from "../../../../../services/guest/cefTemplateService";
import { getEventById } from "../../../../../services/guest/eventService";
import { getStudentById } from "../../../../../services/guest/studentService";
import dayjs from "dayjs";
import "@fontsource/montserrat";
import "@fontsource/open-sans";
import "@fontsource/roboto";

const CertInfo = ({ certSelected, setIsShowModal }) => {
  const [event, setEvent] = useState({});
  const [student, setStudent] = useState({});
  const [justImg, setJustImg] = useState(false);
  const canvasRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 800, height: 600 });
  const [loading, setLoading] = useState(false);
  const [templateData, setTemplateData] = useState({});
  const [img, setImg] = useState("");
  const [quality, setQuality] = useState("high");

  useEffect(() => {
    if (!img) return;
    const image = new Image();
    image.src = img;
    image.onload = () =>
      setImageSize({ width: image.width, height: image.height });
  }, [img]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!certSelected.eventId) {
          setJustImg(true);
          setLoading(false);
          return;
        }
        const [eventData, studentData] = await Promise.all([
          getEventById(certSelected.eventId),
          getStudentById(certSelected.studentId),
        ]);
        setEvent(eventData);
        setStudent(studentData);
        const cefTemplate = await getCefTemplateById(eventData.templateId);
        setTemplateData(cefTemplate.data);
        setImg(cefTemplate.img);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [certSelected]);

  useEffect(() => {
    if (loading || !templateData || !img || !event.name || !student.fullname)
      return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    const background = new Image();
    background.crossOrigin = "anonymous";
    background.src = img;
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      const renderText = (field, text, isItalic = false) => {
        if (field?.IsDisplay) {
          ctx.font = `${isItalic ? "italic " : ""}${field.fontSize}px ${field.Font}`;
          ctx.fillStyle = field.Color;
          ctx.textAlign = "center";
          ctx.fillText(text, field.x, field.y);
        }
      };
      renderText(templateData.EventTitle, event.name);
      renderText(templateData.CefHost, event.hostBy);
      renderText(templateData.StudentName, student.fullname);
      renderText(templateData.StudentCode, student.studentCode);
      renderText(templateData.CefNo, certSelected.serialNumber);
      renderText(
        templateData.CefDay,
        dayjs(certSelected.dateCreated).format("DD"),
        true,
      );
      renderText(
        templateData.CefMonth,
        dayjs(certSelected.dateCreated).format("MM"),
        true,
      );
      renderText(
        templateData.CefYear,
        dayjs(certSelected.dateCreated).format("YY"),
        true,
      );
    };
  }, [loading, templateData, img, event, student, imageSize]);

  const saveImage = () => {
    const canvas = canvasRef.current;
    const scale = quality === "high" ? 2 : 0.5; // Tăng kích thước canvas cho high quality
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    // Đặt kích thước canvas tạm theo độ phân giải
    tempCanvas.width = canvas.width * scale;
    tempCanvas.height = canvas.height * scale;

    // Vẽ lại canvas với độ phân giải mới
    tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

    // Lưu hình ảnh từ canvas tạm
    const link = document.createElement("a");
    link.download = `certificate_${certSelected.serialNumber}.png`;
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="m-16 rounded-md bg-white px-4 py-2 text-black">
      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
        onClick={() => setIsShowModal(false)}
      >
        Trở lại
      </button>
      <div className="flex justify-center">
        {justImg ? (
          <img
            className="h-auto max-h-[500px] w-auto max-w-[700px]"
            src={certSelected.cefUrl}
            alt="cert"
          />
        ) : (
          <canvas
            ref={canvasRef}
            className="h-auto max-h-[500px] w-auto max-w-[700px]"
          ></canvas>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <select
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="mr-4 rounded border p-2"
        >
          <option value="high">High Quality</option>
          <option value="low">Low Quality</option>
        </select>
        <button
          className="rounded-md bg-green-500 px-4 py-2 text-white"
          onClick={saveImage}
        >
          Save Image
        </button>
      </div>
    </div>
  );
};

export default CertInfo;
