import { useMapa } from "../context/useMapa";
import data from "../assets/js/data.js";
import { useMemo } from "react";

const Filtros = () => {
  const { especialidadSeleccionada, setEspecialidadSeleccionada } = useMapa();

  const especialidades = useMemo(() => {
    const all = data.flatMap((p) =>
      p.info.map((line) => line.split(":")[0].trim())
    );
    return Array.from(new Set(all)).sort();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setEspecialidadSeleccionada(value === "" ? null : value);
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <label htmlFor="select-especialidad" className="form-label">
            <strong>Filtrar especialidad:</strong>
          </label>
          <select
            id="select-especialidad"
            className="form-select"
            aria-label="Filtro de especialidad"
            value={especialidadSeleccionada || ""}
            onChange={handleChange}
          >
            <option value="">-- Todas las especialidades --</option>
            {especialidades.map((esp) => (
              <option key={esp} value={esp}>
                {esp}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filtros;

