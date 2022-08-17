import { Box } from "@mui/material";
import { useContext } from "react";
import { Datagrid, PageHeader } from "../components";
import { DataContext } from "../context";

export const StudyMaterialPage = () => {
     const { studyMaterial } = useContext(DataContext);
     return (
          <>
               <PageHeader
                    title={"Material Estudio"}
                    buttonTitle="Agregar Material"
                    url="/study-material/ingresar"
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <Datagrid
                         columns={studyMaterial.columns}
                         rows={studyMaterial.rows}
                    />
               </Box>
          </>
     );
};
