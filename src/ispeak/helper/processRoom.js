import { useContext } from "react";

export const processRoom = (data) => {
     return {
          id: data.id,
          name: data.nombre,
          url: data.url,
          course: data.curso,
          password: data.password,
     };
};
