export const usePayments = (payments) => {
     const columns = [
          { field: "id", headerName: "Código", width: 80 },
          { field: "nameAndLastName", headerName: "Nombre y Apellido", width: 210 },
          { field: "email", headerName: "Correo", width: 240 },
          { field: "company", headerName: "Pasarela", width: 150 },
          { field: "amount", headerName: "Cantidad", width: 100 },
          { field: "plan", headerName: "Plan", width: 100 },
          { field: "status", headerName: "Estatus", width: 100 },
     ];

     const rows = payments.map((pay) => ({
          id: pay.id,
          nameAndLastName: `${pay.nombre} ${pay.apellido}`,
          email: pay.email,
          company: pay.pasarela || "No info",
          amount: pay.amount || "No info",
          plan: pay.item || "No info",
          status: pay.status || "No info",
     }));

     return {
          columns,
          rows,
     };
};
