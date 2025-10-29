import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import {  formatPrice } from "../../utils/localeFormatter";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const Milestone = () => {
const {stats}=useSelector((state:RootState)=>state.instructor)

  const milestones = [
    { label: "Total Students", value: stats?.totalStudents??0 },
    { label: "Total Revenue", value: stats?.totalEarnings??0 ,type:"currency" },
    { label: "Courses Published", value: stats?.publishedCourses??0 },
    { label: "Certificates Issued", value: stats?.certificatesIssue??0 },
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
              item.type! ==="currency"
                ? formatPrice(item.value)
                : item.value }
            </div>
          </div>
          <div className="text-gray-400 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Milestone;
