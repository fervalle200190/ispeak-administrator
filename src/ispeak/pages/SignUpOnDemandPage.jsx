import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { DataGridWithModal, EditSignUpOnDemandModal, PageHeader } from "../components";
import { DataContext } from "../context";

export const SignUpOnDemandPage = () => {
     const { signUpOnDemand } = useContext(DataContext);
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
               <EditSignUpOnDemandModal isModalOpen={isModalOpen} handleModal={closeModal} id={onEditId} />
          </>
     );
};
