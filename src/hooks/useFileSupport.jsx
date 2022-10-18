export const useFileSupport = (files) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150 },
          { field: "name", headerName: "Nombre", width: 150 },
          {
               field: "kindOfMaterial",
               headerName: "Tipo de Material",
               width: 150,
          },
     ];
     const rows = files.map((file) => ({
          id: file.id,
          name: file.nombre,
          kindOfMaterial: file.tipoContenido,
     }))
     return {
          columns,
          rows,
     };
};
