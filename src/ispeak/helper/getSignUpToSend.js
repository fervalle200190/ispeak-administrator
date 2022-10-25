export const getSignUpToSend = ({ courseSelected, studentSelected, observaciones }) => {
     return {
          id: 0,
          alumnoId: studentSelected,
          programaId: courseSelected,
          fechaInscripcion: new Date().toISOString(),
          observaciones,
          completado: false,
          activo: true,
     };
};
