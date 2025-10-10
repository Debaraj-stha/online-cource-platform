import { useSelector } from "react-redux";
import CreateEditCourse from "./CreateEditCourse";
import type { RootState } from "../../store/store";

const CreateCourse = () => {
  const {course}=useSelector((state:RootState)=>state.course)
 return <CreateEditCourse course={course}/>
  
};

export default CreateCourse;
