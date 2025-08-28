import NumberAnimation from "./NumberAnimation";
import bgImage from "../assets/images/educational.jpg"; 

const ParallaxStats = () => {
  return (
    <section
      className="relative h-[80vh] flex items-center justify-center text-white bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Stats Content */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <h2 className="title-h2">
            <NumberAnimation target={50000} extraText="+" />
          </h2>
          <p className="title">Students Enrolled</p>
        </div>
        <div>
          <h2 className="title-h2">
            <NumberAnimation target={120} extraText="+" />
          </h2>
          <p className="title">Countries</p>
        </div>
        <div>
          <h2 className="title-h2">
            <NumberAnimation target={300} extraText="+" />
          </h2>
          <p className="title">Instructors</p>
        </div>
        <div>
          <h2 className="title-h2">
            <NumberAnimation target={98} extraText="%" />
          </h2>
          <p className="title">Satisfaction Rate</p>
        </div>
      </div>
    </section>
  );
};

export default ParallaxStats;
