import { useMapa } from "../context/useMapa";
import data from "../assets/js/data.js";

const TablaInfo = () => {
  const { infoSeleccionada, especialidadSeleccionada } = useMapa();

  // Si hay comuna seleccionada
  if (infoSeleccionada) {
    return (
      <div className="info-box">
        <h3>{infoSeleccionada.id}</h3>
        <table>
          <thead>
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
    );
  }

  // Si hay filtro activo pero ninguna comuna seleccionada
  if (especialidadSeleccionada) {
    const comunas = data
      .map((p) => {
        const match = p.info.find((line) =>
          line.startsWith(especialidadSeleccionada + ":")
        );
        if (match) {
          const valor = match.split(":")[1].trim();
          return { id: p.id, valor };
        }
        return null;
      })
      .filter(Boolean);

    return (
      <div className="info-box">
        <h3>{especialidadSeleccionada}</h3>
        <table>
          <thead>
            <tr>
              <th>Comuna</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {comunas.map((c, i) => (
              <tr key={i}>
                <td>{c.id}</td>
                <td>{c.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Si no hay nada seleccionado
  return (
    <div className="info-box">
      <p>Seleccione una comuna o filtre una especialidad.</p>
    </div>
  );
};

export default TablaInfo;
