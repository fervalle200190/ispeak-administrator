import { Box } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { deleteSupportMaterial } from "../../utils";
import {
     PageHeader,
     DataGridWithModal,
     UpdateSupportMaterial,
     SnackBarComponent,
     ModalAction,
} from "../components";
import { DataContext, ModalContext } from "../context";

export const SupportMaterialPage = () => {
     const { supportMaterial, supportMaterialsChangers } = useContext(DataContext);
     const { isModalOpen: isModalDeleteOpen, handleModal: handleDeleteModal, id } = useContext(ModalContext);
     const [isModalEditOpen, setIsModalEditOpen] = useState(false);
     const [params, setParams] = useState({});
     const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

     const handleDelete = async () => {
          const { ok } = await deleteSupportMaterial(id)
          if(!ok) return
          supportMaterialsChangers.deleteData(id);
     };

     const handleModal = () => {
          setIsModalEditOpen(!isModalEditOpen);
     };

     const handleSnackbar = () => {
          setIsSnackBarOpen(!isSnackBarOpen);
     };

     const handleCell = (params) => {
          setParams(params.row);
          handleModal();
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalDeleteOpen}
                    handleModal={handleDeleteModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar este material de refuerzo?"
               />
               <PageHeader
                    title="Material de refuerzo"
                    buttonTitle={"Agregar Material de refuerzo"}
                    url="/support-material/ingresar"
               />
               <Box height={"930px"} sx={{ pr: 2 }}>
                    <DataGridWithModal
                         columns={supportMaterial.columns}
                         rows={supportMaterial.rows}
                         handleCell={handleCell}
                    />
               </Box>
               <UpdateSupportMaterial
                    isModalEditOpen={isModalEditOpen}
                    handleModal={handleModal}
                    params={params}
                    handleSnackbar={handleSnackbar}
                    supportMaterialsChangers={supportMaterialsChangers}
               />
               <SnackBarComponent
                    isSnackBarOpen={isSnackBarOpen}
                    handleSnackbar={handleSnackbar}
                    message="Material de refuerzo editado correctamente"
               />
          </>
     );
};
