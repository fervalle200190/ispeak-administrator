import { Box } from "@mui/material";
import { useContext } from "react";
import { Datagrid, PageHeader } from "../components";
import { DataContext } from "../context";

export const AttendsPage = () => {
     const { attend } = useContext(DataContext);
     return (
          <>
               <PageHeader
                    title="Asistencias"
                    buttonTitle={"Agregar asistencias"}
                    url="/attendance/ingresar"
               />
               <Box height="100vh" sx={{ pr: 2 }}>
                    <Datagrid columns={attend.columns} rows={attend.rows} />
               </Box>
          </>
     );
};
