import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useForm, useParsedData } from "../../hooks";
import { getModulesByCourse, postAttendance } from "../../utils";
import { PageHeader, SelectOptions } from "../components";
import { DataContext } from "../context";
import { processAttendance } from "../helper";
import { initialClassOption } from "../utils";

const initialForm = {
     observaciones: "",
     date: "",
};

const initialSelected = {
     profesorSelected: "",
     moduloSelected: "",
     studentSelected: "",
     courseSelected: "",
     classSelected: "",
};

export const AddAttendancePage = () => {
     const { courses, students, professors } = useContext(DataContext);
     const { coursesParsed, studentsParsed, professorsParsed } = useParsedData({
          courses,
          students,
          professors,
     });
     const { observaciones, date, onInputChange } = useForm(initialForm);
     const [valueSelected, setValueSelected] = useState(initialSelected);
     const [selectsData, setSelectsData] = useState({ moduleList: [] });

     const getLists = async () => {
          const res = await getModulesByCourse(valueSelected.courseSelected);
          setSelectsData({
               moduleList: res.map((mod) => ({ label: mod.nombre, value: mod.id })),
          });
     };

     useEffect(() => {
          if (valueSelected.courseSelected === "") return;
          getLists();
     }, [valueSelected.courseSelected]);

     const onValueSelected = (e, selector) => {
          setValueSelected({
               ...valueSelected,
               [selector]: e.target.value,
          });
     };

     const onSubmit = async (e) => {
          e.preventDefault();
          if (
               valueSelected.classSelected === "" ||
               valueSelected.courseSelected === "" ||
               valueSelected.moduloSelected === "" ||
               valueSelected.profesorSelected === "" ||
               valueSelected.studentSelected === "" ||
               observaciones === "" ||
               date === ""
          ) {
               // error
               return;
          }
          const res = await postAttendance(processAttendance({...valueSelected, observaciones, date}))
          console.log(res)
     };

     return (
          <>
               <PageHeader title="Gestión de Asistencias" />
               <Box
                    component={"form"}
                    width={"100%"}
                    maxWidth={500}
                    sx={{ pb: 10 }}
                    onSubmit={onSubmit}
               >
                    <Grid container>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={studentsParsed}
                                   value={valueSelected.studentSelected}
                                   label={"Alumno"}
                                   handleSelect={(e) => onValueSelected(e, "studentSelected")}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={coursesParsed}
                                   value={valueSelected.courseSelected}
                                   handleSelect={(e) => onValueSelected(e, "courseSelected")}
                                   label={"Curso"}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={professorsParsed}
                                   label={"Profesor"}
                                   value={valueSelected.profesorSelected}
                                   handleSelect={(e) => onValueSelected(e, "profesorSelected")}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={selectsData.moduleList}
                                   label={"Modulo"}
                                   value={valueSelected.moduloSelected}
                                   handleSelect={(e) => onValueSelected(e, "moduloSelected")}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <TextField
                                   type={"date"}
                                   name="date"
                                   value={date}
                                   onChange={onInputChange}
                                   fullWidth
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <TextField
                                   fullWidth
                                   variant="outlined"
                                   label={"Observaciones"}
                                   name="observaciones"
                                   value={observaciones}
                                   onChange={onInputChange}
                                   InputLabelProps={{
                                        className: "textfield-label",
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={initialClassOption}
                                   label={"Clase"}
                                   value={valueSelected.classSelected}
                                   handleSelect={(e) => onValueSelected(e, "classSelected")}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <Button variant="outlined" size={"large"}>
                                   Guardar
                              </Button>
                         </Grid>
                    </Grid>
               </Box>
          </>
     );
};
