import { Typography } from "@mui/material";
import { ModuleCheck } from "./ModuleCheck";

export const CheckBoxGroup = ({ modules, modulesSelected, handleModule }) => {
     return (
          <>
               <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                    Selecciona los modulos que vas a asociar:
               </Typography>
               {modules.map((module, i) => (
                    <div key={i} style={{display: 'flex', flexDirection: 'column'}}>
                         <Typography fontWeight={600} sx={{ mt: 2 }}>
                              {module.courseName[0]}
                         </Typography>
                         <ModuleCheck
                              module={module}
                              modulesSelected={modulesSelected}
                              handleModule={handleModule}
                         />
                    </div>
               ))}
          </>
     );
};
