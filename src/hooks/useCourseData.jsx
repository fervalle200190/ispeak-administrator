import { useEffect, useState } from "react";
import { changeModules } from "../ispeak/helper";
import { getAllModules } from "../utils";
import { useChangeData } from "./useChangeData";
import { useModules } from "./useModules";

export const useCourseData = () => {
     const [modulesRaw, setModulesRaw] = useState([]);
     const [courseSelected, setCourseSelected] = useState("");
     const [coursesToData, setCoursesToData] = useState({});

     const getModules = async () => {
          const modules = await getAllModules();
          console.log(modules, 'hola')
          setModulesRaw(modules);
     };

     const addModule = (module)=> {
          setModulesRaw([...modulesRaw, module])
     }

     const handleCourses = (e) => {
          setCourseSelected(e.target.value);
     };

     const updateCourse = async () => {
          const { columns, rows } = useModules(modulesRaw, courseSelected);
          setCoursesToData({ columns, rows });
     };

     const modulesChangers = useChangeData(coursesToData, setCoursesToData, changeModules)

     useEffect(() => {
          getModules();
     }, []);

     useEffect(() => {
          updateCourse();
     }, [courseSelected,modulesRaw]);

     return {
          modulesRaw,
          modulesChangers,
          handleCourses,
          courseSelected,
          coursesToData,
          setCoursesToData,
          addModule
     };
};
