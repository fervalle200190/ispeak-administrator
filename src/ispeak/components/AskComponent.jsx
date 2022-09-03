import { Button, Grid, Typography } from "@mui/material";
import { SelectOptions } from "./SelectOptions";

export const AskComponent = ({ business, businessSelected, handleBusiness, handleContinue }) => {
     return (
          <Grid container sx={{ pr: 2 }}>
               <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography variant="h5">
                         Selecciona un plan de negocio
                    </Typography>
               </Grid>
               <Grid item xs={12} sm={7}>
                    <SelectOptions
                         options={business}
                         value={businessSelected}
                         handleSelect={handleBusiness}
                         label="Unidad de Negocio"
                    />
               </Grid>
               <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleContinue}>Continuar</Button>
               </Grid>
          </Grid>
     );
};
