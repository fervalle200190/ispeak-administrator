import { Box } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { useDeleteAll } from "../../hooks";
import { deleteStudyMaterial } from "../../utils";
import {
     DataGridWithModal,
     EditStudyMaterialModal,
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

export const StudyMaterialPage = () => {
     const { studyMaterial, studyMaterialsChangers } = useContext(DataContext);
     const { elementsToDelete, onChangeElements, onDeleteAll } = useDeleteAll(studyMaterialsChangers.onDeleteSeveral, deleteStudyMaterial)
     const { isModalOpen: isModalDeleteOpen, handleModal, id } = useContext(ModalContext);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [onEditId, setOnEditId] = useState("");

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const handleDelete = async () => {
          const { ok, errorMessage } = await deleteStudyMaterial(id);
          if (!ok) return setSnackBarInfo({ ...errorSnackbar, message: errorMessage });
          studyMaterialsChangers.deleteData(id);
          setSnackBarInfo({
               ...initialSnackBar,
               isSnackBarOpen: true,
               message: "El material de estudio ha sido eliminado correctamente!!!",
          });
     };

     const openModal = ({ id }) => {
          setIsModalOpen(true);
          setOnEditId(id);
     };

     const closeModal = () => {
          setIsModalOpen(false);
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalDeleteOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar este material de estudio?"
               />
               <PageHeader
                    title={"Material Estudio"}
                    buttonTitle="Agregar Material"
                    url="/study-material/ingresar"
                    elementsToDelete={elementsToDelete}
                    onDeleteAll={onDeleteAll}
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <DataGridWithModal
                         columns={studyMaterial.columns}
                         rows={studyMaterial.rows}
                         handleCell={openModal}
                         onChangeElements={onChangeElements}
                         
                    />
               </Box>
               <EditStudyMaterialModal
                    isModalOpen={isModalOpen}
                    handleModal={closeModal}
                    id={onEditId}
                    studyMaterialsChangers={studyMaterialsChangers}
                    totalStudyMaterial={studyMaterial.rows.length}
               />
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
