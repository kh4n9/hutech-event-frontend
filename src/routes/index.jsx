import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Colab from "../pages/Colab";
import EventRegistration from "../pages/EventRegistration";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Người dùng */}
        <Route path="/" element={<Home />} />
        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        {/* Admin - Hệ thống */}
        <Route path="/admin/user" element={<Admin content="user" />} />
        <Route path="/admin/setting" element={<Admin content="setting" />} />
        <Route
          path="/admin/cer-layout"
          element={<Admin content="cer-layout" />}
        />
        <Route path="/admin/topic" element={<Admin content="topic" />} />
        {/* Admin - Dữ liệu */}
        <Route path="/admin/event" element={<Admin content="event" />} />
        <Route
          path="/admin/event/:id"
          element={<Admin content="event-detail" />}
        />
        <Route path="/admin/student" element={<Admin content="student" />} />
        <Route path="/admin/monitor" element={<Admin content="monitor" />} />
        <Route
          path="/admin/certificate"
          element={<Admin content="certificate" />}
        />
        {/* Admin - Tra cứu */}
        <Route
          path="/admin/report-student"
          element={<Admin content="report-student" />}
        />
        {/* <Route
          path="/admin/report-student/report-student-detail"
          element={<Admin content="report-student-detail" />}
        /> */}

        <Route
          path="/admin/report-monitor"
          element={<Admin content="report-monitor" />}
        />
        {/* <Route
          path="/admin/report-monitor/report-monitor-detail"
          element={<Admin content="report-monitor-detail" />}
        /> */}

        <Route
          path="/admin/report-class"
          element={<Admin content="report-class" />}
        />
        {/*<Route
          path="/admin/report-class/report-class-detail"
          element={<Admin content="report-class-detail" />}
        /> */}
        {/* Colab */}
        <Route path="/colab" element={<Colab />} />
        <Route path="/colab/event" element={<Colab content="event" />} />
        <Route
          path="/colab/event/:id"
          element={<Colab content="event-detail" />}
        />
        <Route path="/colab/student" element={<Colab content="student" />} />
        <Route path="/colab/monitor" element={<Colab content="monitor" />} />
        <Route
          path="/colab/certificate"
          element={<Colab content="certificate" />}
        />
        <Route
          path="/colab/report-student"
          element={<Colab content="report-student" />}
        />
        <Route
          path="/colab/report-monitor"
          element={<Colab content="report-monitor" />}
        />
        <Route
          path="/colab/report-class"
          element={<Colab content="report-class" />}
        />
        {/* Đăng nhập */}
        <Route path="/login" element={<Login />} />

        {/* eventRegistration */}
        <Route path="/eventRegistration/:id" element={<EventRegistration />} />

        {/* 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
