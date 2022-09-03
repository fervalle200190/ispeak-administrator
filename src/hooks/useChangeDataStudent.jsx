import { returnCountry } from "../ispeak/utils";
import { deleteUser, getUserById, updateUser } from "../utils";
import { useUpdateUser } from "./useUpdateUser";

export const useChangeDataStudent = ({ setStudents, students }) => {
     const updateStudents = async (data) => {
          const user = await getUserById(data.id);
          const { newUser } = useUpdateUser(user, data, "Alumno");
          const userUpdated = await updateUser(JSON.stringify(newUser));
          // console.log(userUpdated);
          const newUpdate = students.rows.map((student) => {
               if (student.id === data.id) {
                    return {
                         ...student,
                         [data.field]: data.value,
                    };
               }
               return student;
          });
          setStudents({
               ...students,
               rows: newUpdate,
          });
     };
     const deleteStudent = async (id) => {
          const res = await deleteUser(id);
          if (res !== "Usuario Eliminado") return;
          const newData = students.rows.filter((student) => student.id !== id);
          setStudents({
               ...students,
               rows: newData,
          });
     };
     const addStudent = (data) => {
          const user = {
               id: data.id || "no info",
               nameAndLastName: data.nombre || "no info",
               email: data.email || "no info",
               city: data.ciudad || "no info",
               country: returnCountry(data.paisId) || "no info",
               currentCourse: "no info",
          };
          const newData = {
               ...students,
               rows: [...students.rows, user],
          };
          setStudents(newData);
     };
     return {
          updateStudents,
          deleteStudent,
          addStudent,
     };
};
