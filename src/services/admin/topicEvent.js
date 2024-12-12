import axios from "axios";
import authHeader from "../authHeader";

const getTopicEvents = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/admin/topic-events",
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createTopicEvent = async (topicEvent) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/topic-events",
      topicEvent,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTopicEventById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/topic-events/${id}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTopicEventByEventId = async (eventId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/topic-events/event/${eventId}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTopicEventByTopicId = async (topicId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/admin/topic-events/topic/${topicId}`,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  getTopicEvents,
  createTopicEvent,
  getTopicEventById,
  getTopicEventByEventId,
  getTopicEventByTopicId,
};
