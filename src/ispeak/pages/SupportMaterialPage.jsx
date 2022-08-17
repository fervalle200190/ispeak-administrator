import { Box } from "@mui/material";
import { useContext } from "react";
import { Datagrid, PageHeader } from "../components";
import { DataContext } from "../context";

export const SupportMaterialPage = () => {
     const { supportMaterial } = useContext(DataContext);
     return (
          <>
               <PageHeader
                    title="Material de refuerzo"
                    buttonTitle={"Agregar Material de refuerzo"}
                    url="support-material/ingresar"
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <Datagrid
                         columns={supportMaterial.columns}
                         rows={supportMaterial.rows}
                    />
               </Box>
          </>
     );
};
