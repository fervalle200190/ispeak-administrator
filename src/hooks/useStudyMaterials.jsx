import { DeleteData } from "../ispeak/components";

export const useStudyMaterials = (studyMaterials) => {
     const columns = [
          { field: "id", headerName: "Código", width: 100, editable: false },
          { field: "name", headerName: "Nombre", width: 200, editable: false },
          { field: "course", headerName: "Curso", width: 150, editable: false },
          { field: "module", headerName: "Modulo", width: 280, editable: false },
          { field: "class", headerName: "Clase", width: 100, editable: false },
          { field: "active", headerName: "Activo", width: 80, editable: false },
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

     const rows = studyMaterials.map((studyMaterial) => ({
          id: studyMaterial.id,
          name: studyMaterial.nombre || "no info",
          course: studyMaterial.curso || "no info",
          module: studyMaterial.modulo || "no info",
          class: studyMaterial.claseNumero
               ? `Clase ${studyMaterial.claseNumero}`
               : "no info",
          active: studyMaterial.activo ? "Activo" : "Desactivado",
     }));

     return {
          columns,
          rows,
     };
};
