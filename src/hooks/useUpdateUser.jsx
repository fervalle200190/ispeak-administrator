export const useUpdateUser = (user, data, rol) => {
     const newData = {
          nombre: data.field === "nameAndLastName" ? data.value : user.nombre,
          email: data.field === "email" ? data.value : user.email,
          ciudad: data.field === "city" ? data.value : user.ciudad,
          paisId: data.field === "country" ? data.value : user.paisId,
          ...(rol === "Profesor" && {
               bloqueado:
                    data.field === "blocked" ? data.value : user.bloqueado,
          }),
     };
     const newUser = {
          nombre: newData.nombre,
          email: newData.email,
          telefono: user.telefono,
          password: user.password,
          ciudad: newData.ciudad,
          ocupacion: user.ocupacion,
          direccionCompleta: user.direccionCompleta,
          sexo: user.sexo,
          pais: "",
          bloqueado: newData.bloqueado ? newData.bloqueado : user.bloqueado,
          rol: rol,
          paisId: user.paisId,
          id: user.id,
          imagen: "",
          fechaCreacion: new Date().toISOString(),
     };

     return {
          newUser,
     };
};
