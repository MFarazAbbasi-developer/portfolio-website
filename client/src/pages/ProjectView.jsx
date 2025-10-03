import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import pic from "./pic.png";
import API_URL from "../config/config";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [loading, setLoading] = useState(true); // 👈 NEW state
  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      setLoading(true); // start loading
      await axios
        .get(`${API_URL}/project/get/${id}`, { withCredentials: true })
        .then((res) => {
          const project = res.data.project;
          setTitle(project.title);
          setDescription(project.description);
          setStack(project.stack);
          setDeployed(project.deployed);
          setTechnologies(project.technologies);
          setGitRepoLink(project.gitRepoLink);
          setProjectLink(project.projectLink);
          setProjectBannerPreview(project.projectBanner?.url || "");
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message || "Failed to load project"
          );
        })
        .finally(() => {
          setLoading(false); // stop loading
        });
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  const navigateTo = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 px-5">
      {/* Return Button on Top */}
      <div className="w-full max-w-5xl mb-6 flex justify-start">
        <Button
          onClick={() => navigateTo("/")}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 active:from-blue-600 active:to-cyan-500 focus:from-blue-600 focus:to-cyan-500 transition cursor-pointer"
        >
          <ArrowLeft />
          Return to Portfolio
        </Button>
      </div>

      {/* Banner */}
      <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-lg bg-white">
        {loading ? (
          <div className="w-full h-72 bg-gray-300 animate-pulse"></div> // Skeleton
        ) : (
          <img
            src={projectBannerPreview || pic || "/avatarHolder.jpg"}
            alt={title}
            className="w-full h-72 object-cover bg-white"
          />
        )}
        {!loading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white text-center">
              {title}
            </h1>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl mt-12 space-y-12 text-gray-300">
        {loading ? (
          // Skeleton loader for content
          <div className="space-y-6 animate-pulse">
            <div className="h-6 w-40 bg-gray-600 rounded"></div>
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
          </div>
        ) : (
          <>
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                Description
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                {descriptionList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {technologiesList.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#1e293b]/70 border border-blue-500/30 
                  rounded-full text-sm font-medium hover:border-blue-500 active:border-blue-500 focus:border-blue-500 transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stack & Deployment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-blue-400 mb-2">Stack</h2>
                <p>{stack}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-400 mb-2">
                  Deployed
                </h2>
                <p>{deployed}</p>
              </div>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-2xl font-bold text-blue-400 mb-2">
                  GitHub Repository
                </h2>
                <a
                  href={gitRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline active:underline focus:underline"
                >
                  {gitRepoLink}
                </a>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-400 mb-2">
                  Live Project
                </h2>
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline active:underline focus:underline"
                >
                  {projectLink}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectView;
