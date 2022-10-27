export const processModulesId = (modules) => {
     let newModules = [];
     for (const module in modules) {
          if (modules[module]) {
               newModules.push(module);
          }
     }
     return newModules
};
