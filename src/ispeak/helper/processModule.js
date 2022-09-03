export const processModule = (module, data) => {
     const newData = {
          id: data.field === "id" ? data.value : module.id,
          name: data.field === "name" ? data.value : module.nombre,
          duration: data.field === "duration" ? data.value : module.duracion,
     };
     const dataToSend = {
          id: newData.id,
          nombre: newData.name,
          duracion: newData.duration,
          contenido: module.contenido,
          objetivos: module.objetivos,
          cursoId: module.cursoId,
     };

     return dataToSend
};
