import { DeleteData } from "../ispeak/components";

export const useCourses = (courses) => {
     let columns = [
          { field: "id", headerName: "Código", width: 150 },
          { field: "name", headerName: "Nombre", width: 150, editable: true },
          { field: "duration", headerName: "Duración", width: 150, editable: true },
          {
               field: "businessUnit",
               headerName: "Unidad de negocio",
               width: 150,
               editable: true,
          },
          { field: "active", headerName: "Activo", width: 150 },
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
     let rows = courses.map((course) => ({
          id: course.id,
          name: course.nombre,
          duration: course.duracion,
          businessUnit: course.unidadNegocioId,
          active: course.activo ? "Activo" : "Desactivado",
     }));

     return {
          columns,
          rows,
     };
};
