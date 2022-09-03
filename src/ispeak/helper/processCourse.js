export const processCourse = (course, data) => {
     const newData = {
          id: data.field === "id" ? data.value : course.id,
          name: data.field === "name" ? data.value : course.nombre,
          duration: data.field === "duration" ? data.value : course.duracion,
          businessUnit:
               data.field === "businessUnit"
                    ? data.value
                    : course.unidadNegocioId,
          active: course.activo ? "Activo" : "Desactivado",
     };
     const dataToSend = {
          id: newData.id,
          nombre: newData.name,
          duracion: newData.duration,
          fechaCreacion: new Date().toISOString(),
          activo: "true",
          planEstudio: "",
          unidadNegocioId: newData.businessUnit,
          profesorId: "",
          // profesorId: professorSelected,
     };
     return dataToSend;
};
