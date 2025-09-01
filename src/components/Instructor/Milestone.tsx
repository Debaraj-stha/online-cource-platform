import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import {  formatPrice } from "../../utils/localeFormatter";

const Milestone = () => {
  const milestones = [
    { label: "Total Students", value: 1200.00 },
    { label: "Total Revenue", value: 12500 },
    { label: "Courses Published", value: 5 },
    { label: "Certificates Issued", value: 450 },
  ];
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    gsap.from(".milestone-card", {
      opacity: 0,
      y: 40,
      ease: "power1.inOut",
      stagger: 0.1,
      duration: 0.4,
    })
  }, { scope: ref })

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 " ref={ref}

    >
      {milestones.map((item) => (
        <div
          key={item.label}
          className="bg-gray-800 text-white p-6 rounded-xl shadow-md flex flex-col items-center milestone-card"
        >
          <div className="text-3xl font-bold">
            <div className="text-3xl font-bold">
              {
              item.label === "Courses Published" || item.label === "Certificates Issued"
                ? item.value
                : formatPrice(item.value, "en-US")}
            </div>
          </div>
          <div className="text-gray-400 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Milestone;
