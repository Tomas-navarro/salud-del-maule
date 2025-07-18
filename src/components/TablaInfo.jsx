import { useMapa } from "../context/useMapa";
import data from "../assets/js/data.js";

const TablaInfo = () => {
  const { infoSeleccionada, especialidadSeleccionada } = useMapa();

  // Si hay comuna seleccionada, mostrar sus especialidades
  if (infoSeleccionada) {
    return (
      <div className="info-box mt-4">
        <h3 className="text-center mb-3">{infoSeleccionada.id}</h3>
        <div
          className="table-responsive"
          style={{ maxHeight: "800px", overflowY: "auto" }}
        >
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Especialidad</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {infoSeleccionada.info.map((line, i) => {
                const [nombre, valor] = line.split(":").map((s) => s.trim());
                return (
                  <tr key={i}>
                    <td>{nombre}</td>
                    <td>{valor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Si hay filtro activo, mostrar todas las comunas con esa especialidad
  if (especialidadSeleccionada) {
    const comunasFiltradas = data
      .map((p) => {
        const match = p.info.find((line) =>
          line.startsWith(especialidadSeleccionada + ":")
        );
        if (match) {
          const valor = match.split(":")[1].trim();
          return { comuna: p.id, cantidad: valor };
        }
        return null;
      })
      .filter(Boolean);

    return (
      <div className="info-box mt-8">
        <h3 className="text-center mb-3">{especialidadSeleccionada}</h3>
        <div
          className="table-responsive"
          style={{ maxHeight: "800px", overflowY: "auto" }}
        >
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Comuna</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {comunasFiltradas.map((item, i) => (
                <tr key={i}>
                  <td>{item.comuna}</td>
                  <td>{item.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

};

export default TablaInfo;

