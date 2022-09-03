import { useState } from "react";

export const useEditData = (
     updateHandler,
     user = false,
     processHandler,
     getData,
     putData
) => {
     const [param, setParam] = useState("");
     const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
     const [isSnackBarEditOpen, setIsSnackBarEditOpen] = useState(false);

     const handleSnackBar = () => {
          setIsSnackBarEditOpen(!setIsSnackBarEditOpen);
     };

     const handleCloseModal = () => {
          setIsModalUpdateOpen(false);
          updateHandler(param.stop);
          setParam("");
     };

     const handleOpenModal = () => {
          setIsModalUpdateOpen(true);
     };

     const handleAnswer = async () => {
          if (user) {
               console.log('hola')
               updateHandler(param.commit);
               setIsModalUpdateOpen(false);
               setIsSnackBarEditOpen(true);
               setParam("");
          } else {
               // calls
               const dataRaw = await getData(param.commit.id);
               const processedData = processHandler(dataRaw, param.commit);
               const res = await putData(processedData);
               updateHandler(param.commit);
               setIsModalUpdateOpen(false);
               setIsSnackBarEditOpen(true);
               setParam("");
          }
     };

     const stopHandler = (params) => {
          setParam({ ...param, stop: params });
     };

     const commitHandler = (params) => {
          handleOpenModal();
          setParam({
               ...param,
               commit: params,
          });
     };

     return {
          isModalUpdateOpen,
          isSnackBarEditOpen,
          handleSnackBar,
          handleCloseModal,
          handleAnswer,
          stopHandler,
          commitHandler,
     };
};
