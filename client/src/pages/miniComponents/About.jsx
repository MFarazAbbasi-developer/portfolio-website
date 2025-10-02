import axios from "axios";
import React, { useEffect, useState } from "react";
import { User } from "lucide-react";

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/portfolio/me",
        { withCredentials: true }
      );
      setUser(data.user);
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
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src={user?.avatar && user.avatar.url}
              alt={user?.fullName}
              className="rounded-2xl shadow-lg shadow-blue-500/20 border border-zinc-800 w-[260px] sm:w-[320px] md:w-[360px] lg:w-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-6 text-gray-400 leading-relaxed max-w-3xl text-justify">
          <p className="text-lg">
            I’m{" "}
            <span className="font-semibold text-white">{user?.fullName}</span>,
            a{" "}
            <span className="text-blue-400 font-medium">
              Software Engineering
            </span>{" "}
            graduate from{" "}
            <span className="font-medium text-blue-400">QUEST Nawabshah</span>.
            With a CGPA of{" "}
            <span className="font-semibold text-white">3.88</span> and securing{" "}
            <span className="font-semibold text-white">2nd position</span> in my
            department, I’ve built a strong foundation in modern software
            development.
          </p>

          <p className="text-lg">
            My expertise lies in the{" "}
            <span className="text-blue-400 font-medium">MERN stack</span>, along
            with tools like{" "}
            <span className="text-white font-medium">
              Tailwind CSS, Git/GitHub
            </span>
            , and REST APIs. Notably, I developed{" "}
            <span className="font-semibold text-blue-400">AI HealthSense</span>,
            a MERN-based app integrated with AI-powered eye disease prediction.
          </p>

          <p className="text-lg">
            I’m passionate about building scalable, user-friendly applications
            and continuously growing as a{" "}
            <span className="text-blue-400 font-medium">
              Full-Stack Developer
            </span>{" "}
            to contribute to impactful projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
