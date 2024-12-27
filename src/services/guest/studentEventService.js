import axios from "axios";

const getStudentEvents = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/guest/student-events",
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getStudentEventsByStudentId = async (studentId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/guest/student-events/student/${studentId}`,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getStudentEventsByEventId = async (eventId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/guest/student-events/event/${eventId}`,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export {
  getStudentEvents,
  getStudentEventsByStudentId,
  getStudentEventsByEventId,
};
