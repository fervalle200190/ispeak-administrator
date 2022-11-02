import { useEffect, useState } from "react";
import { getModulesByCourse } from "../utils";

export const useEditStudyMaterials = (courseSelected) => {
     const [modulesList, setModulesList] = useState([]);
     const [moduleSelected, setModuleSelected] = useState("");
     const [claseSelected, setClaseSelected] = useState("");

     const handleModule = (e) => {
          setModuleSelected(e.target.value);
     };

     const handleClaseSelected = (e) => {
          setClaseSelected(e.target.value);
     };

     const getModule = async (id) => {
          const res = await getModulesByCourse(id);
          setModulesList(res.map((mod) => ({ label: mod.nombre, value: mod.id })));
     };

     useEffect(() => {
          if (courseSelected === "") return;
          getModule(courseSelected);
     }, [courseSelected]);

     return {
          modulesList,
          handleModule,
          moduleSelected,
          handleClaseSelected,
          claseSelected
     };
};
