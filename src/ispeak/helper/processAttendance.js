export const processAttendance = ({
     profesorSelected,
     moduloSelected,
     studentSelected,
     courseSelected,
     classSelected,
     observaciones,
     attendanceSelected,
     date
}) => {
     return {
          alumnoId: studentSelected,
          cursoId: courseSelected,
          moduloId: moduloSelected,
          profesorId: profesorSelected,
          fecha: date,
          presente: attendanceSelected,
          reprogramar: "true",
          observaciones,
          fechaCarga: new Date().toISOString(),
          clase: classSelected,
     };
};
