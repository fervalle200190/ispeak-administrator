import { Route, Navigate, Routes } from "react-router-dom";
import { DataProvider, ModalProvider } from "../context";
import { IspeakLayout } from "../layout/IspeakLayout";
import {
     AddAdminPage,
     AddAttendancePage,
     AddCoursesPage,
     AddProfessorPage,
     AddProgramsPage,
     AddSignUpOnDemandPage,
     AddSignUpPage,
     AddStudentPage,
     AddStudyMaterialPage,
     AddSupportMaterialPage,
     AdministratorPage,
     AttendsPage,
     ProgramsPage,
     CoursesPage,
     PaymentsPage,
     DashboardPage,
     ProfessorPage,
     SignUpCoursesPage,
     SignUpOnDemandPage,
     StudentsPage,
     StudyMaterialPage,
     SupportMaterialPage,
} from "../pages";

export const IspeakRoutes = () => {
     return (
          <DataProvider>
               <ModalProvider>
                    <IspeakLayout>
                         <Routes>
                              <Route path="/" element={<DashboardPage />} />
                              <Route path="students" element={<StudentsPage />} />
                              <Route path="students/ingresar" element={<AddStudentPage />} />
                              <Route path="professor" element={<ProfessorPage />} />
                              <Route path="professor/ingresar" element={<AddProfessorPage />} />
                              <Route path="programs" element={<ProgramsPage />} />
                              <Route path='programs/ingresar' element={<AddProgramsPage />} />
                              <Route path="courses" element={<CoursesPage />} />
                              <Route path='courses/ingresar' element={<AddCoursesPage />} />
                              <Route path='payments' element={<PaymentsPage/>} />
                              <Route path='study-material' element={<StudyMaterialPage />} />
                              <Route path='study-material/ingresar' element={<AddStudyMaterialPage />} />
                              <Route path='support-material' element={<SupportMaterialPage />} />
                              <Route path='support-material/ingresar' element={<AddSupportMaterialPage />} />
                              <Route path="sign-courses" element={<SignUpCoursesPage />} />
                              <Route path="sign-courses/ingresar" element={<AddSignUpPage />} />
                              <Route path='sign-ondemand' element={<SignUpOnDemandPage />} />
                              <Route path='sign-ondemand/ingresar' element={<AddSignUpOnDemandPage />} />
                              <Route path='attendance' element={<AttendsPage />} />
                              <Route path='attendance/ingresar' element={<AddAttendancePage />} />
                              <Route path='administrators' element={<AdministratorPage />} />
                              <Route path='administrators/ingresar' element={<AddAdminPage />} />
                              <Route path="/*" element={<Navigate to="/" />} />
                         </Routes>
                    </IspeakLayout>
               </ModalProvider>
          </DataProvider>
     );
};
