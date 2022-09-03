import { useEffect, useState } from "react";
import { useBusinessUnits } from "../../hooks";
import {
     AskComponent,
     PageHeader,
     TabsContainer,
     TabsContainerOnDemand,
} from "../components";
import { CourseProvider } from "../context";

export const AddCoursesPage = () => {
     const { business, handleBusiness, businessSelected } = useBusinessUnits();
     const [formType, setFormType] = useState("");

     const handleContinue = () => {
          setFormType(businessSelected);
     };
     return (
          <CourseProvider>
               <PageHeader title="Gestión de Cursos" />
               {formType === "" ? (
                    <AskComponent
                         business={business}
                         handleBusiness={handleBusiness}
                         businessSelected={businessSelected}
                         handleContinue={handleContinue}
                    />
               ) : formType !== 4 ? (
                    <TabsContainer businessUnit={formType} />
               ) : (
                    <TabsContainerOnDemand />
               )}
          </CourseProvider>
     );
};
