import CerLayout from "./CerLayout";
import Certificate from "./Certificate";
import DetailEvent from "./DetailEvent";
import Event from "./Event";
import Monitor from "./Monitor";
import ReportClass from "./ReportClass";
import ReportMonitor from "./ReportMonitor";
import ReportStudent from "./ReportStudent";
import Setting from "./Setting";
import Student from "./Student";
import Topic from "./Topic";
import User from "./User";
// import DetailStudent from "./DetailStudent";
// import DetailMonitor from "./DetailMonitor";
// import DetailClass from "./DetailClass";

// eslint-disable-next-line react/prop-types
const Content = ({ content }) => {
  return (
    <div className="m-2 grow rounded-xl bg-slate-100 p-4 shadow-lg">
      {!content && <User />}
      {content === "user" && <User />}
      {content === "setting" && <Setting />}
      {content === "cer-layout" && <CerLayout />}
      {content === "topic" && <Topic />}
      {content === "event" && <Event />}
      {content === "event-detail" && <DetailEvent />}
      {content === "student" && <Student />}
      {content === "monitor" && <Monitor />}
      {content === "certificate" && <Certificate />}
      {content === "report-student" && <ReportStudent />}
      {content === "report-monitor" && <ReportMonitor />}
      {content === "report-class" && <ReportClass />}
      {/* {content === "report-student-detail" && <DetailStudent />}
      {content === "report-monitor-detail" && <DetailMonitor />}
      {content === "report-class-detail" && <DetailClass />} */}
    </div>
  );
};

export default Content;
