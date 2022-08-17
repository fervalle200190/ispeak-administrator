import { useState } from "react";

const initialGenre = "";
const initialCountry = "";
const initialBlocked = false;

export const useAddProfessor = () => {
     const [genre, setGenre] = useState(initialGenre);
     const [country, setCountry] = useState(initialCountry);
     const [blocked, setBlocked] = useState(initialBlocked);

     const handleGenre = (e) => {
          setGenre(e.target.value);
     };
     const handleCountry = (e) => {
          setCountry(e.target.value);
     };
     const handleCheck = () => {
          setBlocked(!blocked);
     };

     const resetUse = () => {
          setGenre(initialGenre);
          setCountry(initialCountry);
          setBlocked(initialBlocked);
     };

     return {
          genre,
          handleGenre,
          country,
          handleCountry,
          blocked,
          handleCheck,
          resetUse,
     };
};
