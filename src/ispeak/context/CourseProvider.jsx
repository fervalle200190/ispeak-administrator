import { useCourseData } from "../../hooks";
import { CourseContext } from "./CourseContext";

export const CourseProvider = ({ children }) => {
     const { modulesRaw, handleCourses, courseSelected, coursesToData, modulesChangers, addModule } =
          useCourseData();
     return (
          <CourseContext.Provider
               value={{
                    modulesRaw,
                    handleCourses,
                    courseSelected,
                    coursesToData,
                    modulesChangers,
                    addModule
               }}
          >
               {children}
          </CourseContext.Provider>
     );
};
