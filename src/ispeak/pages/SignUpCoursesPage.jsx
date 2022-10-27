import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { PageHeader, EditSignUpModal, DataGridWithModal } from "../components";
import { DataContext } from "../context";

export const SignUpCoursesPage = () => {
     const { signUp } = useContext(DataContext);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [onEditId, setOnEditId] = useState("");

     const closeModal = () => {
          setIsModalOpen(false);
     };

     const openModal = ({ id }) => {
          setIsModalOpen(true);
          setOnEditId(id);
     };
     return (
          <>
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
