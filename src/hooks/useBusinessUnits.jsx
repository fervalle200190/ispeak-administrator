import { useEffect, useState } from "react";
import { getAllBusinessUnits } from "../utils";

export const useBusinessUnits = () => {
     const [business, setBusiness] = useState([]);
     const [businessSelected, setBusinessSelected] = useState("");
     const getBusinessUnits = async () => {
          const businessUnits = await getAllBusinessUnits();
          const newData = businessUnits.map((businessUnit) => ({
               label: businessUnit.name,
               value: businessUnit.id,
          }));
          setBusiness(newData);
     };
     const handleBusiness = (e) => {
          setBusinessSelected(e.target.value);
     };
     useEffect(() => {
          getBusinessUnits();
     }, []);

     return {
        business,
        businessSelected,
        handleBusiness
     }
};
