import {
     Checkbox,
     List,
     ListItem,
     ListItemButton,
     ListItemText,
     Typography,
} from "@mui/material";
import { memo} from "react";

const ListComponent = ({ handleCheck, checked, coursesCombo }) => {
     return (
          <List sx={{ display: { xs: "block", sm: "flex" }, flexWrap: "wrap" }}>
               {coursesCombo.length > 0 ? (
                    coursesCombo.map((course, index) => (
                         <ListItem
                              key={course.name + Math.random()}
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
