import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { Datagrid, DataGridWithModal, EditAttendModal, PageHeader } from "../components";
import { DataContext } from "../context";

export const AttendsPage = () => {
     const { attend } = useContext(DataContext);
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
                    title="Asistencias"
                    buttonTitle={"Agregar asistencias"}
                    url="/attendance/ingresar"
               />
               <Box height="100vh" sx={{ pr: 2 }}>
                    <DataGridWithModal
                         columns={attend.columns}
                         rows={attend.rows}
                         handleCell={openModal}
                         onChangeElements={()=> {}}
                    />
               </Box>
               <EditAttendModal id={onEditId} closeModal={closeModal} isModalOpen={isModalOpen} />
          </>
     );
};
