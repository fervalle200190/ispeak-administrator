import {
     Checkbox,
     List,
     ListItem,
     ListItemButton,
     ListItemIcon,
     ListItemText,
     Typography,
} from "@mui/material";
import { memo, useEffect } from "react";
import { useGetAllCoursesCombo } from "../../hooks";

const ListComponent = ({ handleCheck, checked }) => {
     const { coursesCombo } = useGetAllCoursesCombo();
     useEffect(() => {
          console.log("se montó");
     }, [coursesCombo]);

     return (
          <List sx={{ display: { xs: "block", sm: "flex" }, flexWrap: "wrap" }}>
               {coursesCombo.length > 0 ? (
                    coursesCombo.map((course, index) => (
                         <ListItem
                              key={course.name}
                              sx={{ width: { xs: "100%", sm: "50%" } }}
                              disablePadding
                              value={index}
                              onClick={() => handleCheck(index)}
                         >
                              <ListItemButton>
                                   <Checkbox
                                        sx={{ color: "primary.main" }}
                                        checked={checked.indexOf(index) !== -1}
                                   />
                                   <ListItemText primary={course.name} />
                              </ListItemButton>
                         </ListItem>
                    ))
               ) : (
                    <Typography>Esperando data...</Typography>
               )}
          </List>
     );
};

export const CoursesList = memo(ListComponent);
