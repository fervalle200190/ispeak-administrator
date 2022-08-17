import { DeleteData } from "../ispeak/components";

export const useStudyMaterials = (studyMaterials) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150, editable: true },
          { field: "name", headerName: "Nombre", width: 150, editable: true },
          { field: "course", headerName: "Curso", width: 150, editable: true },
          { field: "module", headerName: "Modulo", width: 150, editable: true },
          { field: "class", headerName: "Clase", width: 150, editable: true },
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
