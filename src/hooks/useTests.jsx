export const useTests = (tests) => {
     const columns = [
          { field: "id", headerName: "Código", width: 80 },
          { field: "name", headerName: "Nombre", width: 100 },
          { field: "lastname", headerName: "Apellido", width: 100 },
          { field: "email", headerName: "Correo", width: 250 },
          { field: "score", headerName: "Puntuación", width: 100 },
     ];

     const rows = tests;

     return {
          columns,
          rows,
     };
};
