import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useMapa } from "../context/useMapa";
import data from "../assets/js/data.js";
import regionMauleUrl from "../assets/img/region_maule.svg";

const SvgMapa = () => {
  const [pathsData, setPathsData] = useState([]);
  const [labelPositions, setLabelPositions] = useState([]);
  const svgRef = useRef(null);
  const { setInfoSeleccionada, infoSeleccionada, especialidadSeleccionada } = useMapa();

  // 1️⃣ Cargo y parseo los paths
  useEffect(() => {
    fetch(regionMauleUrl)
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, "image/svg+xml");
        const pathEls = svgDoc.querySelectorAll("path");
        setPathsData(
          Array.from(pathEls).map((p) => ({
            id: p.getAttribute("id"),
            d: p.getAttribute("d"),
            className: p.getAttribute("class"),
          }))
        );
      });
  }, []);

  useLayoutEffect(() => {
    // Mapear los datos con posiciones manuales
    const manualLabels = data.map(({ id, posX, posY }) => ({
      id,
      x: parseFloat(posX) - 10,
      y: parseFloat(posY) - 5,
    }));
    setLabelPositions(manualLabels);
  }, []);

  const handleClick = (id) => {
    const punto = data.find((p) => p.id === id);
    const info = punto ? punto.info : ["Sin información disponible"];
    setInfoSeleccionada({ id, info });
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 358 500"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto" ,display: "block" }}
    >
      {/* 🎨 PINTAR PRIMERO LOS PATH */}
      {pathsData.map(({ id, d, className }) => {
        // lógica de color según filtro o selección
        let fillColor = "#cccccc";
        if (especialidadSeleccionada) {
          const has = data
            .find((p) => p.id === id)
            ?.info.some((line) => line.startsWith(especialidadSeleccionada + ":"));
          if (has) fillColor = "#FF9800";
        }
        if (infoSeleccionada?.id === id) fillColor = "#2196F3";

        return (
          <path
            key={id}
            id={id}
            d={d}
            className={className}
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

      {/* 📍 LUEGO, SOBRE TODO, RENDERIZAR LOS PINS */}
      <g>
        {labelPositions.map(({ id, x, y }) => {
          const charWidth = 4; // Estimación del ancho por caracter
          const padding = 4; // Padding total horizontal
          const width = id.length * charWidth + padding;

          return (
            <foreignObject
              key={`pin-${id}`}
              x={x} // Centrado horizontal
              y={y}         // Ajuste vertical opcional
              width={width}
              height="16"
            >
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  background: "rgba(255, 255, 255, 0.89)",
                  borderRadius: "10px",
                  padding: "1px 4px",
                  fontSize: "6px",
                  fontWeight: "bold",
                  color: "#0876d0ff",
                  boxShadow: "0 0.5px 1px rgba(0,0,0,0.2)",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
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
