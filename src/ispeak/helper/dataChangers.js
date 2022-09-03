export const changeCourses = (data) => {
     return {
          id: data.id,
          name: data.nombre,
          duration: data.duracion,
          businessUnit: data.unidadNegocioId,
          active: data.activo ? "Activo" : "Desactivado",
     };
};

export const changeModules = (data) => {
     return {
          id: data.id,
          name: data.nombre || "no info",
          duration: data.duracion || "no info",
          active: data.activo ? "Activo" : "No activo",
     };
};

export const changeStudyMaterials = (data) => {
     return {
          id: data.id,
          name: data.nombre || "no info",
          course: data.curso || "no info",
          module: data.modulo || "no info",
          class: data.claseNumero ? `Clase ${data.claseNumero}` : "no info",
          active: data.activo ? "Activo" : "Desactivado",
     };
};
