import {  useState } from "react";
import { MapaContext } from "./MapaContext";


export const MapaProvider = ({ children }) => {
  const [infoSeleccionada, setInfoSeleccionada] = useState(null);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);

  return (
    <MapaContext.Provider
      value={{
        infoSeleccionada,
        setInfoSeleccionada,
        especialidadSeleccionada,
        setEspecialidadSeleccionada,
      }}
    >
      {children}
    </MapaContext.Provider>
  );
};
