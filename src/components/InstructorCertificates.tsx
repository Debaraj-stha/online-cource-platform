import { memo } from "react";
import type { InstructorCertificate } from "../@types/instructor";
import Skeleton from "./Skeleton";

interface Props {
  certificates: InstructorCertificate[];
}

const InstructorCertificates = memo(({ certificates }: Props) => {
  const loading = true
  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {
        loading ?
          <>
            {
              Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="space-y-4 bg-gray-500 rounded p-4">
                  <Skeleton extraClass="w-full h-56 bg-gray-800" />
                  <Skeleton extraClass="w-full h-7  bg-gray-800" />
                  <Skeleton extraClass="w-80 h-7 bg-gray-800" />
                  <Skeleton extraClass="w-40 h-7 bg-gray-800" />
                  <Skeleton extraClass="w-28 h-7 bg-gray-800" />
                </div>
              ))
            }
          </>
          :
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition p-4 flex flex-col items-center text-center"
            >
              {cert.imageUrl ? (
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                  🎓
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{cert.title}</h3>
              <p className="text-gray-950 text-sm">{cert.issuedBy}</p>
              <p className="text-gray-900 text-xs">{cert.date}</p>
            </div>
          ))}
    </div>
  );
});

export default InstructorCertificates;
