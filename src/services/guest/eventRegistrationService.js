import axios from "axios";

const createEventRegistration = async (eventRegistration) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/guest/eventRegistration",
      eventRegistration,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { createEventRegistration };
