import { useEffect, useState } from "react";
import {
     useCourses,
     useProfessors,
     usePrograms,
     useStudents,
     useChangeDataStudent,
     useChangeDataProfessor,
     useStudyMaterials,
     useSupportMaterial,
     useCourseSignUps,
     useSignUpsOnDemand,
     useAttends,
     useAdmins,
     useChangeDataPrograms,
     useChangeData,
     useChangeDataAdmin,
     usePayments,
     useTests,
} from "../../hooks";
import {
     getAllAdmin,
     getAllAttends,
     getAllCourses,
     getAllPrograms,
     getAllSignUp,
     getAllSignUpOnDemand,
     getAllStudyMaterial,
     getAllSupportMaterial,
     getAllTests,
     getAllUsers,
     getPaymentList,
} from "../../utils";
import { changeCourses, changeStudyMaterials } from "../helper";
import { DataContext } from "./DataContext";

const initialState = { columns: [], rows: [] };

export const DataProvider = ({ children }) => {
     const [students, setStudents] = useState(initialState);
     const [professors, setProfessors] = useState(initialState);
     const [usersRaw, setUsersRaw] = useState([]);
     const [programs, setPrograms] = useState(initialState);
     const [courses, setCourses] = useState(initialState);
     const [payments, setPayments] = useState(initialState);
     const [coursesRaw, setCoursesRaw] = useState([]);
     const [studyMaterial, setStudyMaterial] = useState(initialState);
     const [supportMaterial, setSupportMaterial] = useState(initialState);
     const [signUp, setSignUp] = useState(initialState);
     const [signUpOnDemand, setSignUpOnDemand] = useState(initialState);
     const [attend, setAttend] = useState(initialState);
     const [admin, setAdmin] = useState(initialState);
     const [test, setTest] = useState(initialState);

     const getStudentsAndProfessors = async () => {
          const users = await getAllUsers();
          setUsersRaw(users);
          const { columns, rows } = useStudents(users);
          const professors = useProfessors(users);
          setStudents({ columns, rows });
          setProfessors({ columns: professors.columns, rows: professors.rows });
     };
     const getPrograms = async () => {
          const programsRes = await getAllPrograms();
          const { columns, rows } = usePrograms(programsRes);
          setPrograms({ columns, rows });
     };

     const getCourses = async () => {
          const courses = await getAllCourses();
          setCoursesRaw(courses);
          const { columns, rows } = useCourses(courses);
          setCourses({ columns, rows });
     };

     const getStudyMaterials = async () => {
          const studyMaterials = await getAllStudyMaterial();
          const { columns, rows } = useStudyMaterials(studyMaterials);
          setStudyMaterial({ columns, rows });
     };

     const getPayments = async () => {
          const { payments } = await getPaymentList();
          const { columns, rows } = usePayments(payments);
          setPayments({ columns, rows });
     };

     const getSupportMaterials = async () => {
          const supportMaterials = await getAllSupportMaterial();
          const { columns, rows } = useSupportMaterial(supportMaterials);
          setSupportMaterial({ columns, rows });
     };

     const getSignUps = async () => {
          const signUps = await getAllSignUp();
          const { columns, rows } = useCourseSignUps(signUps);
          setSignUp({ columns, rows });
     };

     const getSignUpsOnDemand = async () => {
          const signUpsOnDemand = await getAllSignUpOnDemand();
          const { columns, rows } = useSignUpsOnDemand(signUpsOnDemand);
          setSignUpOnDemand({ columns, rows });
     };

     const getAttends = async () => {
          const attends = await getAllAttends();
          const { columns, rows } = useAttends(attends);
          setAttend({ columns, rows });
     };

     const getAdmins = async () => {
          const admins = await getAllAdmin();
          const { columns, rows } = useAdmins(admins);
          setAdmin({ columns, rows });
     };

     const getTests = async () => {
          const { tests } = await getAllTests();
          const { columns, rows } = useTests(tests);
          setTest({ columns, rows });
     };

     const { updateStudents, deleteStudent, addStudent } = useChangeDataStudent({
          setStudents,
          students,
     });

     const { updateProfessors, deleteProfessor, addProfessor } = useChangeDataProfessor({
          setProfessors,
          professors,
     });

     const { addAdmin, deleteAdmin, updateAdmin } = useChangeDataAdmin(admin, setAdmin);

     const { updatePrograms, deletePrograms, addPrograms } = useChangeDataPrograms({
          setPrograms,
          programs,
     });

     const coursesChangers = useChangeData(courses, setCourses, changeCourses);

     const studyMaterialsChangers = useChangeData(
          studyMaterial,
          setStudyMaterial,
          changeStudyMaterials
     );

     const supportMaterialsChangers = useChangeData(supportMaterial, setSupportMaterial);

     const attendsChangers = useChangeData(attend, setAttend);

     const signUpsOnDemandChangers = useChangeData(signUpOnDemand, setSignUpOnDemand);

     const signUpsChangers = useChangeData(signUp, setSignUp);

     useEffect(() => {
          getStudentsAndProfessors();
          getPrograms();
          getCourses();
          getStudyMaterials();
          getSupportMaterials();
          getSignUps();
          getSignUpsOnDemand();
          getAttends();
          getAdmins();
          getPayments();
          getTests();
     }, []);

     return (
          <DataContext.Provider
               value={{
                    usersRaw,
                    students,
                    setStudents,
                    updateStudents,
                    deleteStudent,
                    addStudent,
                    professors,
                    test,
                    updateProfessors,
                    deleteProfessor,
                    addProfessor,
                    programs,
                    updatePrograms,
                    deletePrograms,
                    addPrograms,
                    courses,
                    payments,
                    updateAdmin,
                    addAdmin,
                    deleteAdmin,
                    coursesRaw,
                    studyMaterial,
                    supportMaterial,
                    signUp,
                    signUpOnDemand,
                    attend,
                    admin,
                    coursesChangers,
                    studyMaterialsChangers,
                    getStudyMaterials,
                    getSupportMaterials,
                    supportMaterialsChangers,
                    getSignUps,
                    signUpsOnDemandChangers,
                    signUpsChangers,
                    getAttends,
                    getTests,
                    getStudentsAndProfessors,
                    attendsChangers
               }}
          >
               {children}
          </DataContext.Provider>
     );
};
