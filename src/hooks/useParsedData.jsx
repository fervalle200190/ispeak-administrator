import { useEffect, useState } from "react"

export const useParsedData = (dataToParsed) => {
  const [dataParsed, setDataParsed] = useState({})
  useEffect(() => {
    let newDataParsed = {}
    for (const data in dataToParsed) {
        newDataParsed[data] = dataToParsed[data].map((item)=> ({label: item.nombre || item.name, value: item.id}))
    }
    setDataParsed()
  }, [dataToParsed])
  
}
