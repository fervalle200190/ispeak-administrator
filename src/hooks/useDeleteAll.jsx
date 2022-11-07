import { useState } from "react";

export const useDeleteAll = (deleter, deleteEnd) => {
     const [elementsToDelete, setElementsToDelete] = useState([]);

     const onChangeElements = (params) => {
          setElementsToDelete(params);
     };

     const onDeleteAll = async () => {
        //   for (let i = 0; i < elementsToDelete.length; i++) {
        //        const res = await deleteEnd(elementsToDelete[i]);
        //        if (!res.ok) return;
        //   }
          deleter(elementsToDelete);
     };

     return {
          elementsToDelete,
          onChangeElements,
          onDeleteAll,
     };
};
