import { Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { ModalTabsContext, RoomsContext } from "../context";
import { AddRoomModal } from "./AddRoomModal";
import { Datagrid } from "./Datagrid";
import { SnackBarComponent } from "./SnackBarComponent";

export const TabThree = () => {
     const { roomsList, roomsChangers } = useContext(RoomsContext);
     const { handleModal } = useContext(ModalTabsContext);
     const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
     const handleSnackbar = () => {
          setIsSnackBarOpen(!isSnackBarOpen);
     };
     return (
          <Grid container spacing={2}>
               <Grid item xs={12} sm={8} height={400}>
                    <Datagrid
                         columns={roomsList.columns}
                         rows={roomsList.rows}
                    />
               </Grid>
               <Grid item xs={12} sm={4}>
                    <Button variant="contained" onClick={handleModal}>
                         Agregar nueva sala
                    </Button>
               </Grid>
               <AddRoomModal
                    handleModal={handleModal}
                    handleSnackbar={handleSnackbar}
                    roomsChangers={roomsChangers}
               />
               <SnackBarComponent
                    handleSnackbar={handleSnackbar}
                    isSnackBarOpen={isSnackBarOpen}
                    message="La sala ha sido creada exitosamente!!"
               />
          </Grid>
     );
};
