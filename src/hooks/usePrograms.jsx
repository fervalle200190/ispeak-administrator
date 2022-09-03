import { DeleteData } from "../ispeak/components";

export const usePrograms = (programs) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150, editable: true },
          { field: "name", headerName: "Nombre", width: 300, editable: true },
          { field: "active", headerName: "Activo", width: 150, editable: true },
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
     const rows = programs.map((program) => ({
          id: program.id,
          name: program.nombre,
          active: program.activo ? "Activo" : "Desactivado",
     }));

     return {
          columns,
          rows,
     };
};
