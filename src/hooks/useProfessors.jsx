import { DeleteData } from "../ispeak/components";

export const useProfessors = (users) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150, editable: true },
          {
               field: "nameAndLastName",
               headerName: "Nombre y Apellido",
               width: 150,
               editable: true,
          },
          { field: "email", headerName: "E-mail", width: 150, editable: true },
          { field: "city", headerName: "Ciudad", width: 150, editable: true },
          { field: "country", headerName: "País", width: 150, editable: true },
          {
               field: "amountCourse",
               headerName: "Cant. Cursos",
               width: 150,
               editable: true,
          },
          {
               field: "blocked",
               headerName: "Bloqueado",
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

     const rows = users
          .filter((user) => user.rol === "Profesor")
          .map((user) => ({
               id: user.id,
               nameAndLastName: user.nombre,
               email: user.email,
               city: user.ciudad || "no info",
               country: user.pais.nombre,
               amountCourse: "no existe",
               blocked: user.bloqueado ? "bloqueado" : "no bloqueado",
          }));
     return {
          columns,
          rows,
     };
};
