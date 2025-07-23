import SvgMapa from "../components/SvgMapa";
import TablaInfo from "../components/TablaInfo";
import Filtros from '../components/Filtros';

const Mapa = () => (
  <div className="container">
    <div className="informacion">
      <h2>Información general</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus animi aperiam aliquid rerum, laboriosam est aspernatur vero repudiandae, molestiae obcaecati dignissimos? Id quod, eligendi earum rem eum saepe iste architecto perspiciatis debitis odio ratione quibusdam doloremque. Eligendi ea soluta odit provident inventore quas totam doloremque delectus. Laborum ipsa ea perspiciatis.</p>
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




