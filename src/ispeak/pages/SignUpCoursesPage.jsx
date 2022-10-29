import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { deleteSignUp } from "../../utils";
import { PageHeader, EditSignUpModal, DataGridWithModal, ModalAction } from "../components";
import { DataContext, ModalContext } from "../context";

export const SignUpCoursesPage = () => {
     const { signUp, signUpsChangers } = useContext(DataContext);
     const { isModalOpen: isModalDeleteOpen, handleModal, id } = useContext(ModalContext);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [onEditId, setOnEditId] = useState("");

     const handleDelete = async () => {
          const { ok } = await deleteSignUp(id);
          if (!ok) return;
          signUpsChangers.deleteData(id);
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
                    title={"Inscripciones"}
                    buttonTitle="Agregar inscripciones"
                    url="/sign-courses/ingresar"
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <DataGridWithModal
                         columns={signUp.columns}
                         rows={signUp.rows}
                         handleCell={openModal}
                    />
               </Box>
               <EditSignUpModal isModalOpen={isModalOpen} handleModal={closeModal} id={onEditId} />
          </>
     );
};
