import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { deleteAttend } from "../../utils";
import {
     DataGridWithModal,
     EditAttendModal,
     ModalAction,
     PageHeader,
     SnackBarComponent,
} from "../components";
import { DataContext, ModalContext } from "../context";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El material de estudio ha sido editado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const AttendsPage = () => {
     const { attend, getAttends } = useContext(DataContext);
     const { isModalOpen: isModalDeleteOpen, handleModal, id } = useContext(ModalContext);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [onEditId, setOnEditId] = useState("");

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const openModal = ({ id }) => {
          setIsModalOpen(true);
          setOnEditId(id);
     };

     const closeModal = () => {
          setIsModalOpen(false);
     };

     const handleDelete = async () => {
          const res = await deleteAttend(id);
          if (!res.ok) return setSnackBarInfo({ ...errorSnackbar, message: errorMessage });
          getAttends();
          setSnackBarInfo({
               ...initialSnackBar,
               message: "Asistencia eliminada",
               isSnackBarOpen: true,
          });
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalDeleteOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar esta asistencia?"
               />
               <PageHeader
                    title="Asistencias"
                    buttonTitle={"Agregar asistencias"}
                    url="/attendance/ingresar"
               />
               <Box height="100vh" sx={{ pr: 2 }}>
                    <DataGridWithModal
                         columns={attend.columns}
                         rows={attend.rows}
                         handleCell={openModal}
                         onChangeElements={() => {}}
                    />
               </Box>
               <EditAttendModal id={onEditId} closeModal={closeModal} isModalOpen={isModalOpen} />
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
