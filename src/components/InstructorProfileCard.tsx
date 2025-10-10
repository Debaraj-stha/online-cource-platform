import InstructorCertificates from './InstructorCertificates';
import type { InstructorCertificate } from '../@types/instructor';

import { lazy, Suspense } from 'react';
import InstructorAllCoursesCards from './InstructorAllCoursesCards';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';





const InstructorProfileCard = () => {



  //dynamically importing components
  const InstructorStatsCard = lazy(() => import("./InstructorStatsCard"))
  const InstructorSkills = lazy(() => import("./InstructorSkills"))
  const InstructorTopReviews = lazy(() => import("./InstructorTopReviews"))
  const InstructorTargetAudience = lazy(() => import("./InstructorTargetAudience"))

  const { instructor } = useSelector((state: RootState) => state.instructor)



  return (
    <div className="space-y-6" >

      <Suspense fallback={<p className='text-white'>Loading instructor stats</p>}>
        <InstructorStatsCard
          averageRating={instructor?.averageRating}
          totalCourses={instructor?.totalCourses}
          totalReviews={instructor?.totalReviews}
          totalStudents={instructor?.totalStudents}
        />
      </Suspense>
      <InstructorAllCoursesCards />
      <h2 className="text-2xl font-bold text-gray-200">Skills</h2>
      <Suspense fallback={<p>Loading skills...</p>}>
        <InstructorSkills skills={instructor?.specialization?.split(",") ?? []} />
      </Suspense>
      <div className='space-y-5 instructor-reviews'>
        <h2 className="text-2xl font-bold text-gray-200">Top reviews</h2>
        <Suspense fallback={<p>Loading reviews...</p>}>
          <InstructorTopReviews reviews={instructor?.topReviews ?? []} />
        </Suspense>
      </div>
      <h2 className="text-2xl font-bold text-gray-200">Target Audiences</h2>
      <Suspense fallback={<p>Loading target audiences...</p>}>
        <InstructorTargetAudience targetAudiences={instructor?.targetAudience ? instructor.targetAudience : ["unknown"]} />
      </Suspense>
      <div className='space-y-5 instructor-certificates'>
        <h2 className="text-2xl font-bold text-gray-200">Certificates</h2>
        <Suspense fallback={<p>Loading certificates...</p>}>
          <InstructorCertificates
            certificates={instructor?.certificates??[]}
          />
        </Suspense>
      </div>

    </div>
  );
};

export default InstructorProfileCard;
