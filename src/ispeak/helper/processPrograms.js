import { createCourseProgram, createPrograms } from "../../utils";

export const processPrograms = async (data, courses, coursesList) => {
     const program = await createPrograms(data);
     let res = []
     for (let i = 0; i < courses.length; i++) {
          const dataToSend = {
               programaId: program.id,
               cursoId: coursesList[i].id,
          };
          const result = await createCourseProgram(dataToSend)
          res.push(result)
     }
     return program
};
