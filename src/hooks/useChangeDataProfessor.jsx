import { returnCountry } from "../ispeak/utils";

export const useChangeDataProfessor = ({ professors, setProfessors }) => {
     const updateProfessors = (data) => {
          const newUpdate = professors.rows.map((professor) => {
               if (professor.id === data.id) {
                    return {
                         ...professor,
                         [data.field]: data.value,
                    };
               }
               return professor;
          });
          setProfessors({
               ...professors,
               rows: newUpdate,
          });
     };
     const deleteProfessor = (id) => {
          const newData = professors.rows.filter(
               (professor) => professor.id !== id
          );
          setProfessors({
               ...professors,
               rows: newData,
          });
     };
     const addProfessor = (data) => {
          const user = {
               id: data.id,
               nameAndLastName: data.nombre,
               email: data.email,
               city: data.ciudad || "no info",
               country: returnCountry(data.paisId),
               amountCourse: "no existe",
               blocked: data.bloqueado ? "bloqueado" : "no bloqueado",
          };
          const newData = {
               ...professors,
               rows: [...professors.rows, user],
          };
          setProfessors(newData);
     };

     return {
          updateProfessors,
          deleteProfessor,
          addProfessor,
     };
};
