import axios from "axios";
import authHeader from "../authHeader";

const getRoles = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/admin/roles", {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const createRole = async (role) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/roles",
      role,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const getRoleById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/roles/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const updateRole = async (id, role) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/admin/roles/${id}`,
      role,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const deleteRole = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/roles/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

export { getRoles, createRole, getRoleById, updateRole, deleteRole };
