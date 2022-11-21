import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "../../hooks";
import { getPaymentById, postSendEmail, updatePayment } from "../../utils";
import { ModalEditLayout } from "../layout/ModalEditLayout";
import { SnackBarComponent } from "./SnackBarComponent";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Estudiante ha sido editado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

const initialForm = {
     email: "",
};

export const EditPaymentModal = ({ isModalOpen, closeModal, onEditId }) => {
     const { email, onInputChange } = useForm(initialForm);
     const [paymentRaw, setPaymentRaw] = useState("");
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [isLoading, setIsLoading] = useState(false);

     const getData = async (id) => {
          const { payment } = await getPaymentById(id);
          setPaymentRaw(payment);
          onInputChange({ target: { value: payment.email, name: "email" } });
     };

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     useEffect(() => {
          if (onEditId === "") return;
          getData(onEditId);
     }, [onEditId]);

     const onSubmit = async (e) => {
          e.preventDefault();
          if (email === paymentRaw.email)
               return setSnackBarInfo({
                    ...errorSnackbar,
                    message: "Por favor completa los datos",
               });
          setIsLoading(true);
          const { ok, data, errorMessage } = await updatePayment({ ...paymentRaw, email });
          setIsLoading(false);
          if (!ok) return setSnackBarInfo({ ...errorSnackbar, message: errorMessage });
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true, message: data });
     };

     const onClickSendEmail = async () => {
          setIsLoading(true);
          const { ok, data, errorMessage } = await postSendEmail(paymentRaw.id);
          setIsLoading(false);
          if (!ok) return setSnackBarInfo({ ...errorSnackbar, message: errorMessage });
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true, message: 'Correo enviado' });
     };

     return (
          <>
               <ModalEditLayout isModalOpen={isModalOpen} width="50%" handleModal={closeModal}>
                    <Grid container sx={{ backgroundColor: "#fff", p: 4 }}>
                         <Box component={"form"} onSubmit={onSubmit} sx={{ width: "100%" }}>
                              <Typography variant="h5" fontWeight={500} mb={2}>
                                   Actualizar correo del pago
                              </Typography>
                              <Grid item xs={12}>
                                   <TextField
                                        label="Correo"
                                        fullWidth
                                        type="email"
                                        name="email"
                                        onChange={onInputChange}
                                        value={email}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Button variant="outlined" type="submit" disabled={isLoading} sx={{ mt: 2 }}>
                                   Guardar
                              </Button>
                         </Box>
                         <Typography variant="h5" fontWeight={500} mt={2} mb={2}>
                              Reenviar correo de Bienvenida
                         </Typography>
                         <Grid item xs={12}>
                              <Button
                                   variant="contained"
                                   onClick={onClickSendEmail}
                                   color="error"
                                   disabled={isLoading}
                              >
                                   Reenviar correo
                              </Button>
                         </Grid>
                    </Grid>
               </ModalEditLayout>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
