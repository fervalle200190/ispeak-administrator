import { DeleteData } from "../ispeak/components";

export const useAttends = (attends) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150, editable: true },
          {
               field: "student",
               headerName: "Alumno",
               width: 150,
               editable: true,
          },
          { field: "course", headerName: "Curso", width: 150, editable: true },
          { field: "module", headerName: "Modulo", width: 150, editable: true },
          { field: "day", headerName: "Día", width: 150, editable: true },
          {
               field: "present",
               headerName: "Presente",
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

     const rows = attends.map((attend) => ({
          id: attend.id,
          student: attend.alumno || "no info",
          course: attend.curso || "no info",
          module: attend.modulo || "no info",
          day: attend.dia || "no info",
          present: attend.presente || "no info",
     }));

     return {
          columns,
          rows,
     };
};
