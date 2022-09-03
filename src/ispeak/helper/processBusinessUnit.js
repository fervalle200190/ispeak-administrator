export const processBusinessUnit = (courses, business) => {
     return courses.rows
          ? courses.rows
                 .filter((course) => {
                      if (business === 4) {
                           return course.businessUnit === business;
                      } else {
                           return course.businessUnit !== 4;
                      }
                 })
                 .map((course) => ({
                      label: course.name,
                      value: course.id,
                 }))
          : [];
};
