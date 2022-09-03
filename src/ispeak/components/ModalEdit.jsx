import { Button, Grid, Modal, Typography } from "@mui/material";

export const ModalEdit = ({ title, isModalOpen, handleClose, handleAction }) => {
     return (
          <Modal open={isModalOpen} onClose={handleClose}>
               <Grid
                    justifyContent={"center"}
                    container
                    sx={{
                         position: "absolute",
                         top: "50%",
                         left: "50%",
                         transform: "translate(-50%,-50%)",
                         backgroundColor: "#fff",
                         width: { sx: 300, sm: 500 },
                         padding: 5,
                         borderRadius: "4px",
                    }}
               >
                    <Typography
                         variant="h5"
                         textAlign={"center"}
                         sx={{ mb: 2 }}
                    >
                         {title}
                    </Typography>
                    <Grid container justifyContent={"center"} spacing={2}>
                         <Grid item>
                              <Button
                                   variant="outlined"
                                   onClick={() => {
                                        handleAction();
                                   }}
                              >
                                   Si, editar
                              </Button>
                         </Grid>
                         <Grid item>
                              <Button
                                   variant="contained"
                                   color={"error"}
                                   onClick={handleClose}
                              >
                                   Cancelar
                              </Button>
                         </Grid>
                    </Grid>
               </Grid>
          </Modal>
     );
};
