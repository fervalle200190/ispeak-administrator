import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { DataGridWithModal, EditPaymentModal, PageHeader } from "../components";
import { DataContext } from "../context";

export const PaymentsPage = () => {
     const { payments } = useContext(DataContext);
     const [isModalOpen, setIsModalOpen] = useState(false);

     const openModal = () => {
          setIsModalOpen(true);
     };

     const closeModal = () => {
          setIsModalOpen(false);
     };
     return (
          <>
               <PageHeader title={"Pagos"} />
               <Box height={"650px"}>
                    <DataGridWithModal
                         columns={payments.columns}
                         rows={payments.rows}
                         handleCell={openModal}
                    />
               </Box>
               <EditPaymentModal isModalOpen={isModalOpen} closeModal={closeModal} />
          </>
     );
};
