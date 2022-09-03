export const newModules = (courseSelected, modules, coursesList) => {
     const newObj = [];
     for (let i = 0; i < courseSelected.length; i++) {
          newObj[i] = {
               modulesCourse: modules[i],
               courseName: coursesList
                    .filter((course) => courseSelected[i] === course.value)
                    .map((course) => course.label),
          };
     }
     return newObj;
};
