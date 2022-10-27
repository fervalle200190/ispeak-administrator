export const getSignUpToSendDate = ({
     rawInfo,
     studentSelected,
     courseSelected,
     professorSelected,
     tipoClaseSelected,
     roomSelected,
     observaciones,
     startDate,
     endDate,
}) => {
     return {
          ...rawInfo,
          alumnoId: studentSelected,
          cursoId: courseSelected,
          profesorId: professorSelected,
          tipoClase: tipoClaseSelected,
          fechaInscripcion: new Date().toISOString(),
          fechaIncio: startDate,
          fechaFin: endDate,
          salaId: roomSelected,
          observaciones,
     };
};
