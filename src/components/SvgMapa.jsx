import { useEffect, useState } from "react";
import { useMapa } from "../context/useMapa";
import data from "../assets/js/data.js";
import regionMauleUrl from "../assets/img/region_maule.svg";

const SvgMapa = () => {
  const [pathsData, setPathsData] = useState([]);
  const { setInfoSeleccionada, infoSeleccionada, especialidadSeleccionada } = useMapa();

  useEffect(() => {
    fetch(regionMauleUrl)
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, "image/svg+xml");
        const pathElements = svgDoc.querySelectorAll("path");
        const pathsArray = Array.from(pathElements).map((p) => ({
          id: p.getAttribute("id"),
          d: p.getAttribute("d"),
        }));
        setPathsData(pathsArray);
      });
  }, []);

  const handleClick = (id) => {
    const punto = data.find((p) => p.id === id);
    const info = punto ? punto.info : ["Sin información disponible"];
    setInfoSeleccionada({ id, info });
  };

  return (
    <svg
      viewBox="0 0 358 500"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {pathsData.map(({ id, d }) => {
        // ¿Esta comuna tiene la especialidad filtrada?
        let hasEspecialidad = false;
        if (especialidadSeleccionada) {
          const comunaData = data.find((p) => p.id === id);
          if (comunaData) {
            hasEspecialidad = comunaData.info.some((line) =>
              line.startsWith(especialidadSeleccionada + ":")
            );
          }
        }

        // Color de la comuna
        let fillColor = "#cccccc";
        if (especialidadSeleccionada && hasEspecialidad) {
          fillColor = "#FF9800"; // Naranja resaltado
        } else if (infoSeleccionada?.id === id) {
          fillColor = "#2196F3"; // Azul selección
        }

        // Etiqueta
        const match = d.match(/M\s*([\d.-]+),\s*([\d.-]+)/);
        let labelX = 0;
        let labelY = 0;
        if (match) {
          labelX = parseFloat(match[1]);
          labelY = parseFloat(match[2]);
        }

        return (
          <g key={id}>
            <path
              d={d}
              fill={fillColor}
              stroke="#333"
              strokeWidth="1"
              style={{ cursor: "pointer", transition: "fill 0.2s ease" }}
              onMouseEnter={(e) => (e.target.style.fill = "#FF5722")}
              onMouseLeave={(e) => {
                e.target.style.fill = fillColor;
              }}
              onClick={() => handleClick(id)}
            />
            <text
              x={labelX + 12}
              y={labelY + 10}
              fontSize="8"
              textAnchor="middle"
              fill="#202429"
              pointerEvents="none"
              style={{
                paintOrder: "stroke",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            >
              {id}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default SvgMapa;
