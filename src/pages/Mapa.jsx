import SvgMapa from "../components/SvgMapa";
import TablaInfo from "../components/TablaInfo";
import Filtros from '../components/Filtros';

const Mapa = () => (
  <div className="container">
    <div className="informacion">
      <h2>Información general</h2>
    </div>
    <div className="filtro">
      <Filtros />
    </div>
    <div className="svgContainer mapa">
      <SvgMapa />
    </div>
    <div className="map-container tabla">
      <TablaInfo />
    </div>
  </div>
);


export default Mapa;




