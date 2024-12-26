/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import iconEvent from "../../../../../assets/images/icon-event.jpg";
import { getEventById } from "../../../../../services/guest/eventService";
import dayjs from "dayjs";

// eslint-disable-next-line react/prop-types
const CertItem = ({ certify }) => {
  const [event, setEvent] = useState({});

  useEffect(() => {
    try {
      // eslint-disable-next-line react/prop-types
      if (certify.eventId === null) return;
      const fetchEvent = async () => {
        // eslint-disable-next-line react/prop-types
        const event = await getEventById(certify.eventId);
        setEvent(event);
      };
      fetchEvent();
    } catch (error) {
      console.log(error);
    }
  }, [certify]);

  return (
    <div className="h-[300px] w-[350px] overflow-hidden rounded-[40px] border-2 shadow-lg transition-all hover:h-72 hover:w-80 hover:bg-stone-100">
      <img
        src={iconEvent}
        alt="icon event"
        className="h-1/2 w-full object-cover"
      />
      <div className="p-2">
        <h3 className="max-h-10 text-xl font-bold">
          {event.name || certify.cefTitle}
        </h3>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <span className="ml-2 text-gray-500">
                {dayjs(certify.dateCreated).format("DD/MM/YYYY")}
              </span>
            </div>
            {event.location ? (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                  />
                </svg>

                <span className="ml-2 text-gray-500">{event.location}</span>
              </div>
            ) : null}
          </div>
          {event.hostBy ? (
            <div className="mt-6 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                />
              </svg>
              <span className="ml-2 text-gray-500">
                Đơn vị tổ chức: {event.hostBy}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CertItem;
