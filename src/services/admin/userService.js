import axios from "axios";
import authHeader from "../authHeader";

const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/admin/users", {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const createUser = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/users",
      user,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/users/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const updateUser = async (id, user) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/admin/users/${id}`,
      user,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const deleteUser = async (id) => {
  console.log(id);
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/users/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const getUserByToken = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/auth", {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

export {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByToken,
};
