export const getSignUpToSend = ({ programSelected, studentSelected, observaciones, rawInfo }) => {
     return {
          ...rawInfo,
          alumnoId: studentSelected,
          programaId: programSelected,
          fechaInscripcion: new Date().toISOString(),
          observaciones,
     };
};
