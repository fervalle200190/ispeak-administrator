export const processProgramSend = (program, data) => {
     const newData = {
          id: program.id,
          name: data.field === "name" ? data.value : program.nombre,
          active:
               data.field === "active"
                    ? data.value
                    : program.activo
                    ? "Activo"
                    : "Desactivado",
     };

     const programFixed = {
          id: newData.id,
          nombre: newData.name,
          descripcion: program.descripcion,
          activo: program.activo,
     };
     return programFixed;
};
