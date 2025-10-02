import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";


const Certifications = () => {
  const [certs, setCertifications] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const getMyCertifications = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/certification/getall",
        { withCredentials: true }
      );
      setCertifications(data.certifications);
    };
    getMyCertifications();
  }, []);
  const certifications = [
    {
      title: "Front-End Developer Specialization",
      issuer: "Meta | Coursera",
      date: "Aug 2025",
      image: "/certificates/meta-frontend.jpg",
    },
    {
      title: "Database Engineer Specialization",
      issuer: "Meta | Coursera",
      date: "July 2025",
      image: "/certificates/meta-database.jpg",
    },
    {
      title: "UX Design Specialization",
      issuer: "Google | Coursera",
      date: "June 2025",
      image: "/certificates/google-ux.jpg",
    },
    {
      title: "Web Development",
      issuer: "NFTP | Govt of Pakistan",
      date: "June 2025",
      image: "/certificates/nftp-web.jpg",
    },
  ];

  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="w-full flex flex-col gap-14 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="relative text-center">
        <h1
          className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] 
          font-extrabold text-white tracking-[10px]"
        >
          CERTIFICATIONS
        </h1>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></span>
      </div>

      {/* Certifications Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {(viewAll ? certs : certs.slice(0, 6)).map((cert, index) => (
          <div
            key={index}
            onClick={() => setSelectedCert(cert)}
            className="group relative bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <h3 className="text-lg font-bold text-blue-400 mb-2  transition-colors">
              {cert.title}
            </h3>
            <p className="text-gray-300 mb-1">{cert.issuer}</p>
            <p className="text-gray-400 text-sm">{cert.date}</p>
            <p className="mt-3 text-sm text-cyan-400 group-hover:underline">
              View Certificate
            </p>
          </div>
        ))}
      </div>

      {/* Modal for Certificate Preview */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-gray-900 rounded-2xl p-4 max-w-3xl w-full">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-3 right-3 text-white hover:text-red-400 transition"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-blue-400 mb-4 text-center">
              {selectedCert.title}
            </h3>
            <img
              src={selectedCert.svg?.url}
              alt={selectedCert.title}
              className="w-full max-w-[600px] h-auto mx-auto rounded-lg shadow-lg"
            />
            <p className="mt-2 text-gray-400 text-center">
              {selectedCert.issuer} - {selectedCert.date}
            </p>
          </div>
        </div>
      )}

      {/* Button */}
            {certs.length > 6 && (
              <div className="w-full text-center">
                <Button
                  className="px-8 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all cursor-pointer"
                  onClick={() => setViewAll(!viewAll)}
                >
                  {viewAll ? "Show Less" : "Show More"}
                </Button>
              </div>
            )}
    </div>
  );
};

export default Certifications;
