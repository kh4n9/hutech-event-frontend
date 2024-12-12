import axios from "axios";
import { authHeader } from "../authService";

const getStudentEvents = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/admin/student-events",
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getStudentEventsByStudentId = async (studentId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/student-events/student/${studentId}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getStudentEventsByEventId = async (eventId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/student-events/event/${eventId}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createStudentEvent = async (studentEvent) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/student-events",
      studentEvent,
      {
        headers: authHeader(),
      },
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
  createStudentEvent,
};
