import  {  useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { loadCourse } from '../../store/reducers/courseReducer';
import { useParams } from 'react-router-dom';
import CreateEditCourse from './CreateEditCourse';

const EditCourse = () => {
  const { courseId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    // Clear previous course data when component mounts
    if (!courseId) return;
    dispatch(loadCourse({ courseId: courseId }));
  }, [dispatch, courseId]);




  const { detailedCourse } = useSelector((state: RootState) => state.course)

  return <CreateEditCourse isEditMode={true} course={detailedCourse?.course!} />
}

export default EditCourse
