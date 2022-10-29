import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { deleteSignUpsOnDemand } from "../../utils";
import { DataGridWithModal, EditSignUpOnDemandModal, ModalAction, PageHeader } from "../components";
import { DataContext, ModalContext } from "../context";

export const SignUpOnDemandPage = () => {
     const { signUpOnDemand, signUpsOnDemandChangers } = useContext(DataContext);
     const { isModalOpen: isModalDeleteOpen, handleModal, id } = useContext(ModalContext);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [onEditId, setOnEditId] = useState("");

     const handleDelete = async () => {
          const { ok } = await deleteSignUpsOnDemand(id)
          if(!ok) return
          signUpsOnDemandChangers.deleteData(id);
     };

     const closeModal = () => {
          setIsModalOpen(false);
     };

     const openModal = ({ id }) => {
          setIsModalOpen(true);
          setOnEditId(id);
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalDeleteOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar esta inscripcion?"
               />
               <PageHeader
                    title="Inscripciones Cursos OnDemand"
                    buttonTitle={"Agregar cursos"}
                    url="ingresar"
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <DataGridWithModal
                         columns={signUpOnDemand.columns}
                         rows={signUpOnDemand.rows}
                         handleCell={openModal}
                    />
               </Box>
               <EditSignUpOnDemandModal
                    isModalOpen={isModalOpen}
                    handleModal={closeModal}
                    id={onEditId}
               />
          </>
     );
};
