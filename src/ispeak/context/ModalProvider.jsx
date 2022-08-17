import { useState } from "react";
import { ModalContext } from "./ModalContext";

export const ModalProvider = ({ children }) => {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [id, setId] = useState("");
     const handleModal = () => {
          setIsModalOpen(!isModalOpen);
     };
     const handleId = (idStudent) => {
          setId(idStudent);
     };

     const closeModal = ()=> {
          setIsModalOpen(false)
     }
     return (
          <ModalContext.Provider
               value={{isModalOpen, handleModal, id, handleId, closeModal }}
          >
               {children}
          </ModalContext.Provider>
     );
};
