import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "../ispeak/context";
import { getAllMaterialByCourse } from "../utils";
import { useFileSupport } from "./useFileSupport";

export const useSupportFileTable = () => {
     const { courses } = useContext(DataContext);
     const [courseSelected, setCourseSelected] = useState("");
     const [filesList, setFilesList] = useState({ columns: {}, rows: {} });

     const handleCourse = (e) => {
          setCourseSelected(e.target.value);
     };

     const coursesList = useMemo(() => {
          return courses.rows
               ? courses.rows.map((course) => ({
                      label: course.name,
                      value: course.id,
                 }))
               : [];
     }, [courses]);

     const getMaterial = async () => {
          const materials = await getAllMaterialByCourse(courseSelected);
          const { columns, rows } = useFileSupport(
               materials
                    .filter((material) => material.archivos.length > 0)
                    .map((material) => material.archivos)
                    .flat()
          );
          setFilesList({ columns, rows });
     };

     useEffect(() => {
          if (courseSelected === "") return;
          getMaterial();
     }, [courseSelected]);

     return {
        coursesList,
        courseSelected,
        handleCourse,
        filesList
     }
};
