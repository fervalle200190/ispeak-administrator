import { useEffect, useState } from "react";
import { getAllCursosCombo } from "../utils";

export const useGetAllCoursesCombo = () => {
     const [coursesCombo, setCoursesCombo] = useState([]);
     useEffect(() => {
          const getCoursesCombo = async () => {
               const courses = await getAllCursosCombo();
               setCoursesCombo(courses);
          };
          getCoursesCombo();
     }, []);

     return {
          coursesCombo,
     };
};
