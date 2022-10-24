import { returnCountry } from "../ispeak/utils";
import { deleteUser, getUserById, updateUser } from "../utils";
import { useUpdateUser } from "./useUpdateUser";

export const useChangeDataAdmin = ( admins, setAdmins ) => {
     const updateAdmin = async (data) => {
          const user = await getUserById(data.id);
          const { newUser } = useUpdateUser(user, data, 'Administrador');
          const userUpdated = await updateUser(JSON.stringify(newUser));
          const newUpdate = admins.rows.map((admin) => {
               if (admin.id === data.id) {
                    return {
                         ...admin,
                         [data.field]: data.value,
                    };
               }
               return admin;
          });
          setAdmins({
               ...admins,
               rows: newUpdate,
          });
     };
     const deleteAdmin = async (id) => {
          const res = await deleteUser(id);
          if (res !== "Usuario Eliminado") return;
          const newData = admins.rows.filter(
               (admin) => admin.id !== id
          );
          setAdmins({
               ...admins,
               rows: newData,
          });
     };
     const addAdmin = (data) => {
          const user = {
               id: data.id,
               nameAndLastName: data.nombre,
               email: data.email,
               city: data.ciudad || "no info",
               country: returnCountry(data.paisId),
               amountCourse: "no existe",
               blocked: data.bloqueado ? "bloqueado" : "no bloqueado",
          };
          const newData = {
               ...admins,
               rows: [...admins.rows, user],
          };
          setAdmins(newData);
     };

     return {
          updateAdmin,
          deleteAdmin,
          addAdmin,
     };
};
