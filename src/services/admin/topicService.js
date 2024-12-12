import axios from "axios";
import authHeader from "../authHeader";

const getTopics = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/admin/topics", {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const createTopic = async (topic) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/topics",
      topic,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const getTopicById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/topics/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const updateTopic = async (id, topic) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/admin/topics/${id}`,
      topic,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

const deleteTopic = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/topics/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Lỗi không xác định");
  }
};

export { getTopics, createTopic, getTopicById, updateTopic, deleteTopic };
