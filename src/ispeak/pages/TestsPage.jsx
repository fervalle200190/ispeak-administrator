import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { DataGridWithModal, EditTestModal, PageHeader } from "../components";
import { DataContext } from "../context";

const initialModal = { isModalOpen: false, modalData: {} };

export const TestsPage = () => {
     const { test } = useContext(DataContext);
     const [onModalInfo, setOnModalInfo] = useState(initialModal);

     const openModal = ({ id }) => {
          setOnModalInfo({ isModalOpen: true, modalData: test.rows.find((te) => te.id === id) });
     };

     const closeModal = () => {
          setOnModalInfo(initialModal);
     };
     return (
          <>
               <PageHeader title={"Resultados de los tests"} />
               <Box height={"650px"}>
                    <DataGridWithModal
                         columns={test.columns}
                         rows={test.rows}
                         handleCell={openModal}
                         onChangeElements={() => {}}
                    />
               </Box>
               <EditTestModal onModalInfo={onModalInfo} closeModal={closeModal} />
          </>
     );
};
