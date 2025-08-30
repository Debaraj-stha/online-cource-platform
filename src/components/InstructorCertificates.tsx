import type { InstructorCertificate } from "../@types/instructor";

interface Props {
  certificates: InstructorCertificate[];
}

const InstructorCertificates = ({ certificates }: Props) => {
  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {certificates.map((cert) => (
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
};

export default InstructorCertificates;
