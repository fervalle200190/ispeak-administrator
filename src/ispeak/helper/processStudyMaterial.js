
export const processStudyMaterial = ({
     nombre,
     linkVideo,
     materialData,
     courseSelected,
     moduleSelected,
     claseSelected,
}) => {
     return {
          Id: materialData.id,
          Nombre: nombre,
          ModuloId: moduleSelected,
          ClaseNumero: claseSelected.slice(6,8),
          ArchivoPDF: materialData.archivoPDF,
          LinkVideo: linkVideo,
          LinkVideo2: materialData.linkVideo2,
          Activo: materialData.activo,
          PlanClases: materialData.planClases,
          MaterialAdicional1: materialData.materialAdicional1,
          MaterialAdicional2: materialData.materialAdicional2,
          ImagenPreview: materialData.imagenPreview,
     };
};
