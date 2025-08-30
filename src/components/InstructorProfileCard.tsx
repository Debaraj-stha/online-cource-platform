
import InstructorStatsCard from './InstructorStatsCard';
import InstructorCourses from './InstructorCourses';
import InstructorPopularCourses from './InstructorPopularCourses';
import InstructorRecentCourses from './InstructorRecentCourses';
import InstructorSkills from './InstructorSkills';
import InstructorTopReviews from './InstructorTopReviews';
import { reviews } from '../constants/reviews';
import InstructorCertificates from './InstructorCertificates';
import type { InstructorCertificate } from '../@types/instructor';






const InstructorProfileCard = () => {
  const targetAudiences = ["Beginners", "Intermediate learners", "Business professionals"]
  const certificates:InstructorCertificate[] = [
    { id: '1', title: 'Full-Stack Web Development', issuedBy: 'Udemy', date: 'Jan 2025', imageUrl: 'https://img.freepik.com/premium-photo/classy-design-achievement-certificate-template_53876-1081611.jpg' },
    {
      id: '2', title: 'React Advanced',
      issuedBy: 'Coursera', date: 'Mar 2025', imageUrl: "https://img.freepik.com/free-psd/sign-that-says-certificate-approval-approval-it_69286-538.jpg"
    },
  ];

  return (
    <div className="space-y-6">
      <InstructorStatsCard
        averageRating={4.5}
        totalCourses={33}
        totalReviews={54}
        totalStudents={152}
      />

      <h2 className="text-2xl font-bold text-gray-200">Recent Courses</h2>
      <InstructorRecentCourses />
      <h2 className="text-2xl font-bold text-gray-200">Courses</h2>
      <InstructorCourses />
      <h2 className="text-2xl font-bold text-gray-200">Popular Courses</h2>
      <InstructorPopularCourses />
      <h2 className="text-2xl font-bold text-gray-200">Skills</h2>
      <InstructorSkills skills={["javascript", "marketing", "business", "ai", "ml", "graphics", "nodejs", "react"]} />
      <h2 className="text-2xl font-bold text-gray-200">Top reviews</h2>
      <InstructorTopReviews reviews={reviews} />
      <h2 className="text-2xl font-bold text-gray-200">Target Audiences</h2>
      <div className='flex gap-3 flex-wrap'>
        {targetAudiences.map((audience, index) => (
          <div
            key={index}
            className='rounded-3xl bg-yellow-600 py-2 px-4 text-white text-sm hover:bg-yellow-400 transition'
          >
            {audience}
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-gray-200">Certificates</h2>
      <InstructorCertificates
        certificates={certificates}
      />

    </div>
  );
};

export default InstructorProfileCard;
