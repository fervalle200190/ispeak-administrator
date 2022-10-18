export const useRooms = (rooms) => {
     const columns = [
          { field: "id", headerName: "Código", width: 150 },
          { field: "name", headerName: "Nombre", width: 150 },
          { field: "url", headerName: "Url", width: 150 },
          { field: "course", headerName: "Curso", width: 150 },
          { field: "password", headerName: "Contraseña", width: 150 },
     ];

     const rows = rooms.map((room) => ({
          id: room.id,
          name: room.nombre,
          url: room.url,
          course: room.curso.nombre,
          password: room.password,
     }));
     return {
          columns,
          rows,
     };
};
