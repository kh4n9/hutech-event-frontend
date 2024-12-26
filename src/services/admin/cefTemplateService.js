import axios from "axios";
import authHeader from "../authHeader";

const getCefTemplates = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/admin/cef-templates",
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getCefTemplateById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/cef-templates/${id}`,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createCefTemplate = async (cefTemplate) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/cef-templates",
      cefTemplate,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateCefTemplate = async (id, cefTemplate) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/admin/cef-templates/${id}`,
      cefTemplate,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteCefTemplate = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/cef-templates/${id}`,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getCefTemplates,
  getCefTemplateById,
  createCefTemplate,
  updateCefTemplate,
  deleteCefTemplate,
};
