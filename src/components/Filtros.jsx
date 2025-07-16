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
    console.log("data.js contenido:", data);

    const data1 = [
        {
            id: "Curico",
            info: ["Pediatría:2", "Traumatología:2"]
        },
        {
            id: "Licanten",
            info: ["Pediatría:1"]
        }
    ];

    console.log("DATA DIRECTA:", data1);

    return (
        <div style={{ margin: "1rem" }}>
            <label><strong>Filtrar especialidad:</strong></label>
            <br />
            <select
                value={especialidadSeleccionada || ""}
                onChange={handleChange}
                style={{ minWidth: "200px" }}
            >
                <option value="">-- Todas las especialidades --</option>
                {especialidades.map((esp) => (
                    <option key={esp} value={esp}>{esp}</option>
                ))}
            </select>
        </div>
    );
};

export default Filtros;
