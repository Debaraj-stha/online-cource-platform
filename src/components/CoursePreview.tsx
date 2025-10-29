import { memo } from "react";

const CoursePreview = memo(({ url }: { url: string }) => {
  if (!url) return null;
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">▶️ Course Preview</h2>
      <video
        autoPlay
        muted
        controls
        className="w-full h-full object-cover"
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
});

export default CoursePreview;
