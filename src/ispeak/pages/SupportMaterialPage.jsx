import { Box } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import {
     PageHeader,
     DataGridWithModal,
     UpdateSupportMaterial,
     SnackBarComponent,
} from "../components";
import { DataContext } from "../context";

export const SupportMaterialPage = () => {
     const { supportMaterial, supportMaterialsChangers } = useContext(DataContext);
     const [isModalEditOpen, setIsModalEditOpen] = useState(false);
     const [params, setParams] = useState({});
     const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

     const handleModal = () => {
          setIsModalEditOpen(!isModalEditOpen);
     };

     const handleSnackbar = () => {
          setIsSnackBarOpen(!isSnackBarOpen);
     };

     const handleCell = (params) => {
          setParams(params.row);
          handleModal();
     };
     return (
          <>
               <PageHeader
                    title="Material de refuerzo"
                    buttonTitle={"Agregar Material de refuerzo"}
                    url="/support-material/ingresar"
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <DataGridWithModal
                         columns={supportMaterial.columns}
                         rows={supportMaterial.rows}
                         handleCell={handleCell}
                    />
               </Box>
               <UpdateSupportMaterial
                    isModalEditOpen={isModalEditOpen}
                    handleModal={handleModal}
                    params={params}
                    handleSnackbar={handleSnackbar}
                    supportMaterialsChangers={supportMaterialsChangers}
               />
               <SnackBarComponent
                    isSnackBarOpen={isSnackBarOpen}
                    handleSnackbar={handleSnackbar}
                    message="Material de refuerzo editado correctamente"
               />
          </>
     );
};
