import { PageHeader, TabSupportMaterial } from "../components";
import { ModalTabsProvider } from "../context";

export const AddSupportMaterialPage = () => {
     return (
          <ModalTabsProvider>
               <PageHeader title={"Agregar Material de Refuerzo"} />
               <TabSupportMaterial />
          </ModalTabsProvider>
     );
};
