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
} from "../components";
import { DataContext, ModalContext } from "../context";

export const StudyMaterialPage = () => {
     const { studyMaterial, studyMaterialsChangers } = useContext(DataContext);
     const { elementsToDelete, onChangeElements, onDeleteAll } = useDeleteAll(studyMaterialsChangers.onDeleteSeveral, deleteStudyMaterial)
     const { isModalOpen: isModalDeleteOpen, handleModal, id } = useContext(ModalContext);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [onEditId, setOnEditId] = useState("");

     const handleDelete = async () => {
          const { ok } = await deleteStudyMaterial(id);
          if (!ok) return;
          studyMaterialsChangers.deleteData(id);
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
          </>
     );
};
