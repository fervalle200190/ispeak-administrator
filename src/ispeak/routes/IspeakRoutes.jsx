import { Route, Navigate, Routes } from "react-router-dom";
import { DataProvider, ModalProvider } from "../context";
import { IspeakLayout } from "../layout/IspeakLayout";
import {
     AddProfessorPage,
     AddStudentPage,
     AdministratorPage,
     AttendsPage,
     CoursesPage,
     DashboardPage,
     ProfessorPage,
     SignUpCoursesPage,
     SignUpOnDemandPage,
     StudentsPage,
     StudyMaterialPage,
     SupportMaterialPage,
} from "../pages";
import { ProgramsPage } from "../pages/ProgramsPage";

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
                              <Route path="courses" element={<CoursesPage />} />
                              <Route path='study-material' element={<StudyMaterialPage />} />
                              <Route path='support-material' element={<SupportMaterialPage />} />
                              <Route path="sign-courses" element={<SignUpCoursesPage />} />
                              <Route path='sign-ondemand' element={<SignUpOnDemandPage />} />
                              <Route path='attendance' element={<AttendsPage />} />
                              <Route path='administrators' element={<AdministratorPage />} />
                              <Route path="/*" element={<Navigate to="/" />} />
                         </Routes>
                    </IspeakLayout>
               </ModalProvider>
          </DataProvider>
     );
};
