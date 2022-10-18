import { useContext, useMemo, useState } from "react";
import { DataContext } from "../ispeak/context";

export const useSupportMaterialAdd = () => {
     const { courses } = useContext(DataContext);
     const [courseSelected, setCourseSelected] = useState([]);
     const [kindOfSupportSelected, setKindOfSupportSelected] = useState("");

     const handleCourse = (e) => {
          if(courseSelected.length >= 3) return
          setCourseSelected(e.target.value);
     };

     const handleSupport = (e) => {
          setKindOfSupportSelected(e.target.value);
     };

     const resetSelected = ()=> {
        setKindOfSupportSelected('')
        setCourseSelected([])
     }

     const coursesList = useMemo(() => {
          return courses.rows.length > 0
               ? courses.rows.map((course) => ({
                      label: course.name,
                      value: course.id,
                 }))
               : [];
     }, [courses]);

     return {
          coursesList,
          courseSelected,
          kindOfSupportSelected,
          handleCourse,
          handleSupport,
          resetSelected
     };
};
