import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Login from "../pages/Login";

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
        <Route
          path="/admin/report-motitor"
          element={<Admin content="report-motitor" />}
        />
        <Route
          path="/admin/report-class"
          element={<Admin content="report-class" />}
        />
        {/* Đăng nhập */}
        <Route path="/login" element={<Login />} />
        {/* 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
