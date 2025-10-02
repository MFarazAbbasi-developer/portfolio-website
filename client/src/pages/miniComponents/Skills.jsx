import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <div className="w-full flex flex-col gap-14">
      {/* Heading */}
      <div className="relative text-center">
        <h1 className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] 
          font-extrabold text-white tracking-[10px]">
          SKILLS
        </h1>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-28 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></span>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-12">
        {Object.keys(groupedSkills).map((category, idx) => (
          <div key={idx} className="space-y-6">
            {/* Category Heading */}
            <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-500 pl-3">
              {category}
            </h2>

            {/* Skills Grid */}
            <div className="flex flex-wrap gap-4">
              {groupedSkills[category].map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 px-5 py-3 bg-[#0f172a]/70 
                  rounded-full border border-[#1e293b] hover:border-blue-500/50
                  hover:bg-[#1e293b]/80 transition-all duration-300 shadow-sm"
                >
                  <img
                    src={skill.svg?.url}
                    alt={skill.title}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-gray-300 font-medium">{skill.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
