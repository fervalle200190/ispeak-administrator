import { useContext, useMemo, useState } from "react";
import { DataContext } from "../ispeak/context";

export const useCoursesByBusinessList = (businessId) => {
     const [courseSelected, setCourseSelected] = useState("");
     const { courses: coursesList } = useContext(DataContext);

     const resetCourseSelected = ()=> {
          setCourseSelected('')
     }

     const courses = useMemo(() => {
          const coursesCleared = coursesList.rows
               ? coursesList.rows
                      .filter((course) => {
                           if (businessId === 4) {
                                return course.businessUnit === 4;
                           } else {
                                return course.businessUnit !== 4;
                           }
                      })
                      .map((course) => ({
                           label: course.name,
                           value: course.id,
                      }))
               : [];
          const eraseDuplicated = [
               ...new Map(coursesCleared.map((m) => [m.value, m])).values(),
          ];
          return eraseDuplicated;
     }, [coursesList]);

     const handleCourse = (e) => {
          setCourseSelected(e.target.value);
     };

     return {
          handleCourse,
          courseSelected,
          courses,
          resetCourseSelected
     };
};
