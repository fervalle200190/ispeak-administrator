import { Box } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { Datagrid, DataGridWithModal, EditStudyMaterialModal, PageHeader } from "../components";
import { DataContext } from "../context";

export const StudyMaterialPage = () => {
     const { studyMaterial } = useContext(DataContext);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [onEditId, setOnEditId] = useState("");

     const openModal = ({ id }) => {
          setIsModalOpen(true);
          setOnEditId(id);
     };

     const closeModal = () => {
          setIsModalOpen(false);
     };
     return (
          <>
               <PageHeader
                    title={"Material Estudio"}
                    buttonTitle="Agregar Material"
                    url="/study-material/ingresar"
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <DataGridWithModal
                         columns={studyMaterial.columns}
                         rows={studyMaterial.rows}
                         handleCell={openModal}
                    />
               </Box>
               <EditStudyMaterialModal
                    isModalOpen={isModalOpen}
                    handleModal={closeModal}
                    id={onEditId}
               />
          </>
     );
};
