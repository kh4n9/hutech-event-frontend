import axios from "axios";

const getEvents = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/guest/event");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getEventById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/guest/event/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getEvents, getEventById };
