import { DeleteData } from "../ispeak/components";

export const useSupportMaterial = (supportMaterials) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150, editable: true },
          { field: "course", headerName: "Curso", width: 300, editable: true },
          {
               field: "kindSupport",
               headerName: "Tipo de refuerzo",
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

     const rows = supportMaterials.map((supportMaterial) => ({
          id: supportMaterial.id,
          course: supportMaterial.curso,
          kindSupport: supportMaterial.tipoRefuerzo,
     }));

     return {
          columns,
          rows,
     };
};
