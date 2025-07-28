// src/components/Filtros.jsx
import { useMapa } from "../context/useMapa";
import data from "../assets/js/data.js";
import { useMemo } from "react";
import Select from "react-select";

const Filtros = () => {
  const {
    especialidadSeleccionada,
    setEspecialidadSeleccionada,
    setInfoSeleccionada,
  } = useMapa();

   // Nota Navarro 🔥🔥: Importante Cambiar esto, si escala con mas datos, dado que cargamos la memoria al cache.
  const especialidades = useMemo(() => {
    const all = data.flatMap((p) =>
      p.info.map((line) => line.split(":")[0].trim())
    );
    return Array.from(new Set(all)).sort();
  }, []);

  const opciones = [
    { value: "", label: "Todas las especialidades" },
    ...especialidades.map((esp) => ({ value: esp, label: esp })),
  ];

  const handleSelectChange = (option) => {
    const valor = option?.value || "";
    setEspecialidadSeleccionada(valor === "" ? null : valor);
    setInfoSeleccionada(null);
  };

  const valorActual = opciones.find(
    (opt) => opt.value === (especialidadSeleccionada || "")
  );

  return (
    <div className="filtro-inner text-center">
      <label className="form-label">
        <strong>Filtrar especialidad:</strong>
      </label>
      <Select
        className="mi-select-container"
        classNamePrefix="mi-select"
        options={opciones}
        value={valorActual}
        onChange={handleSelectChange}
        isClearable
        placeholder="Buscar o seleccionar..."
      />
    </div>
  );
};

export default Filtros;
