import { Box, Button, TextField, Typography } from "@mui/material";
import { ModalEditLayout } from "../layout/ModalEditLayout";

export const EditPaymentModal = ({ isModalOpen, closeModal }) => {
     return (
          <ModalEditLayout isModalOpen={isModalOpen} width="50%" handleModal={closeModal}>
               <Box sx={{ backgroundColor: "#fff", p: 4 }}>
                    <Typography variant="h5" fontWeight={600} mb={2}>
                         Actualizar correo del pago
                    </Typography>
                    <TextField
                         label="Correo"
                         fullWidth
                         InputLabelProps={{
                              className: "textfield-label",
                         }}
                    />
                    <Button variant="outlined" sx={{ mt: 2 }}>
                         Guardar
                    </Button>
                    <Button variant="contained" sx={{ mt: 2, ml:2 }} onClick={closeModal} color="error">
                         Cancelar
                    </Button>
               </Box>
          </ModalEditLayout>
     );
};
