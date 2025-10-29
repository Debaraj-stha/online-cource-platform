import image from "../assets/images/team3.avif";
// You can swap this with team1.avif, team.avif, or even an illustration later

const Story = () => {
    return (
        <>
            {/* Column 1: Illustration */}
            <div className="flex justify-center rounded-2xl overflow-hidden">
                <img
                    src={image}  // your chosen illustration file
                    alt="Our Story illustration"
                    className="w-full h-auto"
                    loading="lazy"
                />
            </div>

            {/* Column 2: Text Content */}
            <div>
                <h2 className="title-h2">Our Story</h2>
                <p className="para">
                    Founded in 2025, our platform was born out of a vision to bridge the
                    gap between high-quality education and learners worldwide. We noticed
                    that many learners struggled to find practical, skill-based courses
                    that fit their schedules.
                </p>
                <p className="para">
                    Starting as a small team of educators and technologists, we focused on
                    creating a platform that is intuitive, flexible, and learner-friendly.
                    Today, thousands of learners trust us to provide courses that are
                    relevant, engaging, and effective.
                </p>
            </div>

        </>
    );
};

export default Story;
