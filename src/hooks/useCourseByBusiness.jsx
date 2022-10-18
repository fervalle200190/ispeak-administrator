import { useEffect, useState } from "react";

export const useCourseByBusiness = (coursesRaw, businessId) => {
     const [courses, setCourses] = useState([]);

     useEffect(() => {
          const coursesCleared = coursesRaw
               .filter((course) => {
                    if (businessId === 4) {
                         return course.curso.unidadNegocioId === businessId;
                    } else {
                         return course.curso.unidadNegocioId !== 4;
                    }
               })
               .map((module) => ({
                    label: module.curso.nombre,
                    value: module.curso.id,
               }));
          const eraseDuplicated = [
               ...new Map(coursesCleared.map((m) => [m.value, m])).values(),
          ];
          setCourses(eraseDuplicated);
     }, [coursesRaw]);

     return {
          courses,
     };
};
