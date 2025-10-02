import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import pic from "./pic.png";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);

  return (
    <div className="w-full flex flex-col gap-14">
  {/* Heading */}
  <div className="relative text-center">
    <h1
      className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] 
      font-extrabold text-white tracking-[10px]"
    >
      PORTFOLIO
    </h1>
    <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-28 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></span>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {(viewAll ? projects : projects.slice(0, 3)).map((project, index) => (
      <motion.div
        key={project._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden shadow-md 
        hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
      >
        {/* Project Image */}
        <Link
          to={`/project/${project._id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="relative block"
        >
          <img
            src={pic}
            alt={project.title}
            className="w-full h-52 object-contain bg-white transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div
            className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4"
          >
            <p className="text-sm text-gray-200 line-clamp-3 mb-4">{project.description}</p>
            <span
              className="inline-block px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg shadow-md hover:from-blue-600 hover:to-cyan-500 transition-all"
            >
              View Details
            </span>
          </div>
        </Link>

        {/* Info Section (always visible) */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            {project.technologies?.split(",").slice(0, 8).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-[#1e293b] text-gray-300 rounded-full border border-blue-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    ))}
  </div>

  {/* Button */}
  {projects.length > 3 && (
    <div className="w-full text-center">
      <Button
        className="px-8 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all"
        onClick={() => setViewAll(!viewAll)}
      >
        {viewAll ? "Show Less" : "Show More"}
      </Button>
    </div>
  )}
</div>


  );
};

export default Portfolio;
