// src/components/Filtros.jsx
import { useMapa } from "../context/useMapa";
import data from "../assets/js/data.js";
import { useMemo } from "react";
import Select from "react-select";

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "100%",       // que ocupe todo el padre
    minWidth: "250px",   // ancho mínimo
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
    flexShrink: 0,       // que no se reduzca
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%",
    minWidth: "250px",
  }),
};

const Filtros = () => {
  // 1) Asegúrate de los paréntesis aquí:
  const { especialidadSeleccionada, setEspecialidadSeleccionada } = useMapa();

  // 2) Calcula las especialidades únicas una sola vez
  const especialidades = useMemo(() => {
    const all = data.flatMap((p) =>
      p.info.map((line) => line.split(":")[0].trim())
    );
    return Array.from(new Set(all)).sort();
  }, []);

  // 3) Prepara el array de opciones para react‑select
  const opciones = [
    { value: "", label: "Todas las especialidades" },
    ...especialidades.map((esp) => ({ value: esp, label: esp })),
  ];

  // 4) Función que react‑select llama con el objeto seleccionado
  const handleSelectChange = (option) => {
    console.log("▶ seleccionaste:", option);              // depuración
    setEspecialidadSeleccionada(option?.value || null);
  };

  // 5) Encuentra la opción que coincida con el estado actual
  const valorActual = opciones.find(
    (opt) => opt.value === (especialidadSeleccionada || "")
  );

  return (
    <div className="filtro-inner">
      <label className="form-label">
        <strong>Filtrar especialidad:</strong>
      </label>
      <Select
        options={opciones}
        value={valorActual}
        onChange={handleSelectChange}
        isClearable
        placeholder="Buscar o seleccionar..."
        styles={customStyles}        // ← aquí
      />
      
      
      
      
      
      
    </div>
  );
};

export default Filtros;
