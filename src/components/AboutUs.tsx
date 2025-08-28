// AboutUs.jsx
import image from "../assets/images/images1.jpg";

const AboutUs = () => {
  return (
<>
      {/* Text Content */}
      <div className="md:w-1/2">
        <h2 className="title-h2 text-gradient">About Us</h2>
        <p className="para">
          Our mission is to make learning accessible, engaging, and effective
          for everyone. We believe education should empower you to achieve your
          personal and professional goals.
        </p>
        <p className="para">
          Founded in 2025, our platform was created to bridge the gap between
          high-quality education and learners worldwide. We combine expert
          instructors, flexible learning, and practical courses designed for
          real-world impact.
        </p>
      </div>

      {/* Image */}
      <div className="md:w-1/2">
        <img
          src={image}
          alt="Students learning online"
          className="rounded-2xl shadow-lg w-full h-auto "
          loading="lazy"
        />
      </div>
    </>
  );
};

export default AboutUs;
