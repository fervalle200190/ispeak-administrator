import { Box } from "@mui/material";
import { useContext } from "react";
import { Datagrid, PageHeader } from "../components";
import { DataContext } from "../context";

export const SignUpOnDemandPage = () => {
     const { signUpOnDemand } = useContext(DataContext);
     return (
          <>
               <PageHeader
                    title="Inscripciones Cursos OnDemand"
                    buttonTitle={"Agregar cursos"}
                    url="sign-ondemand"
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <Datagrid
                         columns={signUpOnDemand.columns}
                         rows={signUpOnDemand.rows}
                    />
               </Box>
          </>
     );
};
