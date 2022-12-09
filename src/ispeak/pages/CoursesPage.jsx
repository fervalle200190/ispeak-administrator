import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { useEditData } from "../../hooks";
import { deleteCourse, getCourseById, updateCourse } from "../../utils";
import {
     Datagrid,
     DataGridWithModal,
     EditCourseModal,
     ModalAction,
     ModalEdit,
     PageHeader,
     SnackBarComponent,
} from "../components";
import { DataContext, ModalContext } from "../context";
import { processCourse } from "../helper";

export const CoursesPage = () => {
     const { courses, coursesChangers } = useContext(DataContext);
     const { isModalOpen, handleModal, id } = useContext(ModalContext);
     const [isModalEditOpen, setIsModalEditOpen] = useState(false);
     const [onEditId, setOnEditId] = useState('')

     const openModal = ({id}) => {
          setIsModalEditOpen(true);
          setOnEditId(id)
     };

     const closeModal = () => {
          setIsModalEditOpen(false);
     };

     const handleDelete = async () => {
          const { ok } = await deleteCourse(id);
          if (!ok) return;
          coursesChangers.deleteData(id);
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar este curso?"
               />
               <PageHeader title="Cursos" buttonTitle="Agregar Curso" url={"/courses/ingresar"} />
               <Box height={"930px"} sx={{ pr: 2 }}>
                    <DataGridWithModal
                         rows={courses.rows}
                         columns={courses.columns}
                         handleCell={openModal}
                         onChangeElements={()=> {}}
                    />
               </Box>
               <EditCourseModal isModalOpen={isModalEditOpen} closeModal={closeModal} id={onEditId}  />
               {/* <SnackBarComponent
                    isSnackBarOpen={isSnackBarEditOpen}
                    handleSnackbar={handleSnackBar}
                    message="Curso editado correctamente"
               /> */}
          </>
     );
};
