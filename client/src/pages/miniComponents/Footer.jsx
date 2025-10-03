import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/config";

const Footer = () => {
   const [user, setUser] = useState({});
  
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
      }
    };
    getMyProfile();
  }, []);
  return (
    <footer className="w-full bg-gray-900/40 backdrop-blur-md border-t border-gray-700 mt-10 px-6 py-6 flex flex-col items-center gap-4">
      {/* Short Tagline */}
      <p className="text-white text-lg sm:text-xl font-semibold text-center">
        Thanks for visiting my portfolio!
      </p>

      {/* Social Links */}
      <div className="flex gap-5">
  <Link to={user.githubURL} target="_blank">
    <Github className="w-6 h-6 text-white hover:text-gray-400 active:text-gray-400 focus:text-gray-400 transition-colors" />
  </Link>
  <Link to={user.linkedInURL} target="_blank">
    <Linkedin className="w-6 h-6 text-white hover:text-blue-500 active:text-blue-500 focus:text-blue-500 transition-colors" />
  </Link>
  <Link to={user.twitterURL} target="_blank">
    <Twitter className="w-6 h-6 text-white hover:text-sky-400 active:text-sky-400 focus:text-sky-400 transition-colors" />
  </Link>
  <Link to={user.facebookURL} target="_blank">
    <Facebook className="w-6 h-6 text-white hover:text-blue-600 active:text-blue-600 focus:text-blue-600 transition-colors" />
  </Link>
  <Link to={user.instagramURL} target="_blank">
    <Instagram className="w-6 h-6 text-white hover:text-pink-500 active:text-pink-500 focus:text-pink-500 transition-colors" />
  </Link>
</div>


      {/* Copyright / Credits */}
      <p className="text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} Muhammad Faraz Abbasi. Built with MERN Stack & Tailwind CSS
      </p>
    </footer>
  );
};

export default Footer;
