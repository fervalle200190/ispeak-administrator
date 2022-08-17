import { Box } from "@mui/material";
import { useContext } from "react";
import { Datagrid, PageHeader } from "../components";
import { DataContext } from "../context";

export const AdministratorPage = () => {
     const { admin } = useContext(DataContext);
     return (
          <>
               <PageHeader
                    title="Administradores"
                    buttonTitle={"Agregar administrador"}
                    url="/administrators/ingresar"
               />
               <Box height="100vh" sx={{ pr: 2 }}>
                    <Datagrid columns={admin.columns} rows={admin.rows} />
               </Box>
          </>
     );
};
