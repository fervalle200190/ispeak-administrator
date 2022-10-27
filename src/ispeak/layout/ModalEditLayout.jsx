import { Box, Modal } from "@mui/material";

export const ModalEditLayout = ({ width, isModalOpen, handleModal, children }) => {
     return (
          <Modal open={isModalOpen} onClose={handleModal}>
               <Box
                    sx={{
                         width: `${width}`,
                         borderRadius: "4px",
                         position: "absolute",
                         top: "50%",
                         left: "50%",
                         transform: "translate(-50%,-50%)",
                         backgroundColor: "#fff",
                         overflowY: 'auto',
                         maxHeight: '500px',
                    }}
               >
                    {children}
               </Box>
          </Modal>
     );
};
