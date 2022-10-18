import { useContext, useMemo, useState } from "react";
import { DataContext } from "../ispeak/context";

export const useSupportFormTwo = () => {
     const { supportMaterial } = useContext(DataContext);
     const [supportMaterialSelected, setSupportMaterialSelected] = useState("");
     const [kindOfMaterialSelected, setKindOfMaterialSelected] = useState("");

     const handleMaterialSelected = (e) => {
          setSupportMaterialSelected(e.target.value);
     };

     const handleKindOfMaterialSelected = (e) => {
          setKindOfMaterialSelected(e.target.value);
     };

     const handleReset = () => {
          setSupportMaterialSelected("");
          setKindOfMaterialSelected("");
     };

     const supportList = useMemo(() => {
          return supportMaterial.rows
               ? supportMaterial.rows.map((support) => ({
                      label: support.course,
                      value: support.id,
                 }))
               : [];
     }, [supportMaterial]);

     return {
          supportList,
          supportMaterialSelected,
          kindOfMaterialSelected,
          handleMaterialSelected,
          handleKindOfMaterialSelected,
          handleReset
     };
};
