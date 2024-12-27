import axios from "axios";

const getCertifies = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/guest/certify");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getCertifyById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/guest/certify/${id}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getCertifies, getCertifyById };
