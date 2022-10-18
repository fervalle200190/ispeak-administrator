import { ModalLayout } from "../layout/modalLayout";
import { SupportFormTwo } from "./SupportFormTwo";

export const AddFileModal = ({ handleSnackbar }) => {
     return (
          <ModalLayout width={"50%"}>
               <SupportFormTwo handleSnackbar={handleSnackbar} />
          </ModalLayout>
     );
};
