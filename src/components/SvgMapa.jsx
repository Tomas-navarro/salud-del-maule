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

  // 2️⃣ Después de renderizar los <path>, calculo sus centros
  useLayoutEffect(() => {
    if (!svgRef.current) return;
    const svgEl = svgRef.current;
    const labels = Array.from(svgEl.querySelectorAll("path[id]")).map((pathEl) => {
      const bbox = pathEl.getBBox();
      return {
        id: pathEl.id,
        x: bbox.x + bbox.width / 2,
        y: bbox.y + bbox.height / 2,
      };
    });
    setLabelPositions(labels);
  }, [pathsData]);

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
        {labelPositions.map(({ id, x, y }) => (
          <foreignObject key={`pin-${id}`} x={x} y={y} width="30" height="15">
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
        ))}
      </g>
    </svg>
  );
};

export default SvgMapa;
