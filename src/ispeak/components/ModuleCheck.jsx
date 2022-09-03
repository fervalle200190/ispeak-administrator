import { Checkbox, FormControlLabel } from "@mui/material";

export const ModuleCheck = ({ module, handleModule, modulesSelected }) => {
     return (
          <>
               {module.modulesCourse.map((moduleCourse) => (
                    <FormControlLabel
                         key={moduleCourse.id}
                         control={
                              <Checkbox
                                   name={`${moduleCourse.id}`}
                                   checked={
                                        modulesSelected[
                                             `${moduleCourse.nombre}`
                                        ]
                                   }
                                   onChange={handleModule}
                                   sx={{
                                        color: "primary.main",
                                   }}
                              />
                         }
                         label={moduleCourse.nombre}
                    />
               ))}
          </>
     );
};
