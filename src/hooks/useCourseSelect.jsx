import { useContext, useMemo, useState } from "react";
import { DataContext } from "../ispeak/context";

export const useCourseSelect = () => {
     const { courses } = useContext(DataContext);
     const [courseSelected, setCourseSelected] = useState("");

     const handleCourse = (e) => {
          setCourseSelected(e.target.value);
     };

     const resetCourse = () => {
          setCourseSelected("");
     };

     const coursesList = useMemo(() => {
          return courses.rows.length > 0
               ? courses.rows.map((course) => ({
                      label: course.name,
                      value: course.id,
                 }))
               : [];
     }, [courses]);

     return {
          courseSelected,
          handleCourse,
          coursesList,
          resetCourse,
     };
};
