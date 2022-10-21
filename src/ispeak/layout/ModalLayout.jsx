import { Box, Modal } from "@mui/material";
import { useContext } from "react";
import { ModalTabsContext } from "../context";

export const ModalLayout = ({ children, width }) => {
     const { isModalOpen, handleModal } = useContext(ModalTabsContext);
     return (
          <Modal open={isModalOpen} onClose={handleModal}>
               <Box
                    sx={{
                         width: `${width}`,
                         borderRadius: '4px',
                         position: "absolute",
                         top: "50%",
                         left: "50%",
                         transform: "translate(-50%,-50%)",
                         backgroundColor: '#fff',
                    }}
               >
                    {children}
               </Box>
          </Modal>
     );
};

export default ModalLayout
