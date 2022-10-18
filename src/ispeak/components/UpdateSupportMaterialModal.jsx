import { Box, Button, Typography } from "@mui/material";
import { useCourseSelect } from "../../hooks";
import { updateSupportMaterial } from "../../utils";
import { ModalEditLayout } from "../layout/ModalEditLayout";
import { SelectOptions } from "./SelectOptions";

export const UpdateSupportMaterial = ({
     isModalEditOpen,
     handleModal,
     params,
     handleSnackbar,
     supportMaterialsChangers,
}) => {
     const { coursesList, courseSelected, handleCourse } = useCourseSelect();

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (courseSelected === "") {
               return;
          }
          const dataToSend = {
               cursoId: courseSelected,
               id: params.id,
               tipoReforzamiento: params.kindSupport,
          };
          const res = await updateSupportMaterial(dataToSend);
          const newRes = {
               id: res.data.id,
               field: "course",
               value: coursesList.filter(
                    (course) => res.data.cursoId === course.value
               )[0].label,
          };
          if (res.statusText === "OK") {
               handleSnackbar();
               supportMaterialsChangers.updateData(newRes);
               handleModal();
          }
     };
     return (
          <ModalEditLayout
               width={"50%"}
               handleModal={handleModal}
               isModalOpen={isModalEditOpen}
          >
               <Box component="form" sx={{ p: 5 }} onSubmit={handleSubmit}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                         Selecciona un curso
                    </Typography>
                    <SelectOptions
                         options={coursesList}
                         value={courseSelected}
                         handleSelect={handleCourse}
                         label="Cursos"
                    />
                    <Button variant="outlined" type="submit" sx={{ mt: 2 }}>
                         Guardar
                    </Button>
               </Box>
          </ModalEditLayout>
     );
};
