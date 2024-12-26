import axios from "axios";

const getStudents = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/guest/student");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getStudentById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/guest/student/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getStudents, getStudentById };
