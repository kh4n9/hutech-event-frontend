import axios from "axios";
import authHeader from "../authHeader";

const getStudentEvents = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/colab/student-events",
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
      `http://localhost:3000/api/colab/student-events/student/${studentId}`,
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
      `http://localhost:3000/api/colab/student-events/event/${eventId}`,
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
      "http://localhost:3000/api/colab/student-events",
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

const deleteStudentEvent = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/colab/student-events/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateStudentEvent = async (id, studentEvent) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/colab/student-events/${id}`,
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
  deleteStudentEvent,
  updateStudentEvent,
};
