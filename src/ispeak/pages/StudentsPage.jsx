import { Box } from "@mui/material";
import {
     Datagrid,
     DataGridWithModal,
     EditStudentModal,
     ModalAction,
     ModalEdit,
     PageHeader,
     SnackBarComponent,
} from "../components";
import { useContext, useState } from "react";
import { DataContext, ModalContext } from "../context";
import { useEditData } from "../../hooks";

const initialModal = { isModalOpen: false, modalData: {} };

export const StudentsPage = () => {
     const { students, updateStudents, deleteStudent, usersRaw } = useContext(DataContext);
     const { isModalOpen, handleModal, id } = useContext(ModalContext);
     const [onModalInfo, setOnModalInfo] = useState(initialModal);

     const openModal = ({ id }) => {
          const coursesData = usersRaw.find(({ user }) => user.id === id);
          setOnModalInfo({
               isModalOpen: true,
               modalData: coursesData,
          });
     };
     const closeModal = () => {
          setOnModalInfo(initialModal);
     };
     const handleDelete = () => {
          deleteStudent(id);
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar este alumno?"
               />
               <PageHeader
                    title={"Alumnos"}
                    buttonTitle={"Agregar Alumno"}
                    url={"/students/ingresar"}
               />
               <Box height={"650px"} sx={{ pr: 2 }}>
                    <DataGridWithModal
                         rows={students.rows}
                         columns={students.columns}
                         handleCell={openModal}
                         onChangeElements={() => {}}
                    />
               </Box>
               <EditStudentModal {...onModalInfo} closeModal={closeModal} />
          </>
     );
};
