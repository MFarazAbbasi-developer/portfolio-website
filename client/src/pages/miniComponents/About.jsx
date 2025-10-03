import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../config/config";

const About = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/user/portfolio/me`, {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMyProfile();
  }, []);

  return (
    <section className="w-full overflow-x-hidden">
      {/* Section header */}
      <div className="text-center mb-12">
        <h1 className="text-[2rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3rem] font-extrabold">
          About <span className="text-blue-400">Me</span>
        </h1>
        <p className="text-gray-400 mt-2">Allow me to introduce myself.</p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="flex justify-center">
          {loading ? (
            <div className="animate-pulse bg-gray-700 rounded-2xl w-[260px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-[300px]"></div>
          ) : (
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={user?.avatar && user.avatar.url}
                alt={user?.fullName}
                className="rounded-2xl shadow-lg shadow-blue-500/20 border border-zinc-800 w-[260px] sm:w-[320px] md:w-[360px] lg:w-[400px] object-cover transition-transform duration-300 group-hover:scale-105 group-active:scale-105 group-focus:scale-105"
              />
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-6 text-gray-400 leading-relaxed max-w-3xl text-justify">
          {loading ? (
            <div className="space-y-4">
              <div className="animate-pulse bg-gray-700 h-5 w-full rounded"></div>
              <div className="animate-pulse bg-gray-700 h-5 w-5/6 rounded"></div>
              <div className="animate-pulse bg-gray-700 h-5 w-4/6 rounded"></div>
              <div className="animate-pulse bg-gray-700 h-5 w-2/3 rounded"></div>
            </div>
          ) : (
            <>
  <p className="text-lg leading-snug text-gray-400">
    Hi, I’m <span className="font-medium text-white">{user?.fullName}</span>, a <span className="font-medium text-blue-400">Software Engineering</span> graduate from QUEST Nawabshah. With a CGPA of 3.88 and 
    2nd position in my department, I’ve built a strong foundation in modern 
    software development and problem-solving.
  </p>

  <p className="text-lg leading-snug text-gray-400 mt-2">
    My core expertise lies in the <span className="font-medium text-blue-400">MERN stack</span>, complemented by experience in Tailwind CSS, 
    Git/GitHub, and REST APIs. I’ve worked on full-stack projects that focus on building 
    scalable, user-friendly applications. I’m passionate about continuous learning and 
    growing as a <span className="font-medium text-blue-400">Full-Stack Developer</span> to contribute to impactful projects.
  </p>
</>









          )}
        </div>
      </div>
    </section>
  );
};

export default About;
