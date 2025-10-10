import { memo, useRef } from "react";
import type { InstructorCertificate } from "../@types/instructor";
import Skeleton from "./Skeleton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
interface Props {
  certificates: InstructorCertificate[] | [];
}

const InstructorCertificates = memo(({ certificates }: Props) => {
  const loading = false
  if (!certificates || certificates.length === 0) return null;
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!ref.current) return


    gsap.to(".instructor-certificates .instructor-certificate", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.4,
      delay: 0.7,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".instructor-certificates",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
        toggleActions: "play none none reverse"
      }
    })
  }, { scope: ref })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" ref={ref}>
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
          certificates.length == 0 ? <p className="text-gray-300">No certificates available</p> :
            certificates.map((cert) => (
              <div
                key={cert.id}
                style={{ opacity: "0", transform: "translateY(40px)" }}
                className="instructor-certificate bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition p-4 flex flex-col items-center text-center"
              >
                {cert.imageUrl ? (
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="min-h-40 max-h-64 object-contain rounded-lg mb-4"
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
