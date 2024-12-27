import axios from "axios";
import authHeader from "../authHeader";

const getEvents = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/colab/events", {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getEventById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/colab/events/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getEvents, getEventById };
