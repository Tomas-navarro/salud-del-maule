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
      {/* Render primero los path */}
      {pathsData.map(({ id, d }) => {
        let hasEspecialidad = false;
        if (especialidadSeleccionada) {
          const comunaData = data.find((p) => p.id === id);
          if (comunaData) {
            hasEspecialidad = comunaData.info.some((line) =>
              line.startsWith(especialidadSeleccionada + ":")
            );
          }
        }

        let fillColor = "#cccccc";
        if (especialidadSeleccionada && hasEspecialidad) {
          fillColor = "#FF9800";
        } else if (infoSeleccionada?.id === id) {
          fillColor = "#2196F3";
        }

        return (
          <path
            key={id}
            d={d}
            fill={fillColor}
            stroke="#333"
            strokeWidth="1"
            style={{ cursor: "pointer", transition: "fill 0.2s ease" }}
            onMouseEnter={(e) => (e.target.style.fill = "#FF5722")}
            onMouseLeave={(e) => (e.target.style.fill = fillColor)}
            onClick={() => handleClick(id)}
          />
        );
      })}

      {/* Luego, renderiza los pines */}
      <g>
  {pathsData.map(({ id, d }) => {
    const match = d.match(/M\s*([\d.-]+),\s*([\d.-]+)/);
    let labelX = 0;
    let labelY = 0;
    if (match) {
      labelX = parseFloat(match[1]);
      labelY = parseFloat(match[2]);
    }

    return (
      <foreignObject
        key={`pin-${id}`}
        x={labelX}
        y={labelY}
        width="30"
        height="15"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            background: "white",
            borderRadius: "10px",
            padding: "1px 4px",
            fontSize: "5px",
            color: "#2196f3",
            boxShadow: "0 0.5px 1px rgba(0,0,0,0.2)",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "4px" }}>📍</span>
          <span>{id}</span>
        </div>
      </foreignObject>
    );
  })}
</g>

    </svg>
  );
};

export default SvgMapa;
