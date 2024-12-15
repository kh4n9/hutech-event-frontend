import axios from "axios";
import authHeader from "../authHeader";

const getCertifies = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/admin/certifies",
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getCertifyById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/certifies/${id}`,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createCertify = async (certify) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/certifies",
      certify,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateCertify = async (id, certify) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/admin/certifies/${id}`,
      certify,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteCertify = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/certifies/${id}`,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getCertifies,
  createCertify,
  updateCertify,
  deleteCertify,
  getCertifyById,
};
