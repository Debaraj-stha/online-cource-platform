
import { reviews } from '../constants/reviews';
import InstructorCertificates from './InstructorCertificates';
import type { InstructorCertificate } from '../@types/instructor';

import { lazy, Suspense } from 'react';
import InstructorAllCoursesCards from './InstructorAllCoursesCards';





const InstructorProfileCard = () => {

  const certificates: InstructorCertificate[] = [
    { id: '1', title: 'Full-Stack Web Development', issuedBy: 'Udemy', date: 'Jan 2025', imageUrl: 'https://img.freepik.com/premium-photo/classy-design-achievement-certificate-template_53876-1081611.jpg' },
    {
      id: '2', title: 'React Advanced',
      issuedBy: 'Coursera', date: 'Mar 2025', imageUrl: "https://img.freepik.com/free-psd/sign-that-says-certificate-approval-approval-it_69286-538.jpg"
    },
  ];

//dynamically importing components
  const InstructorStatsCard = lazy(() => import("./InstructorStatsCard"))
  const InstructorSkills = lazy(() => import("./InstructorSkills"))
  const InstructorTopReviews = lazy(() => import("./InstructorTopReviews"))
  const InstructorTargetAudience = lazy(() => import("./InstructorTargetAudience"))

  return (
    <div className="space-y-6" >

      <Suspense fallback={<p className='text-white'>Loading instructor stats</p>}>
        <InstructorStatsCard
          averageRating={4.5}
          totalCourses={33}
          totalReviews={54}
          totalStudents={152}
        />
      </Suspense>
      <InstructorAllCoursesCards/>
      <h2 className="text-2xl font-bold text-gray-200">Skills</h2>
      <Suspense fallback={<p>Loading skills...</p>}>
        <InstructorSkills skills={["javascript", "marketing", "business", "ai", "ml", "graphics", "nodejs", "react"]} />
      </Suspense>
      <div className='space-y-5 instructor-reviews'>
        <h2 className="text-2xl font-bold text-gray-200">Top reviews</h2>
        <Suspense fallback={<p>Loading reviews...</p>}>
          <InstructorTopReviews reviews={reviews} />
        </Suspense>
      </div>
      <h2 className="text-2xl font-bold text-gray-200">Target Audiences</h2>
      <Suspense fallback={<p>Loading target audiences...</p>}>
        <InstructorTargetAudience />
      </Suspense>
      <div className='space-y-5 instructor-certificates'>
        <h2 className="text-2xl font-bold text-gray-200">Certificates</h2>
        <Suspense fallback={<p>Loading certificates...</p>}>
          <InstructorCertificates
            certificates={certificates}
          />
        </Suspense>
      </div>

    </div>
  );
};

export default InstructorProfileCard;
