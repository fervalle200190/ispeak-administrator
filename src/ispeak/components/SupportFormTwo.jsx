import { Box, Button, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useForm, useSupportFormTwo } from "../../hooks";
import { postFileSupport } from "../../utils";
import { ModalTabsContext } from "../context";
import { kindOfMaterial } from "../utils";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialForm = {
     nombre: "",
     pathAcceso: "",
};

export const SupportFormTwo = ({ handleSnackbar }) => {
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const {
          supportList,
          supportMaterialSelected,
          handleKindOfMaterialSelected,
          handleMaterialSelected,
          kindOfMaterialSelected,
          handleReset,
     } = useSupportFormTwo();

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (
               formState.nombre === "" ||
               supportMaterialSelected === "" ||
               formState.pathAcceso === "" ||
               kindOfMaterialSelected === ""
          ) {
               return;
          }
          const dataToSend = {
               id: 0,
               nombre: formState.nombre,
               refuerzoId: supportMaterialSelected,
               pathAcceso: formState.pathAcceso,
               tipoContenido: kindOfMaterialSelected,
          };

          const res = await postFileSupport(dataToSend);
          if (res.id !== 0) {
               handleReset();
               onResetForm();
               handleSnackbar()
          }
     };
     return (
          <Box component="form" sx={{ mt: 10, pb: 10 }} onSubmit={handleSubmit}>
               <Grid container spacing={2} sx={{pl: 4, pr: 4}}>
                    <Grid item xs={12}>
                         <SelectOptions
                              options={supportList}
                              handleSelect={handleMaterialSelected}
                              value={supportMaterialSelected}
                              label="Material de refuerzo"
                         />
                    </Grid>
                    <Grid item xs={12}>
                         <TextField
                              fullWidth
                              name={"nombre"}
                              label="Nombre"
                              value={formState.nombre}
                              onChange={onInputChange}
                              InputLabelProps={{
                                   className: "textfield-label",
                              }}
                         />
                    </Grid>
                    <Grid item xs={12}>
                         <SelectOptions
                              options={kindOfMaterial}
                              value={kindOfMaterialSelected}
                              handleSelect={handleKindOfMaterialSelected}
                              label="Tipo de Material"
                         />
                    </Grid>
                    <Grid item xs={12}>
                         <TextField
                              fullWidth
                              name={"pathAcceso"}
                              value={formState.pathAcceso}
                              onChange={onInputChange}
                              label="Link"
                              InputLabelProps={{
                                   className: "textfield-label",
                              }}
                         />
                    </Grid>
                    <Grid item xs={12}>
                         <Button type="submit" variant="outlined" size="large">
                              Guardar
                         </Button>
                    </Grid>
               </Grid>
          </Box>
     );
};
