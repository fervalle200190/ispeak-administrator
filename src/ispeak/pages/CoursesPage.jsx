import { Box } from "@mui/material";
import { useContext } from "react";
import { Datagrid, PageHeader } from "../components";
import { DataContext } from "../context";

export const CoursesPage = () => {
     const { courses } = useContext(DataContext);
     return (
          <>
               <PageHeader
                    title="Cursos"
                    buttonTitle="Agregar Curso"
                    url={"/courses/ingresar"}
               />
               <Box container height={"100vh"} sx={{ pr: 2 }}>
                    <Datagrid rows={courses.rows} columns={courses.columns} />
               </Box>
          </>
     );
};
