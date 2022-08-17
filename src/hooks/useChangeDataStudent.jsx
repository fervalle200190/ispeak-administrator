import { returnCountry } from "../ispeak/utils";

export const useChangeDataStudent = ({ setStudents, students }) => {
     const updateStudents = (data) => {
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
     const deleteStudent = (id) => {
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
