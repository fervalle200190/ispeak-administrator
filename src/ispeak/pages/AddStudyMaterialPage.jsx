import { FormMaterialOne, FormMaterialTwo, PageHeader } from "../components";

export const AddStudyMaterialPage = () => {
     return (
          <>
               <PageHeader title={"Material de estudio"} />
               <FormMaterialOne />
               <FormMaterialTwo />
          </>
     );
};
