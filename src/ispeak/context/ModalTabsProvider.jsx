import { useState } from "react";
import { ModalTabsContext } from "./ModalTabsContext";

export const ModalTabsProvider = ({ children }) => {
     const [isModalOpen, setIsModalOpen] = useState(false);

     const handleModal = () => {
          setIsModalOpen(!isModalOpen);
     };
     return (
          <ModalTabsContext.Provider value={{ isModalOpen, handleModal }}>
               {children}
          </ModalTabsContext.Provider>
     );
};
