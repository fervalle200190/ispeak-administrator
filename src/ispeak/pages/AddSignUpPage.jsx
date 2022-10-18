import { Box } from "@mui/material";
import { PageHeader, SignUpForm } from "../components";

export const AddSignUpPage = () => {
     return (
          <Box component='div' sx={{pr: 2}}>
               <PageHeader title={"Inscribir Alumno"} />
               <SignUpForm />
          </Box>
     );
};
