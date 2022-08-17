import { DeleteData } from "../ispeak/components";

export const useSignUpsOnDemand = (signUpsOnDemand) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150, editable: true },
          {
               field: "student",
               headerName: "Alumno",
               width: 150,
               editable: true,
          },
          {
               field: "program",
               headerName: "Programa",
               width: 150,
               editable: true,
          },
          {
               field: "signUpDate",
               headerName: "Fecha de inscripción",
               width: 150,
               editable: true,
          },
          {
               field: "finished",
               headerName: "Curso completado",
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

     const rows = signUpsOnDemand.map((signUpOnDemand) => ({
          id: signUpOnDemand.id,
          student: signUpOnDemand.alumno || 'no info',
          program: signUpOnDemand.programa || 'no info',
          signUpDate: signUpOnDemand.fechaInscripcion || 'no info',
          finished: signUpOnDemand.completado ? "Completado" : "No completado",
     }));

     return {
        columns,
        rows
     }
};
