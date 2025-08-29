import React, { useState } from "react";
import type { Certificate } from "../@types/course";
import Modal from "./Modal";
import { CgClose } from "react-icons/cg";

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
    if (!certificate) return
    const [isPreview, setPreview] = useState(false)
 
    if (isPreview) return (
        <Modal>
            <div className="space-y-4">
                <button 
                onClick={()=>setPreview(false)}
                className="bg-red-700 font-bold rounded hover:bg-red-600 transition-colors  animate-slide-in">
                    <CgClose size={20}
                    className="text-gray-200 font-bold"
                /></button>
                <img
                    onClick={()=>setPreview(false)}
                    src={certificate.imageUrl}
                    alt={certificate.title}
                    className="w-full h-full rounded-lg shadow hover:scale-105 transition-transform animate-slide-up"
                />
            </div>
        </Modal>
    )
    return (
        <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
                🏅 {certificate.title}
            </h2>
            <img
                onClick={()=>setPreview(true)}
                src={certificate.imageUrl}
                alt={certificate.title}
                className="w-full  md:size-32 rounded-lg shadow cursor-pointer hover:scale-110 transition"
            />
            <p className="text-gray-600 text-sm mt-3">{certificate.description}</p>
            <p className="text-xs text-gray-500 mt-2">
                Issued by <span className="font-medium">{certificate.issuer}</span>
            </p>

        </div>
    );
};

export default CertificateCard;
