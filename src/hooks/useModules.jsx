import { DeleteData } from "../ispeak/components";

export const useModules = (modules, course) => {
     const shortedModules = modules.filter(
          (module) => module.curso.id === course
     );
     const columns = [
          { field: "id", headerName: "Código", width: 150 },
          { field: "name", headerName: "Nombre", width: 350, editable: true },
          { field: "duration", headerName: "Duración", width: 150, editable: true },
          { field: "active", headerName: "Activo", width: 100 },
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
     const rows = shortedModules.map((module) => ({
          id: module.id,
          name: module.nombre || "no info",
          duration: module.duracion || "no info",
          active: module.activo ? "Activo" : "No activo",
     }));

     return {
          columns,
          rows,
     };
};
