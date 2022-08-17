import { DeleteData } from "../ispeak/components";

export const useCourseSignUps = (signUps) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150, editable: true },
          {
               field: "student",
               headerName: "Alumno",
               width: 150,
               editable: true,
          },
          { field: "course", headerName: "Curso", width: 150, editable: true },
          {
               field: "professor",
               headerName: "Profesor",
               width: 150,
               editable: true,
          },
          {
               field: "signUpDate",
               headerName: "Fecha de inscripción",
               width: 150,
               editable: true,
          },
          { field: "start", headerName: "Inicio", width: 150, editable: true },
          { field: "end", headerName: "Fin", width: 150, editable: true },
          {
               field: "finished",
               headerName: "Curso completo",
               width: 150,
               editable: true,
          },
          {
               field: "actions",
               headerName: "",
               sortable: false,
               editable: false,
               disableClickEventBubbling: true,
               disableColumnMenu: true,
               renderCell: (params) => {
                    return <DeleteData id={params.row.id} />;
               },
          },
     ];
     const rows = signUps.map((signUp) => ({
          id: signUp.id,
          student: signUp.alumno || "no info",
          course: signUp.curso || "no info",
          professor: signUp.profesor || "no info",
          signUpDate: signUp.fechaInscripcion || "no info",
          start: signUp.fechaInicio || "no info",
          end: signUp.fechaFin || "no info",
          finished: signUp.completado ? "Completado" : "No Completado",
     }));
     return {
          columns,
          rows,
     };
};
