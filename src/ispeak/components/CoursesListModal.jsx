import { Box, Typography } from "@mui/material";

export const CoursesListModal = ({coursesList}) => {
     return (
          <Box pt={5} px={5}>
               <Typography variant="h5">Cursos inscrito</Typography>
               <ul>
                    {coursesList.map((course) => (
                         <li key={course.id}>{course.nombre}</li>
                    ))}
               </ul>
          </Box>
     );
};
