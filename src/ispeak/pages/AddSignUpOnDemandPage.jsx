import { Box } from "@mui/material";
import { PageHeader, SignUpFormOnDemand } from "../components";

export const AddSignUpOnDemandPage = () => {
     return (
          <Box component="div" sx={{ pr: 2 }}>
               <PageHeader title={"Inscribir Alumno"} />
               <SignUpFormOnDemand />
          </Box>
     );
};
