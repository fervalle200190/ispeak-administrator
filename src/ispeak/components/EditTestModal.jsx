import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks";
import { updateTest } from "../../utils";
import { ModalEditLayout } from "../layout/ModalEditLayout";
import { SnackBarComponent } from "./SnackBarComponent";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El puntaje ha sido editado",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const EditTestModal = ({ onModalInfo, closeModal, getTests }) => {
     const { email, name, lastname, score: scoreOld } = onModalInfo.modalData;
     const { score, onInputChange, setFormState } = useForm({ score: scoreOld });
     const [isLoading, setIsLoading] = useState(false);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     useEffect(() => {
          setFormState({ score: scoreOld });
     }, [onModalInfo.modalData]);

     const onSubmit = async (e) => {
          e.preventDefault();
          if (scoreOld === score) {
               return setSnackBarInfo({
                    ...errorSnackbar,
                    message: "Por favor cambia la nota",
               });
          }
          setIsLoading(true)
          const { ok, data, errorMessage } = await updateTest({ ...onModalInfo.modalData, score });
          setIsLoading(false)
          if (!ok) {
               return setSnackBarInfo({ ...errorSnackbar, message: errorMessage });
          }
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          getTests()
     };
     return (
          <>
               <ModalEditLayout
                    isModalOpen={onModalInfo.isModalOpen}
                    handleModal={closeModal}
                    width={"50%"}
               >
                    <Box component={"form"} sx={{ p: 5 }} onSubmit={onSubmit}>
                         <Typography variant='h5' mb={2}>Editar resultado del test</Typography>
                         <Grid container>
                              <Grid item xs={12} my={1}>
                                   <TextField
                                        value={name}
                                        label="Nombre"
                                        disabled
                                        fullWidth
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} my={1}>
                                   <TextField
                                        value={lastname}
                                        label="Apellido"
                                        disabled
                                        fullWidth
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} my={1}>
                                   <TextField
                                        value={email}
                                        label="Correo"
                                        disabled
                                        fullWidth
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} my={1}>
                                   <TextField
                                        value={!score ? "" : score}
                                        label="Puntaje"
                                        onChange={onInputChange}
                                        name="score"
                                        fullWidth
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} mt={2}>
                                   <Button
                                        variant="outlined"
                                        size="large"
                                        type="submit"
                                        disabled={isLoading}
                                   >
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
