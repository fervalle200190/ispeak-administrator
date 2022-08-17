import { DeleteData } from "../ispeak/components";

export const useStudents = (users) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150 },
          {
               field: "nameAndLastName",
               headerName: "Nombre y Apellido",
               width: 150,
               editable: true,
          },
          { field: "email", headerName: "E-mail", width: 150 },
          { field: "city", headerName: "Ciudad", width: 150 },
          { field: "country", headerName: "País", width: 150 },
          { field: "currentCourse", headerName: "Curso Actual" },
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
     const usersRow = users
          .filter((user) => user.rol === "Alumno")
          .map((user) => ({
               id: user.id || "no info",
               nameAndLastName: user.nombre || "no info",
               email: user.email || "no info",
               city: user.ciudad || "no info",
               country: user.pais.nombre || "no info",
               currentCourse: "no info",
          }));

     return {
          columns,
          rows: usersRow,
     };
};
