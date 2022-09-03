export const useChangeDataPrograms = ({ setPrograms, programs }) => {
     const updatePrograms = (data) => {
          const newUpdate = programs.rows.map((program) => {
               if (program.id === data.id) {
                    return {
                         ...program,
                         [data.field]: data.value,
                    };
               }
               return program;
          });
          setPrograms({
               ...programs,
               rows: newUpdate,
          });
     };
     const deletePrograms = (id) => {
          const newData = programs.rows.map((program) => {
               if (program.id === id) {
                    program.active = 'Desactivado';
                    return program;
               }
               return program;
          });
          setPrograms({
               ...programs,
               rows: newData,
          });
     };
     const addPrograms = (data) => {
          const user = {
               id: data.id,
               name: data.nombre,
               active: data.activo ? "Activo" : "Desactivado",
          };
          const newData = {
               ...programs,
               rows: [...programs.rows, user],
          };
          setPrograms(newData);
     };

     return {
          updatePrograms,
          deletePrograms,
          addPrograms,
     };
};
