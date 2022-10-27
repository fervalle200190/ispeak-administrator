import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useForm, useSignUpForm } from "../../hooks";
import { getSignUpOnDemandById, updateSignUpOnDemand } from "../../utils";
import { getSignUpToSend } from "../helper";
import { ModalEditLayout } from "../layout/ModalEditLayout";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Alumno ha sido inscrito exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

const initialForm = { observaciones: "" };

export const EditSignUpOnDemandModal = ({ isModalOpen, handleModal, id }) => {
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [rawInfo, setRawInfo] = useState({})
     const {
          studentSelected,
          programSelected,
          studentsParsed,
          programsParsed,
          onStudentSelectedChange,
          onProgramSelectedChange,
          resetSelects,
     } = useSignUpForm("");
     const { observaciones, onInputChange, onResetForm, setFormState } = useForm(initialForm);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const getSignUpInfo = async (signUpId) => {
          const res = await getSignUpOnDemandById(signUpId);
          setFormState({ observaciones: res.observaciones });
          onStudentSelectedChange({target: {value: res.alumnoId}})
          onProgramSelectedChange({ target: { value: res.programaId }})
          setRawInfo(res)
     };

     useEffect(() => {
          if (id === "") return;
          getSignUpInfo(id);
     }, [id]);

     const onSubmit = async (e) => {
          e.preventDefault();
          if (studentSelected === "" || programSelected === "" || observaciones === "") {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const res = await updateSignUpOnDemand(
               getSignUpToSend({ rawInfo, programSelected, studentSelected, observaciones })
          );
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          onResetForm();
          resetSelects()
     };
     return (
          <>
               <ModalEditLayout isModalOpen={isModalOpen} handleModal={handleModal}>
                    <Box component="form" onSubmit={onSubmit} sx={{ p: 5 }}>
                         <Grid container spacing={1}>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        options={studentsParsed}
                                        label="Alumno"
                                        handleSelect={onStudentSelectedChange}
                                        value={studentSelected}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        options={programsParsed}
                                        value={programSelected}
                                        handleSelect={onProgramSelectedChange}
                                        label="Programa"
                                   />
                              </Grid>
                              <Grid item xs={12}>
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
                              <Grid item xs={12}>
                                   <Button variant="outlined" size="large" type="submit">
                                        Guardar
                                   </Button>
                              </Grid>
                         </Grid>
                    </Box>
               </ModalEditLayout>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
