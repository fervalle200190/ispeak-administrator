import { useState } from "react";
import { ModalLayout } from "../layout/ModalLayout";
import { SnackBarComponent } from "./SnackBarComponent";
import { SupportFormTwo } from "./SupportFormTwo";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Archivo de refuerzo ha sido subido exitosamente!!",
};

export const AddFileModal = () => {
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };
     return (
          <>
               <ModalLayout width={"50%"}>
                    <SupportFormTwo setSnackBarInfo={setSnackBarInfo} initialSnackBar={initialSnackBar} />
               </ModalLayout>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
