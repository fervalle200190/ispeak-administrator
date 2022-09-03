import { useEffect, useState } from "react";
import { useContext, useMemo } from "react";
import { DataContext } from "../ispeak/context";
import { getModulesByCourse } from "../utils";

export const useAddStudyMaterials = () => {
     const { courses } = useContext(DataContext);
     const [modules, setModules] = useState([]);
     const [courseSelected, setCourseSelected] = useState([]);
     const [modulesSelected, setModulesSelected] = useState({});

     const handleCourse = (e) => {
          setCourseSelected(e.target.value);
     };

     const handleModule = (e) => {
          setModulesSelected({
               ...modulesSelected,
               [e.target.name]: e.target.checked,
          });
     };

     const coursesList = useMemo(() => {
          return courses.rows.length > 0
               ? courses.rows.map((course) => ({
                      label: course.name,
                      value: course.id,
                 }))
               : [];
     }, [courses]);

     const getModules = async () => {
          const module = [];
          for (let i = 0; i < courseSelected.length; i++) {
               const res = await getModulesByCourse(courseSelected[i]);
               module.push(res);
          }
          const obj = {};
          module.forEach((module) => (obj[`${module.id}`] = false));
          setModulesSelected({});
          setModules(module);
     };

     useEffect(() => {
          if (courseSelected !== "") {
               setModulesSelected("");
               getModules();
          }
          if (courseSelected === "") {
               setModulesSelected("");
               setModules([]);
          }
     }, [courseSelected]);

     return {
          coursesList,
          modules,
          courseSelected,
          modulesSelected,
          handleCourse,
          handleModule,
          setModulesSelected,
          setCourseSelected,
     };
};
