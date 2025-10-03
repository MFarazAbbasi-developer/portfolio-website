import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import API_URL from "../../config/config";

const Certifications = () => {
  const [certs, setCertifications] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(true); // <-- NEW state
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const getMyCertifications = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/certification/getall`,
          { withCredentials: true }
        );
        setCertifications(data.certifications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // <-- stop skeleton after fetch
      }
    };
    getMyCertifications();
  }, []);

  return (
    <div className="w-full flex flex-col gap-14">
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
        {loading
          ? // Skeleton loader
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-md"
              >
                <div className="h-5 w-3/4 bg-gray-700 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
              </div>
            ))
          : (viewAll ? certs : certs.slice(0, 6)).map((cert, index) => (
              <div
                key={index}
                onClick={() => setSelectedCert(cert)}
                className="group relative bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/30 active:shadow-blue-500/30 focus:shadow-blue-500/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <h3 className="text-lg font-bold text-blue-400 mb-2">
                  {cert.title}
                </h3>
                <p className="text-gray-300 mb-1">{cert.issuer}</p>
                <p className="text-gray-400 text-sm">{cert.date}</p>
                <p className="mt-3 text-sm text-cyan-400 group-hover:underline group-active:underline group-focus:underline">
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
              className="absolute top-3 right-3 text-white hover:text-red-400 active:text-red-400 focus:text-red-400 transition"
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
      {!loading && certs.length > 6 && (
        <div className="w-full text-center">
          <Button
            className="px-8 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 active:from-blue-600 active:to-cyan-500 focus:from-blue-600 focus:to-cyan-500 transition-all cursor-pointer"
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
