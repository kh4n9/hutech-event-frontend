import axios from "axios";
import authHeader from "../authHeader";

const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/colab/users", {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/colab/users/${id}`,
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

export { getUsers, getUserById, getUserByToken };
