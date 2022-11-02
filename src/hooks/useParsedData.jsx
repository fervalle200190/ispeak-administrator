import { useEffect, useMemo, useState } from "react";

export const useParsedData = (dataToParsed) => {
     const dataParsed = useMemo(() => {
          let newDataParsed = {};
          for (const data in dataToParsed) {
               newDataParsed[data + 'Parsed'] = dataToParsed[data].rows.map((item) => ({
                    label: item.name || item.nombre || item.nameAndLastName,
                    value: item.id,
               }));
          }
          return JSON.stringify(newDataParsed) === '{}' ? []: newDataParsed;
     }, [dataToParsed]);
     return {
          ...dataParsed,
     };
};
