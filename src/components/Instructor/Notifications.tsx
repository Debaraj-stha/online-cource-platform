import { useGSAP } from '@gsap/react';
import  { useEffect, useRef, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Skeleton from '../Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { instructorActivities } from '../../store/reducers/instructorReducer';

const Notifications = () => {
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  gsap.registerPlugin(ScrollTrigger);
  const dispatch = useDispatch<AppDispatch>();

  const { activities } = useSelector((state: RootState) => state.instructor);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        await dispatch(instructorActivities());
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [dispatch]);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from('.notification', {
      opacity: 0,
      y: 40,
      ease: 'power1.inOut',
      stagger: 0.1,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        scrub: true,
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: ref });

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaBell /> Notifications
      </h3>

      {loading ? (
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              extraClass={`h-7 ${
                index % 2 === 0
                  ? 'w-full'
                  : index % 3 === 0
                  ? 'w-96'
                  : 'w-[80%]'
              }`}
            />
          ))}
        </ul>
      ) : (
        <ul className="space-y-3" ref={ref}>
          {(activities ?? []).length === 0 ? (
            <p className="text-gray-400 text-sm">No recent activity yet.</p>
          ) : (
            activities?.map((activity) => (
              <li
                key={activity._id}
                className="p-4 bg-gray-700 rounded-lg text-sm notification border border-gray-600 hover:bg-gray-600 transition-colors"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-white">{activity.title}</p>
                  <span className="text-xs text-gray-400">
                    {activity.createdAt
                      ? new Date(activity.createdAt).toLocaleString()
                      : ''}
                  </span>
                </div>
                {activity.description && (
                  <p className="text-gray-300 text-xs mb-1">
                    {activity.description}
                  </p>
                )}
                <div className="text-xs text-gray-400 italic">
                  Type: {activity.type.replace('_', ' ')}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
