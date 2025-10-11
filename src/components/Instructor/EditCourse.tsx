import { useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { loadCourse, setCourse, setFAQs, setModules, setResources } from '../../store/reducers/courseReducer';
import { useParams } from 'react-router-dom';
import CreateEditCourse from './CreateEditCourse';
import Loader from '../Loader';

const EditCourse = () => {
  const { courseId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    // Clear previous course data when component mounts
    if (!courseId) return;
    dispatch(loadCourse({ courseId: courseId }));

  }, [dispatch, courseId]);

  const { detailedCourse, course } = useSelector((state: RootState) => state.course)

  useEffect(() => {
    // When detailedCourse is loaded, set it to course state
    if (detailedCourse?.course) {
      dispatch(setCourse(detailedCourse.course));

    }
  }, [dispatch, detailedCourse?.course]);



  //set course module once course is set in state and course fropm api is fetched
  useEffect(() => {
    if (detailedCourse?.modules){
      dispatch(setModules(detailedCourse.modules))
    }

  }, [dispatch,  detailedCourse?.modules])


  //set course faqs once course is set in state and course fropm api is fetched
  useEffect(() => {
    if (detailedCourse?.faqs)
      dispatch(setFAQs(detailedCourse.faqs))
  }, [dispatch,  detailedCourse?.faqs])


  //set course faqs once course is set in state and course fropm api is fetched
  useEffect(() => {
    if (detailedCourse?.course.resources)
      dispatch(setResources(detailedCourse.course.resources))
  }, [dispatch,  detailedCourse?.course.resources])


  

  //render loader until course is loaded
  return course ?
    <CreateEditCourse isEditMode={true} course={course!} /> :
    <Loader />
}

export default EditCourse
