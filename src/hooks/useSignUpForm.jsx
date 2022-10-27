import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "../ispeak/context";
import { getRoomsByCourse } from "../utils";

export const useSignUpForm = (courseSelected = "", initialSelectors = {}) => {
     const { students, professors, getSignUps, programs } = useContext(DataContext);
     const [roomList, setRoomList] = useState([]);
     const [studentSelected, setStudentSelected] = useState("");
     const [programSelected, setProgramSelected] = useState('')
     const [valueSelected, setValueSelected] = useState(initialSelectors);

     const getRoomList = async (id) => {
          const res = await getRoomsByCourse(id);
          setRoomList(res.map((room) => ({ label: room.nombre, value: room.id })));
     };

     const studentsParsed = useMemo(() => {
          const newData = students.rows.map((student) => {
               return {
                    label: student.nameAndLastName,
                    value: student.id,
               };
          });
          return newData;
     }, [students]);

     const programsParsed = useMemo(() => {
          return programs.rows.map(({ name, id }) => ({ label: name, value: id }));
     }, [programs]);

     const professorsParsed = useMemo(() => {
          const newData = professors.rows.map((professor) => {
               return {
                    label: professor.nameAndLastName,
                    value: professor.id,
               };
          });
          return newData;
     }, [professors]);

     const onValueSelected = (e, selector) => {
          setValueSelected({
               ...valueSelected,
               [selector]: e.target.value,
          });
     };

     const onStudentSelectedChange = (e) => {
          setStudentSelected(e.target.value);
     };

     const onProgramSelectedChange = (e) => {
          setProgramSelected(e.target.value);
     };

     const onResetAllSelects = () => {
          setValueSelected(initialSelectors);
     };

     const resetSelects = ()=> {
          setProgramSelected('');
          setStudentSelected('');
     }

     useEffect(() => {
          if (courseSelected === "") return;
          getRoomList(courseSelected);
     }, [courseSelected]);

     return {
          studentsParsed,
          professorsParsed,
          roomList,
          onStudentSelectedChange,
          onProgramSelectedChange,
          studentSelected,
          programSelected,
          onValueSelected,
          ...valueSelected,
          onResetAllSelects,
          getSignUps,
          setValueSelected,
          programsParsed,
          resetSelects
     };
};
