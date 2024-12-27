import axios from "axios";

const getCefTemplates = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/guest/cefTemplate",
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getCefTemplateById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/guest/cefTemplate/${id}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getCefTemplates, getCefTemplateById };
