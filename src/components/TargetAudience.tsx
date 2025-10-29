import type { TargetAudience } from "../@types/course";

const TargetAudienceCard = ({ audience }: { audience: TargetAudience[] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">🎯 Who this course is for</h2>
      <ul className="space-y-4">
        {audience.map((item) => (
          <li key={item.id} className="flex gap-3 items-start">
            <span className="text-blue-600 text-lg mt-1">✔</span>
            <div>
              <p className="font-semibold text-gray-900">{item.role}</p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TargetAudienceCard;
