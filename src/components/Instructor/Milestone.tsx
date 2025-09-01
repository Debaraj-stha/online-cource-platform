import React from "react";

const Milestone = () => {
  const milestones = [
    { label: "Total Students", value: 1200 },
    { label: "Total Revenue", value: "$12,500" },
    { label: "Courses Published", value: 5 },
    { label: "Certificates Issued", value: 450 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {milestones.map((item) => (
        <div
          key={item.label}
          className="bg-gray-800 text-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <div className="text-3xl font-bold">{item.value}</div>
          <div className="text-gray-400 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Milestone;
