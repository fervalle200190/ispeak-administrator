import { createCourseProgram, createPrograms } from "../../utils";

export const processPrograms = async (data, courses, coursesList) => {
     const { ok, data: program, errorMessage } = await createPrograms(data);
     if(!ok) return {ok, errorMessage}
     let res = [];
     for (let i = 0; i < courses.length; i++) {
          const dataToSend = {
               programaId: program.id,
               cursoId: coursesList[i].id,
          };
          const result = await createCourseProgram(dataToSend);
          res.push(result);
     }
     return { ok, program };
};
