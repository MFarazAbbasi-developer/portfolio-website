import axios from "axios";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const getMyTimeline = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/timeline/getall",
        { withCredentials: true }
      );
      setTimeline(data.timelines);
    };
    getMyTimeline();
  }, []);

  return (
    <div className="w-full flex flex-col gap-14">
      {/* Heading */}
      <div className="relative text-center">
        <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] 
          font-extrabold text-white tracking-[10px]">
          EDUCATION
        </h1>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-28 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></span>
      </div>

      <div className="grid gap-6 md:gap-8">
        {timeline &&
          timeline.map((element) => (
            <div
              key={element._id}
              className="relative bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 transition"
            >
              {/* Year badge */}
              <div className="absolute -top-3 -left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {element.timeline.from}{" "}
                {element.timeline.to ? `- ${element.timeline.to}` : ""}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                {element.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-justify">
                {element.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Timeline;
