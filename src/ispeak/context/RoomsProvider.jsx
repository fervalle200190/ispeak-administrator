import { useEffect, useState } from "react";
import { useChangeData, useRooms } from "../../hooks";
import { getAllRooms } from "../../utils";
import { processRoom } from "../helper";
import { RoomsContext } from "./RoomsContext";

export const RoomsProvider = ({ children }) => {
     const [rooms, setRooms] = useState([]);
     const [roomsList, setRoomsList] = useState({ columns: [], rows: [] });
     const getRooms = async () => {
          const room = await getAllRooms();
          const { columns, rows } = useRooms(room);
          setRooms(room);
          setRoomsList({ columns, rows });
     };
     const roomsChangers = useChangeData(roomsList, setRoomsList, processRoom);
     useEffect(() => {
          getRooms();
     }, []);

     return (
          <RoomsContext.Provider value={{ rooms, roomsList, roomsChangers }}>
               {children}
          </RoomsContext.Provider>
     );
};
