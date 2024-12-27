import axios from "axios";
import authHeader from "../authHeader";

const getEventRegistrations = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/admin/event-registrations",
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createEventRegistration = async (eventRegistration) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/event-registrations",
      { headers: authHeader() },
      eventRegistration,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getEventRegistrationById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/event-registrations/${id}`,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getEventRegistrationByStudentId = async (studentId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/event-registrations/${studentId}`,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getEventRegistrationByEventId = async (eventId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/event-registrations/event/${eventId}`,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteEventRegistration = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/event-registrations/${id}`,
      { headers: authHeader() },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  createEventRegistration,
  getEventRegistrations,
  getEventRegistrationById,
  deleteEventRegistration,
  getEventRegistrationByStudentId,
  getEventRegistrationByEventId,
};
