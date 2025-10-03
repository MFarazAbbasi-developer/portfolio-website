import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import pic from "./pic2.png";
import API_URL from "../config/config";

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/project/get/${id}`, {
          withCredentials: true,
        });
        setProject(data.project);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!project) return null;

  const descriptionList = project.description.split(". ");
  const technologiesList = project.technologies.split(", ");

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 px-5">
      {/* Return Button */}
      <div className="w-full max-w-5xl mb-6 flex justify-start">
        <Button
          onClick={() => navigateTo("/")}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition cursor-pointer"
        >
          <ArrowLeft />
          Back to Portfolio
        </Button>
      </div>

      {/* Banner */}
      <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-lg">
        <img
          src={project.projectImage?.url}
          alt={project.title}
          className="w-full h- 72 md:h -96 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white text-center px-4">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Links (moved above description and technologies) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mt-6 mb-6"
      >
        {project.gitRepoLink && (
          <a
            href={project.gitRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 bg-gray-800/60 border border-blue-400 rounded-xl hover:bg-gray-800/80 transition"
          >
            <Github />
            GitHub Repo
          </a>
        )}
        {project.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl hover:from-blue-600 hover:to-cyan-500 transition text-white"
          >
            <ExternalLink />
            Live Project
          </a>
        )}
      </motion.div>

      {/* Content */}
      <div className="w-full max-w-4xl space-y-12 text-gray-300">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Description</h2>
          <ul className="list-disc pl-6 space-y-2">
            {descriptionList.map((item, index) => (
              <li key={index} className="text-justify">{item}.</li>
            ))}
          </ul>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {technologiesList.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#1e293b]/70 border border-blue-500/30 
                rounded-full text-sm font-medium hover:border-blue-400 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectView;
