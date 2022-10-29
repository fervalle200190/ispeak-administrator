import { Box } from "@mui/material";
import { useContext } from "react";
import { useEditData } from "../../hooks";
import { Datagrid, ModalAction, ModalEdit, PageHeader, SnackBarComponent } from "../components";
import { DataContext, ModalContext } from "../context";

export const AdministratorPage = () => {
     const { admin, updateAdmin, deleteAdmin } = useContext(DataContext);

     const { isModalOpen, handleModal, id } = useContext(ModalContext);

     const {
          isModalUpdateOpen,
          isSnackBarEditOpen,
          handleAnswer,
          handleSnackBar,
          commitHandler,
          stopHandler,
          handleCloseModal,
     } = useEditData(updateAdmin, true);

     const handleDelete = () => {
          deleteAdmin(id);
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar este Administrador?"
               />
               <ModalEdit
                    isModalOpen={isModalUpdateOpen}
                    handleClose={handleCloseModal}
                    handleAction={handleAnswer}
                    title="¿Estas seguro de editar este Administrador?"
               />
               <PageHeader
                    title="Administradores"
                    buttonTitle={"Agregar administrador"}
                    url="/administrators/ingresar"
               />
               <Box height="100vh" sx={{ pr: 2 }}>
                    <Datagrid
                         columns={admin.columns}
                         rows={admin.rows}
                         updateHandler={commitHandler}
                         stopHandler={stopHandler} 
                    />
               </Box> 
               <SnackBarComponent
                    isSnackBarOpen={isSnackBarEditOpen}
                    handleSnackbar={handleSnackBar}
                    message="Administrador editado correctamente"
               />
          </>
     );
};
