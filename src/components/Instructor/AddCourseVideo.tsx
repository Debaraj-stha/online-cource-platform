import React, { useState } from "react";
import Modal from "../Modal";
interface Props{
    onClose:()=>void
}
const AddCourseVideo = ({ onClose }: Props) => {
    const [url, setUrl] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Send data to backend / state handler
    const newVideo = {  url };
    console.log("New Course Video:", newVideo);

    // Close modal after save
    onClose();
  };

  return (
    <Modal onClose={onClose} extraClass="z-50">
      <div
        onClick={(e) => e.stopPropagation()} // prevent modal from closing when clicking inside
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add Course Video
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
         

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Video URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://youtube.com/..."
              required
            />
          </div>

          {/* Description */}
        

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Video
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCourseVideo;
