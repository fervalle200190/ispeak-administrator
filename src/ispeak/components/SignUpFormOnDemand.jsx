import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useContext, useMemo } from "react";
import { useCourseSelect, useForm } from "../../hooks";
import { postSignUpsOnDemand } from "../../utils";
import { DataContext } from "../context";
import { getSignUpToSend } from "../helper";
import { SelectOptions } from "./SelectOptions";

export const SignUpFormOnDemand = () => {
     const { coursesList, courseSelected, handleCourse } = useCourseSelect();
     const { students } = useContext(DataContext);
     const { observaciones, onInputChange } = useForm({ observaciones: "" });
     const [studentSelected, setStudentSelected] = useState("");

     const studentsParsed = useMemo(() => {
          const newData = students.rows.map((student) => {
               return {
                    label: student.nameAndLastName,
                    value: student.id,
               };
          });
          return newData;
     }, [students]);

     const onStudentSelectedChange = (e) => {
          setStudentSelected(e.target.value);
     };

     const onSubmit = async (e) => {
          e.preventDefault();
          const res = await postSignUpsOnDemand(getSignUpToSend({courseSelected, studentSelected, observaciones}));
          console.log(res)
     };
     return (
          <Box component="form" onSubmit={onSubmit}>
               <Grid container spacing={1}>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={studentsParsed}
                              label="Alumno"
                              onChange={onStudentSelectedChange}
                              value={studentSelected}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={coursesList}
                              value={courseSelected}
                              handleSelect={handleCourse}
                              label="Curso"
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <TextField
                              type="text"
                              fullWidth
                              multiline
                              name="observaciones"
                              value={observaciones}
                              onChange={onInputChange}
                              label="Observaciones"
                              InputLabelProps={{
                                   className: "textfield-label",
                              }}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <Button variant="outlined" size="large" type="submit">
                              Guardar
                         </Button>
                    </Grid>
               </Grid>
          </Box>
     );
};
