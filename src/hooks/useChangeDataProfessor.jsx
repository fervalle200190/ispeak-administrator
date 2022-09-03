import { returnCountry } from "../ispeak/utils";
import { deleteUser, getUserById, updateUser } from "../utils";
import { useUpdateUser } from "./useUpdateUser";

export const useChangeDataProfessor = ({ professors, setProfessors }) => {
     const updateProfessors = async (data) => {
          const user = await getUserById(data.id);
          const { newUser } = useUpdateUser(user, data, 'Profesor');
          const userUpdated = await updateUser(JSON.stringify(newUser));
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
     const deleteProfessor = async (id) => {
          const res = await deleteUser(id);
          if (res !== "Usuario Eliminado") return;
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
