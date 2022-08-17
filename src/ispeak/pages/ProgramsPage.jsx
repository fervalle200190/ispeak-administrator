import { Box } from "@mui/material";
import { useContext } from "react";
import { Datagrid, PageHeader } from "../components";
import { DataContext } from "../context";

export const ProgramsPage = () => {
     const { programs } = useContext(DataContext);
     return (
          <>
               <PageHeader
                    title={"Programas Educativos"}
                    buttonTitle={"Agregar Programa"}
                    url={'/programs/ingresar'}
               />
               <Box container height={"100vh"} sx={{ pr: 2 }}>
                    <Datagrid rows={programs.rows} columns={programs.columns} />
               </Box>
          </>
     );
};
