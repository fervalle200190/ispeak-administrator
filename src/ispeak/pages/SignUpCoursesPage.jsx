import { Box } from "@mui/material";
import { useContext } from "react";
import { Datagrid, PageHeader } from "../components";
import { DataContext } from "../context";

export const SignUpCoursesPage = () => {
     const { signUp } = useContext(DataContext);
     return (
          <>
               <PageHeader
                    title={"Inscripciones"}
                    buttonTitle="Agregar inscripciones"
                    url="sign-courses/ingresar"
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <Datagrid columns={signUp.columns} rows={signUp.rows} />
               </Box>
          </>
     );
};
