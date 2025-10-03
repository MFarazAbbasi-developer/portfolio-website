import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import API_URL from "../../config/config";

const Hero = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/user/portfolio/me`,
          { withCredentials: true }
        );
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
    <div className="w-full flex flex-col items-start gap-4">
      {/* Online status */}
      <div className="flex items-center gap-2">
        <span className="bg-green-400 rounded-full h-3 w-3 animate-pulse"></span>
        <p className="text-gray-300 font-medium">Online</p>
      </div>

      {/* Name */}
      <h1 className="overflow-x-hidden text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-wide text-white">
        {loading ? (
          <span className="animate-pulse bg-gray-700 h-8 w-64 rounded-md inline-block"></span>
        ) : (
          <>Hey, I'm {user?.fullName}</>
        )}
      </h1>

      {/* Typewriter */}
      {loading ? (
        <div className="animate-pulse bg-gray-700 h-6 w-80 rounded-md"></div>
      ) : (
        <h2 className="text-blue-400 overflow-x-hidden text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] tracking-wide font-bold">
          <Typewriter
            words={[
              "FULLSTACK DEVELOPER",
              "SOFTWARE ENGINEER",
              "MERN STACK DEVELOPER",
            ]}
            loop={50}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>
      )}

      {/* Social Links */}
      <div className="flex gap-4 mt-4 bg-gray-900/30 backdrop-blur-md rounded-2xl p-3">
        {loading ? (
          <>
            <div className="animate-pulse bg-gray-700 h-7 w-7 rounded-full"></div>
            <div className="animate-pulse bg-gray-700 h-7 w-7 rounded-full"></div>
            <div className="animate-pulse bg-gray-700 h-7 w-7 rounded-full"></div>
          </>
        ) : (
          <>
            {user?.githubURL && (
              <Link to={user.githubURL} target="_blank">
                <Github className="text-white w-7 h-7 transition-transform hover:scale-110 active:scale-95 focus:scale-95" />
              </Link>
            )}
            {user?.instagramURL && (
              <Link to={user.instagramURL} target="_blank">
                <Instagram className="text-pink-500 w-7 h-7 transition-transform hover:scale-110 active:scale-95 focus:scale-95" />
              </Link>
            )}
            {user?.facebookURL && (
              <Link to={user.facebookURL} target="_blank">
                <Facebook className="text-blue-800 w-7 h-7 transition-transform hover:scale-110 active:scale-95 focus:scale-95" />
              </Link>
            )}
            {user?.twitterURL && (
              <Link to={user.twitterURL} target="_blank">
                <Twitter className="text-blue-500 w-7 h-7 transition-transform hover:scale-110 active:scale-95 focus:scale-95" />
              </Link>
            )}
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        {loading ? (
          <>
            <div className="animate-pulse bg-gray-700 h-10 w-28 rounded-lg"></div>
            <div className="animate-pulse bg-gray-700 h-10 w-28 rounded-lg"></div>
          </>
        ) : (
          <>
            {user?.linkedInURL && (
              <Link to={user.linkedInURL} target="_blank">
                <Button className="rounded-2xl flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 active:scale-95 focus:scale-95 transition">
                  <Linkedin />
                  LinkedIn
                </Button>
              </Link>
            )}
            {user?.resume?.url && (
              <Link to={user.resume.url} target="_blank">
                <Button className="rounded-2xl flex items-center gap-2 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 active:scale-95 focus:scale-95 transition">
                  <ExternalLink />
                  Resume
                </Button>
              </Link>
            )}
          </>
        )}
      </div>

      {/* About Me */}
      {loading ? (
        <div className="mt-6 space-y-2">
          <div className="animate-pulse bg-gray-700 h-4 w-full rounded"></div>
          <div className="animate-pulse bg-gray-700 h-4 w-5/6 rounded"></div>
          <div className="animate-pulse bg-gray-700 h-4 w-4/6 rounded"></div>
        </div>
      ) : (
        user?.aboutMe && (
          <p className="mt-6 text-gray-300 leading-relaxed text-justify">
            {user.aboutMe}
          </p>
        )
      )}

      <hr className="my-8 border-gray-700 w-full" />
    </div>
  );
};

export default Hero;
