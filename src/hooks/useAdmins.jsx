import { DeleteData } from "../ispeak/components";

export const useAdmins = (admins) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150, editable: true },
          {
               field: "nameAndLastName",
               headerName: "Nombre y Apellido",
               width: 200,
               editable: true,
          },
          { field: "email", headerName: "Email", width: 150, editable: true },
          { field: "city", headerName: "Ciudad", width: 150, editable: true },
          { field: "country", headerName: "País", width: 150, editable: true },
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
     const rows = admins.map((admin) => ({
          id: admin.id,
          nameAndLastName: admin.nombre || " no info",
          email: admin.email || "no info",
          city: admin.ciudad || " no info",
          country: admin.pais.nombre || "no info",
          blocked: admin.bloqueado ? "Bloqueado" : "No bloqueado",
     }));

     return {
          columns,
          rows,
     };
};
