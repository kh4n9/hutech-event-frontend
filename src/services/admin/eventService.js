import axios from "axios";
import authHeader from "../authHeader";

const getEvents = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/admin/events", {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createEvent = async (event) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/events",
      event,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateEvent = async (id, event) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/admin/events/${id}`,
      event,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/events/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getEventById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/events/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getEvents, createEvent, updateEvent, deleteEvent, getEventById };
