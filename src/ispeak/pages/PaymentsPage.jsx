import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { DataGridWithModal, EditPaymentModal, PageHeader } from "../components";
import { DataContext } from "../context";

export const PaymentsPage = () => {
     const { payments } = useContext(DataContext);
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
               <PageHeader title={"Pagos"} />
               <Box height={"930px"}>
                    <DataGridWithModal
                         columns={payments.columns}
                         rows={payments.rows}
                         handleCell={openModal}
                         onChangeElements={() => {}}
                    />
               </Box>
               <EditPaymentModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    onEditId={onEditId}
               />
          </>
     );
};
